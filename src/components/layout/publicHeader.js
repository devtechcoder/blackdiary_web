import React from "react";
import BrandLogo from "../../assets/images/allLogo/black_white_logo.svg";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import AppImage from "../AppImage";
import { useAuthContext } from "../../context/AuthContext";
import apiPath from "../../constants/apiPath";
import { resolveAssetUrl } from "../../helper/functions";
import { UserOutlined } from "@ant-design/icons";

function PublicHeader({ isMobile }) {
  const navigate = useNavigate();
  const { isLoggedIn, userProfile } = useAuthContext();

  const navLinkClass = ({ isActive }) =>
    [
      "group relative inline-flex items-center justify-center text-sm font-medium tracking-wide text-[#F3EBDD] transition-all duration-300",
      "after:absolute after:bottom-[-10px] after:left-0 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.95),transparent)] after:shadow-[0_0_14px_rgba(212,175,55,0.8)] after:transition-transform after:duration-300",
      "hover:text-[#FFD97A] hover:after:scale-x-100",
      isActive ? "text-[#FFD97A] after:scale-x-100" : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(212,175,55,0.2)] bg-[rgba(8,6,4,0.9)] px-4 backdrop-blur-2xl supports-[backdrop-filter]:bg-[rgba(8,6,4,0.78)] sm:px-6 lg:px-8">
      <div className="mx-auto grid h-20 w-full grid-cols-[auto,1fr,auto] items-center gap-4">
        <div className="flex min-w-0 flex-shrink-0 items-center gap-3 sm:gap-4">
          <button type="button" onClick={() => navigate("/")} className="group flex items-center gap-3">
            <AppImage src={BrandLogo} alt="Black Diary" width={34} height={34} className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="logo-text whitespace-nowrap text-[20px] font-semibold leading-none sm:text-[24px] lg:text-[28px]">
              Black Diary
            </span>
          </button>
        </div>

        {!isMobile ? (
          <div className="hidden justify-center md:flex">
            <nav className="flex items-center gap-6 lg:gap-8">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/feed?type=shayari" className={navLinkClass}>
                Shayari
              </NavLink>
              <NavLink to="/poets" className={navLinkClass}>
                Poets
              </NavLink>
              <NavLink to="/occasion" className={navLinkClass}>
                Moments
              </NavLink>
            </nav>
          </div>
        ) : null}

        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={() => navigate(`/@${userProfile?.user_name}`)}
              aria-label="Open profile"
              className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[rgba(212,175,55,0.58)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_0_18px_rgba(212,175,55,0.18)] transition-all duration-300 hover:scale-105 hover:border-[rgba(212,175,55,0.8)] hover:shadow-[0_0_24px_rgba(212,175,55,0.28)] sm:h-11 sm:w-11"
            >
              {userProfile?.image ? (
                <AppImage src={resolveAssetUrl(userProfile?.image, apiPath.assetURL)} alt="Profile" width={44} height={44} className="h-full w-full rounded-full object-cover" />
              ) : (
                <UserOutlined className="text-[15px] text-[#F6E1A6] transition-colors duration-300 group-hover:text-[#FFE89A]" />
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate("/signUp-diary")}
                className="rounded-full border border-[rgba(212,175,55,0.68)] px-3 py-1.5 text-[11px] font-semibold text-[#F6E1A6] transition-all duration-300 hover:bg-[rgba(212,175,55,0.08)] hover:text-[#FFE89A] hover:shadow-[0_0_18px_rgba(212,175,55,0.16)] sm:px-5 sm:py-2 sm:text-sm"
              >
                Sign up
              </button>

              <button
                type="button"
                onClick={() => navigate("/login-diary")}
                className="rounded-full bg-[#D4AF37] px-3 py-1.5 text-[11px] font-semibold text-[#090909] shadow-[0_0_20px_rgba(212,175,55,0.32)] transition-all duration-300 hover:bg-[#E1C04A] hover:shadow-[0_0_26px_rgba(212,175,55,0.42)] sm:px-5 sm:py-2 sm:text-sm"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
