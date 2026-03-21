"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Tabs, Input, Spin, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { useDebounce } from "../../hooks/useDebounce";
import { FollowIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import { useAuthContext } from "../../context/AuthContext";
import Main from "../../components/layout/Main";
import Loader from "../../components/Loader";
import { getOriginalUserName } from "../../helper/functions";

const { TabPane } = Tabs;

const UserList = ({ listType, userId }) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const observer = useRef();
  const { userProfile: loggedInUserProfile } = useAuthContext();

  const endpoint = listType === "followers" ? apiPath.getFollowers : apiPath.getFollowing;

  const { data, isFetching, isError, error, refetch } = useGetApi({
    queryKey: [`followList_${listType}`, userId, pagination.current, debouncedSearchTerm],
    endpoint: `${endpoint}/${userId}?type=${listType}&page=${pagination.current}&limit=${pagination.pageSize}&search=${debouncedSearchTerm}`,
    enabled: hasMore && !!userId,
  });

  useEffect(() => {
    // Reset list when search term or user changes
    setUsers([]);
    setPagination((p) => ({ ...p, current: 1 }));
    setHasMore(true);
  }, [debouncedSearchTerm, userId, listType]);

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data.data.docs;
      setUsers((prev) => (pagination.current === 1 ? newDocs : [...prev, ...newDocs]));
      setHasMore(data.data.hasNextPage);
    }
  }, [data, isError]);

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
    [isFetching, hasMore]
  );

  return (
    <div className="flex flex-col h-[calc(100vh-250px)]">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <SearchOutlined className="text-gray-400" />
          </span>

          <input
            type="text"
            placeholder={`Search ${listType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            className="
        w-full
        pl-11 pr-4 py-2
        bg-gray-800 
        text-white 
        placeholder-gray-500
        rounded-xl 
        shadow-sm
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:ring-offset-0 
        transition-all
        border border-gray-700
        hover:border-gray-500
        sm:py-3 sm:text-lg
      "
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {users.map((user, index) => {
          const isCurrentUser = user._id === loggedInUserProfile?._id;
          return (
            <div ref={users.length === index + 1 ? lastUserElementRef : null} key={user._id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Avatar src={user.image ? apiPath.assetURL + user.image : Prouser} />
                <div>
                  <p className="font-semibold text-white">{user.user_name}</p>
                  <p className="text-gray-400 text-sm">{user.name}</p>
                </div>
              </div>
              {!isCurrentUser && (
                <div>
                  <FollowIcon userId={user._id} buttonName={userId === loggedInUserProfile?._id ? "Unfollow" : "Follow"} onActionComplete={refetch} />
                </div>
              )}
            </div>
          );
        })}

        {isFetching && (
          <div className="text-center py-4">
            <Spin />
          </div>
        )}

        {!hasMore && users.length > 0 && <p className="text-center text-gray-500 py-4">No more users</p>}

        {!isFetching && users.length === 0 && <p className="text-center text-gray-500 py-4">No users found</p>}
      </div>
    </div>
  );
};

const ViewFollowList = () => {
  const navigate = useNavigate();
  const { userId, user_name, type } = useParams();
  const activeTab = type === "following" ? "following" : "follower";

  // Fetch the user profile to get the user ID

  const handleTabChange = (key) => {
    navigate(`/view-follow/${key}/${userId}/${user_name}`);
  };

  return (
    <Main>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center sm:text-left">{user_name}</h2>

        <Tabs activeKey={activeTab} onChange={handleTabChange} className="custom-tabs text-white" centered>
          <TabPane tab="Follower" key="follower">
            <div className="mt-4">
              <UserList listType="follower" userId={userId} />
            </div>
          </TabPane>

          <TabPane tab="Following" key="following">
            <div className="mt-4">
              <UserList listType="following" userId={userId} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Main>
  );
};

export default ViewFollowList;
