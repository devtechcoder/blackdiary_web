import { useState } from "react";
import { Form, Modal, Avatar, Spin } from "antd";
import lang from "../helper/langHelper";
import apiPath from "../constants/apiPath";
import { Severty, ShowToast } from "../helper/toast";
import useRequest from "../hooks/useRequest";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ShowLoginAccModal = ({ show, hide, data }) => {
  const { setIsLoggedIn, setUserProfile } = useAuthContext();
  const accounts = data || [];
  const { request } = useRequest();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const onLogin = (value) => {
    const payload = {
      device_token: "fcmToken",
      device_type: "Web",
      id: value?._id,
    };
    setSelectedAccountId(value._id);
    setLoading(true);
    request({
      url: `${apiPath.login}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        setSelectedAccountId(null);
        if (data.status) {
          setIsLoggedIn(true);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userProfile", JSON.stringify(data.data.user));

          setUserProfile(data.data.user);
          ShowToast(data.message, Severty.SUCCESS);
          hide();
          setTimeout(() => navigate("/"), 200);
        } else {
          console.log("error", "err+++");
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        console.log(error, "err+++");
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
        setSelectedAccountId(null);
        if (error?.response?.data?.statusText === "ACCOUNT_NOT_VERIFY") {
          setTimeout(() => navigate(`/signUp-otp/${error?.response?.data?.data?._id}`), 200);
        }
      },
    });
  };

  return (
    <Modal width={400} open={show} footer={null} onCancel={hide} centered className="custom-modal" title={<div className="text-center text-xl font-bold text-white">Choose an account</div>}>
      <div className="p-2 text-white">
        <div className="flex flex-col gap-3 my-4">
          {accounts.map((acc) => (
            <div
              key={acc._id}
              onClick={() => !loading && onLogin(acc)}
              className="flex items-center justify-between gap-4 p-3 bg-neutral-800 border border-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-700 transition-all"
            >
              <div className="flex items-center gap-4">
                <Avatar size={48} src={acc.image}>
                  {!acc.image && acc.name?.[0]}
                </Avatar>
                <div>
                  <div className="font-semibold">{acc.name}</div>
                  <div className="text-neutral-400 text-sm">@{acc.user_name}</div>
                </div>
              </div>
              {loading && selectedAccountId === acc._id && <Spin />}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            hide();
            navigate("/login");
          }}
          className="w-full text-center py-2 text-neutral-300 hover:text-white hover:underline"
        >
          Log in with another account
        </button>
      </div>
    </Modal>
  );
};

export default ShowLoginAccModal;
