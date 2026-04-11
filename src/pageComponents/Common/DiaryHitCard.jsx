import React from "react";
import dayjs from "dayjs";
import apiPath from "../../constants/apiPath";
import AppImage from "../../components/AppImage";
import { LikeShareActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import { resolveAssetUrl, stripHtml } from "../../helper/functions";

const clampText = (lines) => ({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: lines,
  overflow: "hidden",
});

const getPlainText = (content) => stripHtml(content || "").replace(/\s+/g, " ").trim();

const getPreviewText = (content, maxLength) => {
  const text = getPlainText(content);
  if (!text) return "A fresh hit is ready to be read.";
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
};

const getAuthorName = (item) => item?.author?.name || item?.author?.user_name || "Unknown";
const getAuthorHandle = (item) => item?.author?.user_name || item?.author?.name || "poet";

const DiaryHitCard = ({ item, index = 0 }) => {
  const authorName = getAuthorName(item);
  const authorHandle = getAuthorHandle(item);
  const authorImage = item?.author?.image ? resolveAssetUrl(item.author.image, apiPath.assetURL) : Prouser;
  const publishedAt = item?.created_at || item?.createdAt;

  return (
    <article
      className="overflow-hidden rounded-[30px] border border-[rgba(212,175,55,0.28)] bg-[linear-gradient(180deg,#121212_0%,#0b0b0b_100%)] shadow-[0_18px_42px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(212,175,55,0.18)]"
      style={{
        opacity: 0,
        animation: `slideUp 0.5s ease forwards`,
        animationDelay: `${index * 65}ms`,
      }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[rgba(212,175,55,0.18)] px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(212,175,55,0.32)] bg-[rgba(255,255,255,0.03)]">
            <AppImage src={authorImage} alt={authorName} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-[14px] font-semibold leading-5 text-[#f5edd9] sm:text-[15px]">{authorName}</h4>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-[#a89255] sm:text-[11px]">
              @{authorHandle}
              {publishedAt ? <span className="mx-1 text-[#7b6c42]">•</span> : null}
              {publishedAt ? dayjs(publishedAt).fromNow() : "Just now"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-5 sm:py-7">
        <div className="mx-auto max-w-2xl text-center">
          <p className="poetic-heading text-[1.05rem] leading-[1.9] text-[#f3ead8] sm:text-[1.15rem] md:text-[1.25rem]" style={clampText(5)}>
            {getPreviewText(item?.content, 175)}
          </p>
        </div>
      </div>

      <div className="border-t border-[rgba(212,175,55,0.14)] px-4 py-4 sm:px-5">
        <LikeShareActionIcon item={item} variant="diary" showMeta={false} fullWidth={false} compact />
      </div>
    </article>
  );
};

export default DiaryHitCard;
