import React, { useState } from "react";
import { HomeOutlined, SearchOutlined, PlusSquareOutlined, HeartOutlined, UserOutlined, CompassOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import CreatePostOption from "../../modals/createPostOption";

function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const { username } = useParams();
  const [showCreateOptions, setShowCreateOptions] = useState(false); // New state for modal

  const getButtonClass = (path) => {
    const baseClass = "flex flex-col items-center hover:text-white transition-colors duration-200";

    if (pathname.startsWith("/@") && username === userProfile?.user_name) {
      return `${baseClass} text-green-500`;
    }
    return `${baseClass} ${pathname === path ? "text-green-500" : "text-gray-400"}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#121212] border-t border-gray-800 flex justify-around items-center py-3 z-50">
        {/* Home */}
        <button onClick={() => navigate("/")} className={getButtonClass("/")}>
          <HomeOutlined style={{ fontSize: "22px" }} />
        </button>

        {/* CompassOutlined */}
        <button onClick={() => navigate("/feed?type=shayari")} className={getButtonClass("/feed")}>
          <CompassOutlined style={{ fontSize: "22px" }} />
        </button>

        {/* Add (Reel/Post) */}
        <button onClick={() => setShowCreateOptions(true)} className={getButtonClass("/publish")}>
          <PlusSquareOutlined style={{ fontSize: "24px" }} />
        </button>

        {/* Search */}
        <button onClick={() => navigate("/search")} className={getButtonClass("/search")}>
          <SearchOutlined style={{ fontSize: "22px" }} />
        </button>

        {/* Profile */}
        <button onClick={() => navigate(`/@${userProfile?.user_name}`)} className={getButtonClass(`/@${userProfile?.user_name}`)}>
          <UserOutlined style={{ fontSize: "22px" }} />
        </button>
      </div>
      {showCreateOptions && <CreatePostOption show={() => setShowCreateOptions(true)} hide={() => setShowCreateOptions(false)} />}
    </>
  );
}

export default BottomNav;
