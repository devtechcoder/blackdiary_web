import { BellOutlined, EditOutlined, EyeInvisibleOutlined, InfoOutlined, LockOutlined, RightOutlined, StopOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router";

const { Text } = Typography;

const AccountSideNav = ({ className = "" }) => {
  const { userProfile } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const accountId = userProfile?._id;
  const accountSlug = userProfile?.user_name;
  const canNavigate = Boolean(accountId && accountSlug);

  const quickLinks = [
    {
      title: "Profile",
      icon: UserOutlined,
      path: `/account/manage-account/${accountSlug}/${accountId}`,
    },
    {
      title: "Personal details",
      icon: InfoOutlined,
      path: `/account/personal-details/${accountSlug}/${accountId}`,
    },
    {
      title: "Password and security",
      icon: LockOutlined,
      path: `/account/password-security/${accountSlug}/${accountId}`,
    },
  ];

  const usageLinks = [
    {
      title: "Edit profile",
      icon: EditOutlined,
      path: `/account/edit-profile/${accountSlug}/${accountId}`,
    },
    {
      title: "Notifications",
      icon: BellOutlined,
      path: `/account/notification-permission/${accountSlug}/${accountId}`,
    },
  ];

  const privacyLinks = [
    {
      title: "Account privacy",
      icon: EyeInvisibleOutlined,
      path: `/account/privacy-account/${accountSlug}/${accountId}`,
    },
    {
      title: "Blocked",
      icon: StopOutlined,
      path: `/account/block-account/${accountSlug}/${accountId}`,
    },
  ];

  const navItemClass = (active) =>
    [
      "group flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 sm:px-4 sm:py-3",
      active
        ? "border-[#D4AF37] bg-[rgba(212,175,55,0.12)] text-white shadow-[0_0_0_1px_rgba(212,175,55,0.16)]"
        : "border-white/10 bg-[#111111] text-[#d7d7d7] hover:border-[rgba(212,175,55,0.35)] hover:bg-[#151515]",
    ].join(" ");

  const renderItems = (items) =>
    items.map((item) => {
      const Icon = item.icon;
      const active = pathname === item.path;

      return (
        <button
          key={item.title}
          type="button"
          disabled={!canNavigate}
          onClick={() => canNavigate && navigate(item.path)}
          className={`${navItemClass(active)} ${!canNavigate ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <span className="flex items-center gap-3">
            <Icon className={active ? "text-[#f4d787]" : "text-[#9e9e9e]"} />
            <span className="font-medium">{item.title}</span>
          </span>
          <RightOutlined className={active ? "text-[#f4d787] text-xs" : "text-[#6f6f6f] text-xs"} />
        </button>
      );
    });

  return (
    <aside
      className={[
        "w-full rounded-[28px] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,#141414_0%,#0d0d0d_100%)] p-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.34)] sm:p-4",
        className,
      ].join(" ")}
    >
      <div className="mb-4 rounded-[24px] border border-white/10 bg-[#111111] p-3 sm:p-4">
        <div className="mb-3 flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-[rgba(212,175,55,0.35)] bg-[rgba(212,175,55,0.08)] text-xs font-semibold text-[#f5d67d] sm:h-11 sm:w-11 sm:text-sm">
            AC
          </div>
          <div className="min-w-0">
            <Text className="block text-base font-semibold text-white sm:text-lg">Accounts Center</Text>
            <p className="mt-1 max-w-[16rem] text-sm leading-6 text-[#b6b6b6]">
              Manage your connected experiences and account settings across Black Diary.
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">{renderItems(quickLinks)}</div>
      </div>

      <div className="space-y-4">
        <section>
          <Text className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a58f53]">How you use Black Diary</Text>
          <div className="space-y-2">{renderItems(usageLinks)}</div>
        </section>

        <section>
          <Text className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a58f53]">Who can see your content</Text>
          <div className="space-y-2">{renderItems(privacyLinks)}</div>
        </section>
      </div>
    </aside>
  );
};

export default AccountSideNav;
