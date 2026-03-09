import React from "react";
import { FiHeart } from "react-icons/fi";

const ProfileStats = ({ totalPosts = 0, followers = 0, following = 0, totalLikes = 0 }) => {
  const items = [
    { label: "Posts", value: totalPosts },
    { label: "Followers", value: followers },
    { label: "Following", value: following },
    { label: "Total Likes", value: totalLikes, icon: <FiHeart className="text-[#E6B422]" /> },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-[#2b2b2b] bg-gradient-to-br from-[#151515] via-[#101010] to-[#0d0d0d] p-4 shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8e8e8e]">{item.label}</p>
            {item.icon}
          </div>
          <p className="text-2xl font-semibold text-white">{item.value}</p>
        </article>
      ))}
    </section>
  );
};

export default ProfileStats;
