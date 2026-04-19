import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { FaGoogle } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router";
import apiPath from "../../constants/apiPath";
import { Severty, ShowToast } from "../../helper/toast";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slices/appSlice";
import { setAuthState } from "../../redux/slices/authSlice";
import { getPostLoginRedirectPath } from "../../utils/authRedirect";

const GoogleLogin = ({ className = "w-full border border-gray-600 rounded-full py-2 flex items-center justify-center gap-3 hover:bg-neutral-800" }) => {
  const { setIsLoggedIn, setUserProfile } = useAuthContext();
  const { request } = useRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //   return console.log("User Info:", user);

      const payload = {
        name: user.displayName,
        email: user.email,
        social_type: "Google",
        social_id: user.uid,
        device_token: "fcmToken",
        device_type: "Web",
      };
      setLoading(true);
      request({
        url: `${apiPath.googleLogin}`,
        method: "POST",
        data: payload,
        onSuccess: (data) => {
          setLoading(false);
          if (data.status) {
            setIsLoggedIn(true);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("userProfile", JSON.stringify(data.data.user));

            setUserProfile(data.data.user);
            dispatch(setToken(data.data.token));
            dispatch(setUser(data.data.user));
            dispatch(setAuthState({ user: data.data.user }));
            ShowToast(data.message, Severty.SUCCESS);
            const redirectTo = getPostLoginRedirectPath();
            setTimeout(() => navigate(redirectTo), 200);
          } else {
            ShowToast(data.message, Severty.ERROR);
          }
        },
        onError: (error) => {
          ShowToast(error?.response?.data?.message, Severty.ERROR);
          setLoading(false);
          if (error?.response?.data?.statusText === "ACCOUNT_NOT_VERIFY") {
            setTimeout(() => navigate(`/signUp-otp/${error?.response?.data?.data?._id}`), 200);
          }
        },
      });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className={className}>
      <FaGoogle className="text-xl" /> Continue with Google
    </button>
  );
};

export default GoogleLogin;
