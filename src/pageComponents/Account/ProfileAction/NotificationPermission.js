"use client";

import { useEffect, useState } from "react";
import { ArrowLeftOutlined, BellOutlined, SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Button, Spin, Switch, Typography } from "antd";
import Main from "../../../components/layout/Main";
import { useNavigate } from "react-router";
import AccountSideNav from "../AccountSideNav";
import { useAuthContext } from "../../../context/AuthContext";
import useRequest, { useGetApi } from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";
import { Severty, ShowToast } from "../../../helper/toast";

const { Text } = Typography;

const notificationGroups = [
  {
    title: "Community activity",
    description: "Keep up with the people who interact with your Black Diary profile and posts.",
    items: [
      {
        key: "new_followers",
        title: "New followers",
        desc: "Know when someone starts following your profile.",
      },
      {
        key: "follow_requests",
        title: "Follow requests",
        desc: "Get notified when someone wants to follow a private profile.",
      },
      {
        key: "likes_on_posts",
        title: "Likes on posts and shayaris",
        desc: "Track likes on your diary entries, posts, and shayaris.",
      },
      {
        key: "comments_and_replies",
        title: "Comments and replies",
        desc: "See when people reply to your comments or leave feedback on your content.",
      },
      {
        key: "mentions_and_tags",
        title: "Mentions and tags",
        desc: "Know when another user mentions your name or tags you in content.",
      },
    ],
  },
  {
    title: "Messages and sharing",
    description: "Stay in the loop when someone reaches out or shares your work.",
    items: [
      {
        key: "direct_messages",
        title: "Direct messages",
        desc: "Receive alerts for new messages and chat requests.",
      },
      {
        key: "diary_shares",
        title: "Shares and saves",
        desc: "Get updates when your content is shared or saved by others.",
      },
    ],
  },
  {
    title: "Account and updates",
    description: "Important alerts that help keep your account secure and up to date.",
    items: [
      {
        key: "security_alerts",
        title: "Security alerts",
        desc: "Be notified about password changes, suspicious sign-ins, and account safety issues.",
      },
      {
        key: "product_updates",
        title: "Product updates",
        desc: "Hear about new Black Diary features, tools, and community improvements.",
      },
      {
        key: "weekly_digest",
        title: "Weekly digest",
        desc: "Get a short weekly summary so you do not miss important activity.",
      },
    ],
  },
];

const buildDefaultPreferences = (source = {}) => ({
  new_followers: Boolean(source.new_followers ?? true),
  follow_requests: Boolean(source.follow_requests ?? true),
  likes_on_posts: Boolean(source.likes_on_posts ?? true),
  comments_and_replies: Boolean(source.comments_and_replies ?? true),
  mentions_and_tags: Boolean(source.mentions_and_tags ?? true),
  direct_messages: Boolean(source.direct_messages ?? true),
  diary_shares: Boolean(source.diary_shares ?? true),
  security_alerts: Boolean(source.security_alerts ?? true),
  product_updates: Boolean(source.product_updates ?? true),
  weekly_digest: Boolean(source.weekly_digest ?? true),
});

