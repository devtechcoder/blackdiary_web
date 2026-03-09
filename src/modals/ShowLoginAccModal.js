import { useState } from "react";
import { Modal, Avatar, Spin } from "antd";
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
    <Modal width={440} open={show} footer={null} onCancel={hide} centered className="custom-modal login-account-modal" closable={!loading}>
      <div className="p-1 text-white">
        <div className="mb-5 text-center">
          <h2 className="text-[30px] font-semibold tracking-tight text-[#f7f7f7]">Choose an account</h2>
          <p className="mt-1 text-sm text-[#a8a8a8]">Continue with the account you want to sign in with</p>
        </div>

        <div className="max-h-[300px] space-y-3 overflow-y-auto pr-1">
          {accounts.map((acc) => (
            <button
              key={acc._id}
              type="button"
              onClick={() => !loading && onLogin(acc)}
              disabled={loading}
              className="group flex w-full items-center justify-between rounded-xl border border-[#3a3a3a] bg-[#171717] px-4 py-3 text-left transition-all duration-200 hover:border-[#4d4d4d] hover:bg-[#1d1d1d] disabled:cursor-not-allowed disabled:opacity-80"
            >
              <div className="flex items-center gap-3">
                <Avatar size={48} src={acc.image} className="!bg-[#2b2b2b] !text-[#f1f1f1]">
                  {!acc.image && acc.name?.[0]}
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-[#f3f3f3]">{acc.name}</div>
                  <div className="truncate text-sm text-[#a7a7a7]">@{acc.user_name}</div>
                </div>
              </div>
              <div className="ml-4 flex h-6 w-6 items-center justify-center">
                {loading && selectedAccountId === acc._id ? (
                  <Spin size="small" />
                ) : (
                  <span className="text-lg text-[#777] transition-colors duration-200 group-hover:text-[#d4af37]">{">"}</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 border-t border-[#2a2a2a] pt-4">
          <button
            type="button"
            onClick={() => {
              hide();
              navigate("/login");
            }}
            className="w-full rounded-lg border border-transparent py-2 text-center text-sm font-medium text-[#cfcfcf] transition-all duration-200 hover:border-[#353535] hover:bg-[#141414] hover:text-[#f3f3f3]"
          >
            Use another account
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShowLoginAccModal;
