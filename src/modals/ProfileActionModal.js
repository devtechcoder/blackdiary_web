import { Modal } from "antd";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ProfileActionModal = ({ show, hide }) => {
  const { logout, userProfile } = useAuthContext();
  const { username } = useParams();
  const navigate = useNavigate();

  const menuItems = [
    { _id: "professional_account", name: "Professional account" },
    { _id: "qr_code", name: "QR code" },
    { _id: "notifications", name: "Notifications" },
    { _id: "settings_and_privacy", name: "Settings and privacy" },
    { _id: "login_activity", name: "Login activity" },
    { _id: "log_out", name: "Log Out" },
    { _id: "cancel", name: "Cancel" },
  ];

  const handleAction = (item) => {
    switch (item) {
      case "professional_account":
        hide();
        navigate("/account/edit-profile");
        break;
      case "qr_code":
        hide();
        navigate(`/qr/${username}`);
        break;
      case "notifications":
        hide();
        navigate(`/account/notification-permission/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "settings_and_privacy":
        hide();
        navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "login_activity":
        hide();
        navigate(`/account/login-activity/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "log_out":
        hide();
        logout(navigate);
        break;
      case "cancel":
        hide();
        break;
      default:
        console.log("No action assigned for:", item);
        break;
    }
  };

  return (
    <Modal
      open={show}
      footer={null}
      closable={false}
      centered
      onCancel={hide}
      width={380}
      className="custom-modal profile-action-modal"
      bodyStyle={{ padding: 0, borderRadius: "24px", overflow: "hidden" }}
    >
      <div className="overflow-hidden rounded-[24px] border border-[rgba(212,175,55,0.16)] bg-[linear-gradient(180deg,#141414_0%,#0b0b0b_100%)] text-white shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        <div className="border-b border-[rgba(212,175,55,0.12)] px-5 py-4">
          <h2 className="mt-1 text-xl font-semibold text-[#fff1c9]">Profile actions</h2>
          <p className="mt-1 text-xs text-[#9a9a9a]">Quick access to your account tools</p>
        </div>

        <div className="p-2">
          {menuItems.map((item, index) => {
            const isCancel = item?._id === "cancel";
            const isLogout = item?._id === "log_out";

            return (
              <button
                key={index}
                type="button"
                className={`flex w-full items-center justify-between rounded-[18px] px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 ${
                  isCancel
                    ? "text-[#c2b58b] hover:bg-[rgba(255,215,0,0.08)] hover:text-[#fff2cc]"
                    : isLogout
                      ? "text-[#ff8e8e] hover:bg-[rgba(255,80,80,0.1)] hover:text-[#ffb3b3]"
                      : "text-[#ece0bc] hover:bg-[rgba(255,215,0,0.08)] hover:text-[#fff2cc]"
                }`}
                onClick={() => handleAction(item?._id)}
              >
                <span>{item?.name}</span>
                {!isCancel ? <span className="text-[#7f6b3f]">-&gt;</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileActionModal;
