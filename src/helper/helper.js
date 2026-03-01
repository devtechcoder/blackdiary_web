import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/appSlice";
import { api } from "../redux/services/api";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    // dispatch(api.util.resetApiState());
    // localStorage.removeItem("userId");
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    // localStorage.removeItem("password");
    // localStorage.removeItem("rememberMe");
    // localStorage.removeItem("loggedIn");
    // navigate("/login");
  };

  return { handleLogout };
};
