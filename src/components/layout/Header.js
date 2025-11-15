import React from "react";
import { HomeOutlined, CameraOutlined, SearchOutlined, BellOutlined, LoginOutlined } from "@ant-design/icons";
import logo from "../../assets/images/icon/logo.png";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

function Header({ showDrawer, isMobile, isVisible }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  return (
    <div
      className={`bg-[#121212] text-white h-20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        <img src={logo} alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/")} />

        {!isMobile && (
          <>
            <div className="group">
              <HomeOutlined className="text-white text-2xl cursor-pointer group-hover:scale-110 transition-transform duration-200" onClick={() => navigate("/")} />
            </div>
            <div className="bg-[#242424] rounded-full px-4 py-[6px] flex items-center w-full max-w-md focus-within:ring-2 focus-within:ring-green-500 transition">
              <SearchOutlined className="text-[#aaa] mr-3 text-xl" />
              <input type="text" placeholder="What do you want to read?" className="bg-transparent outline-none text-white w-full placeholder:text-[#aaa]" />
              <CameraOutlined className="text-[#aaa] ml-3 text-xl cursor-pointer hover:text-white transition" onClick={() => navigate("/search/sub-category")} />
            </div>
          </>
        )}
      </div>
      {/* Right Side */}

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          // If user not logged in
          <>
            <button
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
              onClick={() => navigate("/login")}
            >
              <LoginOutlined /> Log in
            </button>
          </>
        ) : (
          <>
            <BellOutlined className="text-xl hover:scale-110 transition-transform duration-200 cursor-pointer" />
            {!isMobile && (
              <>
                <button
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => navigate(`/@${userProfile?.user_name}`)}
                >
                  {userProfile?.user_name}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
