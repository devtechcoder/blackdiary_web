"use client";

import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import {
  ArrowLeftOutlined,
  EnvironmentOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import Main from "../../../components/layout/Main";
import { useAuthContext } from "../../../context/AuthContext";
import { useGetApi } from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";

const PAGE_SIZE = 10;

const getDeviceIcon = (device = "") => {
  const normalized = String(device).toLowerCase();

  if (normalized.includes("tablet")) return <TabletOutlined />;
  if (normalized.includes("mobile")) return <MobileOutlined />;
  return <DesktopOutlined />;
};

const ActivityCard = ({ activity, isCurrentDevice, onLogoutCurrentDevice }) => {
  const lastActive = activity?.logoutAt || activity?.loginAt;
  const statusLabel = activity?.logoutAt ? "Logged Out" : "Active Now";
  const statusClass = activity?.logoutAt
    ? "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[#b8b8b8]"
    : "border-[rgba(115,255,167,0.18)] bg-[rgba(115,255,167,0.08)] text-[#9cffbb]";

  return (
    <article
      className={`overflow-hidden rounded-[18px] border p-4 shadow-[0_12px_34px_rgba(0,0,0,0.28)] transition-all duration-300 ${
        activity?.logoutAt
          ? "border-[rgba(255,215,0,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
          : "border-[rgba(255,215,0,0.18)] bg-[linear-gradient(180deg,rgba(255,215,55,0.08),rgba(255,255,255,0.02))]"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}>
              {activity?.logoutAt ? <ClockCircleOutlined /> : <span className="h-2 w-2 rounded-full bg-[#72ff9f]" />}
              {statusLabel}
            </span>
            {isCurrentDevice ? (
              <span className="inline-flex items-center rounded-full border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-xs font-semibold text-[#f4df9b]">
                Current Device
              </span>
            ) : null}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
              <EnvironmentOutlined className="mt-0.5 text-[#d4af37]" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8d8d8d]">Location</p>
                <p className="mt-1 text-sm text-[#f3e9cd]">{activity?.location || "Unknown"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
              <span className="mt-0.5 text-[#d4af37]">{getDeviceIcon(activity?.device)}</span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8d8d8d]">Device</p>
                <p className="mt-1 text-sm text-[#f3e9cd]">{activity?.device || "Desktop"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
              <GlobalOutlined className="mt-0.5 text-[#d4af37]" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8d8d8d]">Browser</p>
                <p className="mt-1 text-sm text-[#f3e9cd]">{activity?.browser || "Unknown"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
              <span className="mt-0.5 text-[#d4af37]">OS</span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#8d8d8d]">Operating System</p>
                <p className="mt-1 text-sm text-[#f3e9cd]">{activity?.os || "Unknown"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[#b7b7b7]">
            <span className="inline-flex items-center gap-2">
              <ClockCircleOutlined className="text-[#d4af37]" />
              {activity?.loginAt ? dayjs(activity.loginAt).format("DD MMM YYYY, hh:mm A") : "Unknown time"}
            </span>
            <span className="inline-flex items-center gap-2">
              Last active {lastActive ? dayjs(lastActive).fromNow() : "just now"}
            </span>
            <span className="inline-flex items-center gap-2 text-[#8a8a8a]">IP {activity?.ipAddress || "Unknown"}</span>
          </div>
        </div>

        {isCurrentDevice ? (
          <div className="sm:self-center">
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={onLogoutCurrentDevice}
              className="!h-10 !rounded-full !border-0 !bg-[#d4af37] !px-4 !font-semibold !text-black hover:!bg-[#f1cb57]"
            >
              Logout this device
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
};

const LoginActivity = () => {
  const navigate = useNavigate();
  const { logout, userProfile } = useAuthContext();
  const [page, setPage] = useState(1);
  const [activities, setActivities] = useState([]);
  const [summary, setSummary] = useState({
    totalLoginCount: 0,
    totalLogoutCount: 0,
    activeSessions: 0,
  });
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const endpoint = `${apiPath.loginActivity}?page=${page}&pageSize=${PAGE_SIZE}`;
  const { data, isLoading, isFetching, isError, error } = useGetApi({
    queryKey: ["login-activity", userProfile?._id, page],
    endpoint,
    enabled: Boolean(userProfile?._id),
  });

  useEffect(() => {
    setActivities([]);
    setPage(1);
    setHasMore(true);
    setCurrentSessionId(null);
  }, [userProfile?._id]);

  useEffect(() => {
    if (!data?.status) return;

    const docs = data?.data?.docs || [];
    setActivities((prev) => (page === 1 ? docs : [...prev, ...docs]));
    setSummary((prev) => data?.data?.summary || prev);
    setCurrentSessionId(data?.data?.currentSessionId || null);
    setHasMore(Boolean(data?.data?.hasNextPage));
  }, [data, page]);

  const handleLogoutCurrentDevice = () => {
    logout(navigate);
  };

  const isInitialLoading = isLoading && activities.length === 0;

  return (
    <Main>
      <div className="mx-auto max-w-5xl px-3 py-4 text-white sm:px-4 md:px-6">
        <div className="overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(20,20,20,0.98),rgba(10,10,10,0.98))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-5 md:p-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(255,215,0,0.14)] bg-[rgba(255,255,255,0.03)] text-[#f4d98f] transition-all duration-300 hover:border-[rgba(255,215,0,0.26)] hover:bg-[rgba(255,215,0,0.08)]"
            >
              <ArrowLeftOutlined />
            </button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#99845a]">Security</p>
              <h1 className="poetic-heading text-3xl text-[#fff1c9] sm:text-4xl">Login Activity</h1>
              <p className="mt-1 text-sm text-[#a8a8a8]">Review where your account has been used recently.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[18px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c8c8c]">Total logins</p>
              <p className="mt-2 text-2xl font-semibold text-[#fff2cf]">{summary?.totalLoginCount || 0}</p>
            </div>
            <div className="rounded-[18px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c8c8c]">Total logouts</p>
              <p className="mt-2 text-2xl font-semibold text-[#fff2cf]">{summary?.totalLogoutCount || 0}</p>
            </div>
            <div className="rounded-[18px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8c8c8c]">Active sessions</p>
              <p className="mt-2 text-2xl font-semibold text-[#fff2cf]">{summary?.activeSessions || 0}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {isError ? (
            <div className="rounded-[22px] border border-[rgba(255,120,120,0.18)] bg-[rgba(255,255,255,0.03)] p-6 text-center">
              <p className="poetic-heading text-2xl text-[#ffe0d6]">{error?.message || "Unable to load login activity"}</p>
            </div>
          ) : null}

          {isInitialLoading ? (
            <div className="flex justify-center py-10">
              <Spin size="large" />
            </div>
          ) : null}

          {!isInitialLoading && activities.length === 0 && !isError ? (
            <div className="rounded-[22px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-5 py-12 text-center">
              <p className="poetic-heading text-2xl text-[#fff2cf]">No login activity yet</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#a99f85]">Your recent logins will appear here once the account is used on a device.</p>
            </div>
          ) : null}

          {activities.map((activity, index) => (
            <ActivityCard
              key={activity?._id || index}
              activity={activity}
              isCurrentDevice={Boolean(currentSessionId && String(activity?._id) === String(currentSessionId))}
              onLogoutCurrentDevice={handleLogoutCurrentDevice}
            />
          ))}

          {isFetching && activities.length > 0 ? (
            <div className="flex justify-center py-4">
              <Spin />
            </div>
          ) : null}

          {hasMore && activities.length > 0 ? (
            <div className="flex justify-center pt-2">
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                loading={isFetching}
                disabled={isFetching}
                className="!h-11 !rounded-full !border-[rgba(255,215,0,0.18)] !bg-[rgba(255,255,255,0.03)] !px-5 !text-[#f5e0aa] hover:!border-[rgba(255,215,0,0.32)] hover:!bg-[rgba(255,215,0,0.07)] hover:!text-white"
              >
                Load more activity
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </Main>
  );
};

export default LoginActivity;
