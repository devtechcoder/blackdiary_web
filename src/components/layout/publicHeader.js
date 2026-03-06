import React from "react";
import { BellOutlined } from "@ant-design/icons";
import logo from "../../assets/images/icon/logo.png";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

function PublicHeader({ showDrawer, isMobile }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="premium-navbar h-20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        <img src={logo} alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/")} />
        {!isMobile && (
          <div className="hidden md:flex items-center gap-5 ml-6">
            <NavLink to="/" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/feed?type=shayari" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
              Shayari
            </NavLink>
            <NavLink to="/poets" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
              Poets
            </NavLink>
            <NavLink to="/occasion" className={({ isActive }) => `premium-nav-link ${isActive ? "active" : ""}`}>
              Moments
            </NavLink>
          </div>
        )}
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          // If user not logged in
          <>
            <button className="text-white hover:text-[#d4af37] font-medium transition duration-200" onClick={() => navigate("/signUp-diary")}>
              Sign up
            </button>
            <button className="premium-btn-primary font-semibold px-4 py-1 rounded-full hover:scale-105 transition-transform duration-200" onClick={() => navigate("/login-diary")}>
              Log in
            </button>
          </>
        ) : (
          // If user is logged in
          <>
            <button className="premium-btn-secondary font-semibold px-4 py-1 rounded-full hover:opacity-90 transition">Black Diary</button>
            <BellOutlined className="text-xl hover:scale-110 transition-transform duration-200 text-[#d4af37]" />

            <div className="bg-[#1a1a1a] border border-[#d4af37] w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold" onClick={() => navigate(`/profile/:username?/:id?`)}>
              S
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PublicHeader;
