import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const ProfileActionModal = ({ show, hide }) => {
  const { logout, refreshUser, userProfile } = useAuthContext();
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
        navigate("/account/edit-profile");
        break;
      case "qr_code":
        navigate(`/qr/${username}`);
        break;
      case "notifications":
        navigate(`/account/notification-permission/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "settings_and_privacy":
        navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "login_activity":
        navigate(`/account/login-activity/${userProfile?.user_name}/${userProfile?._id}`);
        break;
      case "log_out":
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
    <Modal open={show} footer={null} closable={false} centered onCancel={hide} width={350} className="!p-0" bodyStyle={{ padding: 0, borderRadius: "10px", overflow: "hidden" }}>
      <div className="bg-white rounded-xl overflow-hidden">
        {menuItems.map((item, index) => (
          <div key={index} className={`text-center py-3 border-b last:border-none text-sm font-medium cursor-pointer hover:bg-gray-100 transition`} onClick={() => handleAction(item?._id)}>
            {item?.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ProfileActionModal;
