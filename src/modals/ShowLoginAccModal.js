import { useState } from "react";
import { Form, Modal, Row, Col, Radio, Avatar } from "antd";
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

  const onLogin = (value) => {
    const payload = {
      device_token: "fcmToken",
      device_type: "Web",
      id: value?._id,
    };
    setLoading(true);
    request({
      url: `${apiPath.login}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
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
        if (error?.response?.data?.statusText === "ACCOUNT_NOT_VERIFY") {
          setTimeout(() => navigate(`/signUp-otp/${error?.response?.data?.data?._id}`), 200);
        }
      },
    });
  };

  return (
    <Modal width={700} open={show} onOk={hide} okText="OK" cancelText="Cancel" onCancel={hide} centered className="tab_modal deleteWarningModal">
      <Form layout="vertical" className="p-2">
        <div className="flex flex-col gap-4">
          {accounts.map((acc) => (
            <div key={acc._id} onClick={() => onLogin(acc)} className="flex items-center gap-4 p-3 border rounded cursor-pointer hover:bg-gray-100 transition-all">
              <Avatar size={48} src={acc.image}>
                {!acc.image && acc.name?.[0]}
              </Avatar>
              <div>
                <div className="font-semibold">{acc.name}</div>
                <div className="text-gray-500">@{acc.user_name}</div>
              </div>
            </div>
          ))}
        </div>
      </Form>
    </Modal>
  );
};

export default ShowLoginAccModal;
