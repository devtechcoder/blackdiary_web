import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = (options = {}) => {
    if (typeof logout === "function") {
      logout(undefined, { redirect: false, showToast: false, syncWithServer: false, ...options });
    }
  };

  return { handleLogout };
};
