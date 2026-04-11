import React from "react";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FollowIcon } from "../ButtonField";
import AppImage from "../AppImage";
import Prouser from "../../assets/images/user.png";

const statPillClassName =
  "group rounded-2xl border border-[#D4AF37] bg-[#101010] px-4 py-2 text-left transition-all duration-300 hover:border-[#FFD700] hover:bg-[#151515]";

const StatPill = ({ label, value, onClick, to }) => {
  const content = (
    <>
      <p className="text-sm font-semibold text-white">{value}</p>
      <p className="text-xs uppercase tracking-[0.18em] text-[#8b8b8b] group-hover:text-[#d7c18a]">{label}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} prefetch className={`${statPillClassName} cursor-pointer`}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${statPillClassName} cursor-pointer`}>
      {content}
    </button>
  );
};

const ProfileHeader = ({
  profileData,
  isOwnProfile,
  totalPosts,
  editProfileTo,
  onOpenSettings,
  onFollowersClick,
  onFollowingClick,
}) => {
  const displayUsername = profileData?.user_name ? `@${profileData.user_name}` : "@poet";
  const displayName = profileData?.name || "Black Diary Writer";

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-[#D4AF37] bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0b0b0b] p-5 md:p-7">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#E6B422]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#E6B422]/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:text-left">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6B422] to-[#876911] opacity-85 blur-[2px]" />
            <AppImage
              src={profileData?.image || Prouser}
              alt={displayName}
              width={144}
              height={144}
              className="relative h-28 w-28 rounded-full border-2 border-[#1d1d1d] object-cover md:h-36 md:w-36"
            />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#1b1810] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#f5d67d]">
              Writer
            </div>
            <h1 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{displayUsername}</h1>
            <p className="mt-1 text-sm text-[#f2f2f2]/85 md:text-base">{displayName}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 md:justify-end">
          {isOwnProfile ? (
            <>
              <Link to={editProfileTo || "/account/edit-profile"} prefetch className="rounded-xl border border-[#D4AF37] bg-transparent px-5 py-2 text-sm font-semibold text-[#f4d787] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#E6B422]/12">
                Edit Profile
              </Link>
              <button
                type="button"
                onClick={onOpenSettings}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#D4AF37] bg-[#111] text-[#d9d9d9] transition-all duration-300 hover:border-[#FFD700] hover:text-[#E6B422]"
                aria-label="Open settings"
              >
                <FiSettings className="text-lg" />
              </button>
            </>
          ) : (
            <FollowIcon userId={profileData?._id} />
          )}
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-3 md:max-w-md">
        <StatPill label="Posts" value={totalPosts} />
        <StatPill label="Followers" value={profileData?.followers || 0} onClick={onFollowersClick} to={onFollowersClick} />
        <StatPill label="Following" value={profileData?.following || 0} onClick={onFollowingClick} to={onFollowingClick} />
      </div>
    </section>
  );
};

export default ProfileHeader;