const NotificationPermission = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthContext();
  const { request } = useRequest();
  const [preferences, setPreferences] = useState(buildDefaultPreferences());
  const [savingKey, setSavingKey] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const { data, isLoading, refetch } = useGetApi({
    queryKey: `notification-permission-${userProfile?._id || "guest"}`,
    endpoint: apiPath.notificationPermission,
    enabled: Boolean(userProfile?._id),
  });

  useEffect(() => {
    if (data?.data) {
      setPreferences(buildDefaultPreferences(data.data));
    }
  }, [data]);

  const handleToggle = (key, checked) => {
    const previous = preferences;
    const next = { ...previous, [key]: checked };

    setPreferences(next);
    setSavingKey(key);

    request({
      url: apiPath.notificationPermission,
      method: "PUT",
      data: next,
      onSuccess: ({ status, data: responseData }) => {
        setSavingKey(null);

        if (status) {
          setPreferences(buildDefaultPreferences(responseData || next));
          setLastSavedAt(new Date());
          return;
        }

        setPreferences(previous);
        ShowToast("Unable to save notification preference.", Severty.ERROR);
      },
      onError: () => {
        setSavingKey(null);
        setPreferences(previous);
        ShowToast("Unable to save notification preference.", Severty.ERROR);
      },
    });
  };

  const handleEnableAll = () => {
    const previous = preferences;
    const next = buildDefaultPreferences();
    setPreferences(next);
    setSavingKey("bulk");

    request({
      url: apiPath.notificationPermission,
      method: "PUT",
      data: next,
      onSuccess: ({ status, data: responseData }) => {
        setSavingKey(null);
        if (status) {
          setPreferences(buildDefaultPreferences(responseData || next));
          setLastSavedAt(new Date());
          return;
        }

        setPreferences(previous);
        ShowToast("Unable to save notification preference.", Severty.ERROR);
      },
      onError: () => {
        setSavingKey(null);
        setPreferences(previous);
        refetch();
        ShowToast("Unable to save notification preference.", Severty.ERROR);
      },
    });
  };

  return (
    <Main>
      <div className="account-notification-page grid min-h-screen bg-black text-white xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70">
          <AccountSideNav />
        </div>

        <div className="min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-4xl space-y-6">
            <header className="rounded-[32px] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,#151515_0%,#0d0d0d_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#e7d69c] transition hover:text-[#ffd86d]"
              >
                <ArrowLeftOutlined />
                Back
              </button>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] text-[#f4d787]">
                    <BellOutlined className="text-xl" />
                  </div>
                  <div>
                    <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4d787]">
                      Notification settings
                    </span>
                    <h1 className="poetic-heading text-3xl font-semibold text-white md:text-[2.15rem]">Alert preferences</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b9b9b9] md:text-base">
                      All alerts are turned on by default for new Black Diary accounts. Turn off only the updates you do not want to receive.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <div className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f4d787]">
                    {userProfile?.user_name || "Account"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#a8a8a8]">
                    <SettingOutlined />
                    {lastSavedAt ? "Saved just now" : "Changes save automatically"}
                  </div>
                </div>
              </div>
            </header>

            <div className="rounded-[32px] border border-[rgba(212,175,55,0.18)] bg-[#121212] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.24)] sm:p-6">
              <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Black Diary alerts</h2>
                  <p className="mt-1 text-sm leading-6 text-[#a8a8a8]">
                    Choose which updates appear in your inbox, notifications, and future in-app alerts.
                  </p>
                </div>

                <Button
                  htmlType="button"
                  onClick={handleEnableAll}
                  className="account-notification-enable-all h-10 rounded-full border border-[rgba(212,175,55,0.35)] bg-transparent px-5 font-semibold text-[#f4d787] shadow-none hover:border-[#D4AF37] hover:text-[#ffd86d]"
                >
                  Enable all
                </Button>
              </div>

              <Spin spinning={isLoading && !data?.data} tip="Loading your alert preferences..." className="account-notification-spin">
                <div className="space-y-5">
                  {notificationGroups.map((group) => (
                    <section key={group.title} className="rounded-[26px] border border-white/10 bg-[#101010] p-4 sm:p-5">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#a8a8a8]">{group.description}</p>
                      </div>

                      <div className="space-y-3">
                        {group.items.map((item) => (
                          <div
                            key={item.key}
                            className="flex flex-col gap-4 rounded-[22px] border border-[rgba(212,175,55,0.14)] bg-[rgba(255,255,255,0.02)] p-4 transition hover:border-[rgba(212,175,55,0.26)] sm:flex-row sm:items-start sm:justify-between"
                          >
                            <div className="min-w-0 max-w-2xl">
                              <Text className="block text-base font-semibold text-white">{item.title}</Text>
                              <Text className="mt-1 block text-sm leading-6 text-[#b3b3b3]">{item.desc}</Text>
                            </div>

                            <Switch
                              checked={Boolean(preferences[item.key])}
                              onChange={(checked) => handleToggle(item.key, checked)}
                              loading={savingKey === item.key}
                              className="account-notification-switch shrink-0 self-start sm:self-center"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default NotificationPermission;
