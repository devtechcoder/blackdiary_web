import React, { useMemo, useState } from "react";
import { FiBookmark, FiEye, FiHeart } from "react-icons/fi";

const gradients = [
  "from-[#1f2f4a] via-[#17273c] to-[#111a29]",
  "from-[#40204a] via-[#321a3d] to-[#23122b]",
  "from-[#4a2129] via-[#36171f] to-[#240f15]",
  "from-[#2d2f52] via-[#212446] to-[#181a32]",
  "from-[#3d2b1b] via-[#2d2116] to-[#1f170f]",
];

const stripHtml = (value) => {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const resolveImage = (url, assetURL) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${assetURL}${url}`;
};

const ShayariCard = ({ item, type = "shayari", assetURL, onOpen }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const gradientClass = useMemo(() => gradients[Math.floor(Math.random() * gradients.length)], []);
  const likes = item?.total_likes || 0;
  const views = item?.total_views || item?.views || item?.total_comment || 0;
  const content = stripHtml(item?.content);
  const imageSrc = resolveImage(item?.image, assetURL);

  return (
    <article
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl border border-[#2b2b2b] bg-[#131313] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_16px_44px_rgba(230,180,34,0.22)]"
      onClick={onOpen}
    >
      {type === "post" && imageSrc ? (
        <img src={imageSrc} alt="Post" className="h-full w-full object-cover" />
      ) : (
        <div className={`flex h-full items-center justify-center bg-gradient-to-br ${gradientClass} p-5`}>
          <p className="line-clamp-6 text-center font-['Playfair_Display'] text-base leading-relaxed text-white md:text-lg">{content || "Dil ki khamoshi bhi ek shayari hoti hai."}</p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs text-white">
          <span className="flex items-center gap-1">
            <FiHeart className="text-[#E6B422]" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <FiEye />
            {views}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLiked((prev) => !prev);
            }}
            className={`grid h-8 w-8 place-items-center rounded-full border transition-all duration-300 ${liked ? "scale-110 border-[#E6B422] bg-[#E6B422]/20 text-[#ffd978]" : "border-white/25 bg-black/45 text-white"}`}
            aria-label="Like"
          >
            <FiHeart />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSaved((prev) => !prev);
            }}
            className={`grid h-8 w-8 place-items-center rounded-full border transition-all duration-300 ${saved ? "border-[#E6B422] bg-[#E6B422]/20 text-[#ffd978]" : "border-white/25 bg-black/45 text-white"}`}
            aria-label="Save"
          >
            <FiBookmark />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ShayariCard;
