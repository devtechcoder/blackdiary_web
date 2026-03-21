import React from "react";
import { HomeOutlined, CameraOutlined, SearchOutlined, BellOutlined, LoginOutlined } from "@ant-design/icons";
import logo from "../../assets/images/icon/logo.png";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import AppImage from "../AppImage";

function Header({ showDrawer, isMobile, isVisible }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  return (
    <div
      className={`premium-navbar text-white h-20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        <AppImage src={logo} alt="Logo" width={32} height={32} className="h-8 w-8 cursor-pointer object-contain" onClick={() => navigate("/")} />

        {!isMobile && (
          <>
            <div className="group">
              <HomeOutlined className="text-white text-2xl cursor-pointer group-hover:scale-110 transition-transform duration-200" onClick={() => navigate("/")} />
            </div>
            <div className="hidden lg:flex items-center gap-5">
              <NavLink to="/" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
              <NavLink to="/feed?type=shayari" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
                Shayari
              </NavLink>
              <NavLink to="/search" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
                Explore
              </NavLink>
            </div>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-[6px] flex items-center w-full max-w-md focus-within:ring-2 focus-within:ring-[#d4af37] transition">
              <SearchOutlined className="text-[#aaa] mr-3 text-xl" />
              <input type="text" placeholder="What do you want to read?" className="bg-transparent outline-none text-white w-full placeholder:text-[#aaa]" />
              <CameraOutlined className="text-[#aaa] ml-3 text-xl cursor-pointer hover:text-[#d4af37] transition" onClick={() => navigate("/search/sub-category")} />
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
              className="premium-btn-primary font-semibold px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
              onClick={() => navigate("/login")}
            >
              <LoginOutlined /> Log in
            </button>
          </>
        ) : (
          <>
            <BellOutlined className="text-xl hover:scale-110 transition-transform duration-200 cursor-pointer text-[#d4af37]" />
            {!isMobile && (
              <>
                <button
                  className="premium-btn-secondary font-semibold px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-2"
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
