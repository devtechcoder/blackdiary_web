"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { useDebounce } from "../../hooks/useDebounce";
import { FollowIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import { useAuthContext } from "../../context/AuthContext";
import Main from "../../components/layout/Main";
import { getOriginalUserName, resolveAssetUrl } from "../../helper/functions";
import AppImage from "../../components/AppImage";

const PAGE_META = {
  follower: {
    title: "Followers",
    description: "People who are connected with this profile.",
    empty: "No followers yet",
  },
  following: {
    title: "Following",
    description: "Creators this profile follows.",
    empty: "No following yet",
  },
};

const normalizeType = (type) => (type === "following" ? "following" : "follower");

const ListSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-4 rounded-3xl border border-[rgba(255,215,0,0.08)] bg-[rgba(255,255,255,0.03)] p-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="space-y-2">
            <div className="h-3 w-32 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="h-3 w-24 rounded-full bg-[rgba(255,255,255,0.05)]" />
          </div>
        </div>
        <div className="h-9 w-24 rounded-full bg-[rgba(255,215,0,0.12)]" />
      </div>
    ))}
  </div>
);

const FollowTypeSwitch = ({ activeType, onChange }) => {
  const tabs = [
    { key: "follower", label: "Followers" },
    { key: "following", label: "Following" },
  ];

  return (
    <div className="grid grid-cols-2 rounded-[24px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] p-1">
      {tabs.map((tab) => {
        const isActive = activeType === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`rounded-[20px] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:text-[13px] ${
              isActive ? "bg-[#D4AF37] text-black shadow-[0_12px_28px_rgba(212,175,55,0.22)]" : "text-[#a7a7a7] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#fff3cb]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

const UserList = ({ listType, userId, displayName }) => {
  const normalizedType = normalizeType(listType);
  const meta = PAGE_META[normalizedType];
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const observer = useRef();
  const { userProfile: loggedInUserProfile } = useAuthContext();

  const endpoint = normalizedType === "follower" ? apiPath.getFollowers : apiPath.getFollowing;

  const { data, isFetching, isError, error, refetch } = useGetApi({
    queryKey: [`followList_${normalizedType}`, userId, pagination.current, debouncedSearchTerm],
    endpoint: `${endpoint}/${userId}?type=${normalizedType}&page=${pagination.current}&limit=${pagination.pageSize}&search=${debouncedSearchTerm}`,
    enabled: hasMore && !!userId,
  });

  useEffect(() => {
    setUsers([]);
    setPagination((prev) => ({ ...prev, current: 1 }));
    setHasMore(true);
  }, [debouncedSearchTerm, userId, normalizedType]);

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data?.data?.docs ?? [];
      setUsers((prev) => (pagination.current === 1 ? newDocs : [...prev, ...newDocs]));
      setHasMore(Boolean(data?.data?.hasNextPage));
    }
  }, [data, isError, pagination.current]);

  const lastUserElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore],
  );

  const isCurrentUserPage = userId === loggedInUserProfile?._id;

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#9f8e63]">{meta.title}</p>
            <h3 className="poetic-heading mt-2 text-2xl text-[#fff3d2] sm:text-3xl">{displayName || meta.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8af97]">{meta.description}</p>
          </div>

          <div className="w-full md:max-w-sm">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <SearchOutlined className="text-[#8f8f8f]" />
              </span>

              <input
                type="text"
                placeholder={`Search ${meta.title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                className="w-full rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[#111111] py-3 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#6f6f6f] focus:border-[rgba(255,215,0,0.28)] focus:bg-[#151515]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {users.map((user, index) => {
          const isCurrentUser = user?._id === loggedInUserProfile?._id;
          const userImage = user?.image ? resolveAssetUrl(user.image, apiPath.assetURL) : Prouser;

          return (
            <div
              ref={users.length === index + 1 ? lastUserElementRef : null}
              key={user?._id || index}
              className="flex flex-col gap-3 rounded-[26px] border border-[rgba(255,215,0,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,215,0,0.18)] sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <AppImage
                  src={userImage}
                  alt={user?.name || user?.user_name || "User"}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border border-[rgba(255,215,0,0.18)] object-cover shadow-[0_0_0_3px_rgba(255,215,0,0.08)]"
                />

                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-[#fff2cf] sm:text-lg">{user?.name || "Unknown User"}</p>
                  <p className="truncate text-sm text-[#9f9f9f]">@{user?.user_name || "unknown"}</p>
                </div>
              </div>

              {!isCurrentUser ? (
                <div className="flex items-center justify-start sm:justify-end">
                  <FollowIcon
                    userId={user?._id}
                    buttonName={isCurrentUserPage && normalizedType === "following" ? "Unfollow" : "Follow"}
                    onActionComplete={refetch}
                  />
                </div>
              ) : (
                <div className="inline-flex w-fit items-center rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,215,0,0.06)] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-[#e6c76c]">
                  You
                </div>
              )}
            </div>
          );
        })}

        {isFetching && users.length === 0 ? (
          <ListSkeleton />
        ) : isFetching ? (
          <div className="flex justify-center py-6">
            <Spin />
          </div>
        ) : null}

        {!isFetching && users.length === 0 && !isError ? (
          <div className="rounded-[26px] border border-[rgba(255,215,0,0.1)] bg-[rgba(255,255,255,0.03)] px-5 py-12 text-center">
            <p className="poetic-heading text-2xl text-[#fff2cf]">{meta.empty}</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#a79b81]">When people connect here, their names will appear in this list.</p>
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-[26px] border border-[rgba(255,120,120,0.18)] bg-[rgba(255,255,255,0.03)] px-5 py-12 text-center">
            <p className="poetic-heading text-2xl text-[#ffe0d6]">{error?.message || "Unable to load users"}</p>
          </div>
        ) : null}

        {!hasMore && users.length > 0 ? <p className="py-2 text-center text-xs uppercase tracking-[0.24em] text-[#746b58]">No more users</p> : null}
      </div>
    </div>
  );
};

const ViewFollowList = () => {
  const navigate = useNavigate();
  const { userId, user_name, type } = useParams();
  const [activeTab, setActiveTab] = useState(normalizeType(type));
  const displayName = user_name ? getOriginalUserName(user_name) : "User";

  useEffect(() => {
    setActiveTab(normalizeType(type));
  }, [type]);

  const handleTabChange = (key) => {
    setActiveTab(normalizeType(key));
    navigate(`/view-follow/${normalizeType(key)}/${userId}/${encodeURIComponent(user_name || "")}`);
  };

  if (!userId) {
    return (
      <Main>
        <div className="mx-auto max-w-5xl px-3 py-8 text-white">
          <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
            <p className="poetic-heading text-2xl text-[#fff3d2]">Follow list not found</p>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <section className="min-h-[calc(100vh-120px)] bg-[linear-gradient(180deg,#0b0b0b_0%,#050505_100%)] px-3 py-4 sm:px-4 md:px-6">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(10,10,10,0.98))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,215,0,0.14)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-[#f3dda1] transition-all duration-300 hover:border-[rgba(255,215,0,0.3)] hover:bg-[rgba(255,215,0,0.06)]"
              >
                <ArrowLeftOutlined />
                Back
              </button>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[#9f8e63]">Connections</p>
                <h1 className="poetic-heading mt-2 text-3xl text-[#fff3d2] sm:text-4xl">{displayName}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b7ab8f]">
                  Explore who follows this profile and who this profile follows, with a cleaner mobile-friendly layout.
                </p>
              </div>

              <div className="w-full md:max-w-[320px]">
                <FollowTypeSwitch activeType={activeTab} onChange={handleTabChange} />
              </div>
            </div>
          </div>

          <UserList listType={activeTab} userId={userId} displayName={displayName} />
        </div>
      </section>
    </Main>
  );
};

export default ViewFollowList;
