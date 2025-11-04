import React from "react";
import { HomeOutlined, SearchOutlined, PlusSquareOutlined, HeartOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getButtonClass = (path) => {
    const baseClass = "flex flex-col items-center hover:text-white transition-colors duration-200";
    return `${baseClass} ${pathname === path ? "text-green-500" : "text-gray-400"}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800 flex justify-around items-center py-3 z-50">
      {/* Home */}
      <button onClick={() => navigate("/")} className={getButtonClass("/")}>
        <HomeOutlined style={{ fontSize: "22px" }} />
      </button>

      {/* Search */}
      <button onClick={() => navigate("/search")} className={getButtonClass("/search")}>
        <SearchOutlined style={{ fontSize: "22px" }} />
      </button>

      {/* Add (Reel/Post) */}
      <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-200">
        <PlusSquareOutlined style={{ fontSize: "24px" }} />
      </button>

      {/* Like */}
      <button className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-200 relative">
        <HeartOutlined style={{ fontSize: "22px" }} />
      </button>

      {/* Profile */}
      <button onClick={() => navigate("/profile")} className={getButtonClass("/profile")}>
        <UserOutlined style={{ fontSize: "22px" }} />
      </button>
    </div>
  );
}

export default BottomNav;
