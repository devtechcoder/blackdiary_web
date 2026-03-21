import React from "react";
import AppImage from "./AppImage";
import Prouser from "../assets/images/user.png";

const UserCard = ({ user, isFollowing = false, loading = false, onToggleFollow, onOpenProfile }) => {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(212,175,55,0.22)]">
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-28 rounded-br-[96px] bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-transparent opacity-90" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-40 rounded-tl-[48px] bg-gradient-to-l from-[#FFD700] via-[#D4AF37] to-transparent opacity-70" />

      <button className="relative mb-5 block w-fit cursor-pointer rounded-full" onClick={onOpenProfile} type="button">
        <AppImage
          src={user?.profileImage || Prouser}
          alt={user?.name || "Poet"}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full border-2 border-[#D4AF37] object-cover shadow-[0_0_0_4px_rgba(212,175,55,0.16)]"
        />
      </button>

      <div className="relative">
        <h3 className="poetic-heading text-2xl font-semibold text-[#F5F5F5]">{user?.name || "Unknown Poet"}</h3>
        <p className="mt-1 text-sm text-[#CFCFCF]">@{user?.username || "unknown"}</p>
      </div>

      <button
        onClick={onToggleFollow}
        type="button"
        disabled={loading}
        className={`relative mt-5 w-fit min-w-[96px] rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
          isFollowing
            ? "border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D0D0D]"
            : "border-[#D4AF37] bg-[#D4AF37] text-[#0D0D0D] shadow-[0_0_14px_rgba(212,175,55,0.35)] hover:border-[#FFD700] hover:bg-[#FFD700] hover:shadow-[0_0_18px_rgba(255,215,0,0.45)]"
        }`}
      >
        {loading ? "Please..." : isFollowing ? "Following" : "Follow"}
      </button>
    </article>
  );
};

export default UserCard;
