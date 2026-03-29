"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import AppImage from "../../components/AppImage";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { resolveAssetUrl, stripHtml } from "../../helper/functions";
import Prouser from "../../assets/images/user.png";

const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PARTICLES = [
  { left: "6%", top: "12%", size: 5, delay: 0.2, duration: 8.5 },
  { left: "18%", top: "72%", size: 7, delay: 1, duration: 9.2 },
  { left: "31%", top: "24%", size: 4, delay: 1.6, duration: 7.8 },
  { left: "48%", top: "84%", size: 6, delay: 0.8, duration: 10.1 },
  { left: "62%", top: "14%", size: 5, delay: 1.9, duration: 8.8 },
  { left: "76%", top: "66%", size: 8, delay: 0.5, duration: 11.4 },
  { left: "88%", top: "26%", size: 4, delay: 1.2, duration: 9.6 },
];

const cardHoverTransition = { duration: 0.28, ease: "easeInOut" };

const getReadTime = (content) => {
  const words = stripHtml(content || "")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 55));
};

const isTrendingEntry = (item, index) => {
  if (item?.is_trending) return true;
  if ((item?.total_likes ?? 0) >= 4) return true;
  return index % 4 === 0;
};

const DiarySkeletonCard = ({ index }) => (
  <div
    className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.15)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_22px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6"
    style={{ animationDelay: `${index * 90}ms` }}
  >
    <div className="absolute inset-0 -translate-x-full animate-[diaryShimmer_2.6s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="space-y-2">
            <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
          </div>
        </div>
        <div className="h-7 w-20 rounded-full bg-[rgba(255,215,0,0.12)]" />
      </div>

      <div className="mt-6 rounded-[24px] border border-[rgba(255,215,0,0.08)] bg-[rgba(255,255,255,0.02)] p-5">
        <div className="space-y-3">
          <div className="h-4 w-[92%] rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="h-4 w-[82%] rounded-full bg-[rgba(255,255,255,0.07)]" />
          <div className="h-4 w-[74%] rounded-full bg-[rgba(255,255,255,0.06)]" />
          <div className="h-4 w-[58%] rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {Array.from({ length: 4 }).map((_, buttonIndex) => (
          <div key={buttonIndex} className="h-11 flex-1 rounded-full bg-[rgba(255,255,255,0.05)]" />
        ))}
      </div>
    </div>
  </div>
);

const FloatingParticles = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {PARTICLES.map((particle, index) => (
      <m.span
        key={`${particle.left}-${particle.top}`}
        className="absolute rounded-full bg-[rgba(255,215,0,0.32)]"
        style={{
          left: particle.left,
          top: particle.top,
          width: particle.size,
          height: particle.size,
          boxShadow: "0 0 18px rgba(255, 215, 0, 0.18)",
        }}
        animate={{
          y: [0, -14, 0],
          opacity: [0.18, 0.5, 0.18],
          scale: [0.9, 1.12, 0.9],
        }}
        transition={{
          duration: particle.duration,
          repeat: Number.POSITIVE_INFINITY,
          delay: particle.delay,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const ExpandableDiaryContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const plainText = useMemo(() => stripHtml(content || ""), [content]);
  const isLongContent = plainText.length > 240;

  return (
    <div className="relative">
      <m.div
        initial={false}
        animate={{ height: expanded || !isLongContent ? "auto" : 230 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden"
      >
        <div
          className="poetic-heading text-center text-[1.18rem] leading-[1.85] tracking-[0.02em] text-[#fbf4df] sm:text-[1.4rem] md:text-[1.6rem]"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
        {!expanded && isLongContent ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(8,8,8,0),rgba(8,8,8,0.96))]" /> : null}
      </m.div>

      {isLongContent ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="font-poppins mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,215,0,0.2)] bg-[rgba(255,215,0,0.08)] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#ffe39a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,215,0,0.32)] hover:bg-[rgba(255,215,0,0.14)]"
        >
          {expanded ? "Read less" : "Read more"}
          <m.span animate={{ x: expanded ? 0 : [0, 4, 0] }} transition={{ duration: 1.4, repeat: expanded ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
            <FiArrowRight className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
          </m.span>
        </button>
      ) : null}
    </div>
  );
};

const DiaryCard = ({ item, index }) => {
  const authorName = item?.author?.name || item?.author?.user_name || item?.author?.username || "Unknown User";
  const authorHandle = String(item?.author?.user_name || item?.author?.username || authorName).replace(/^@/, "");
  const authorImage = item?.author?.image ? resolveAssetUrl(item.author.image, apiPath.assetURL) : Prouser;
  const createdAt = item?.created_at || item?.createdAt;
  const plainText = stripHtml(item?.content || "");
  const readTime = getReadTime(item?.content);
  const showTrending = isTrendingEntry(item, index);

  return (
    <m.article
      variants={CARD_VARIANTS}
      whileHover={{
        y: -5,
        scale: 1.01,
        transition: cardHoverTransition,
      }}
      className="group relative mx-auto w-full max-w-4xl"
    >
      <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.16),transparent_56%)] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-[1px] shadow-[0_25px_60px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,215,0,0.12),transparent_24%,transparent_74%,rgba(255,215,0,0.08))] opacity-70" />
        <div className="relative flex h-full flex-col rounded-[29px] bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(8,8,8,0.98))] p-4 sm:p-6">
          <div className="absolute -left-6 top-14 h-24 w-24 rounded-full bg-[rgba(255,215,0,0.06)] blur-3xl" />
          <div className="absolute -right-8 top-6 h-28 w-28 rounded-full bg-[rgba(255,215,0,0.08)] blur-3xl" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(255,215,0,0.28)] bg-[rgba(255,255,255,0.03)] shadow-[0_0_22px_rgba(255,215,0,0.12)]">
                <AppImage
                  src={authorImage}
                  alt={authorName}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>

              <div className="min-w-0 font-poppins">
                <p className="truncate text-sm font-semibold text-[#f8ecd0]">{authorName}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#948765]">
                  <span className="truncate">@{authorHandle}</span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(255,215,0,0.45)]" />
                  <span>{createdAt ? dayjs(createdAt).fromNow() : "Freshly written"}</span>
                </div>
              </div>
            </div>

            {showTrending ? (
              <div className="font-poppins inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[rgba(255,215,0,0.22)] bg-[rgba(255,215,0,0.09)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ffe08c] shadow-[0_0_18px_rgba(255,215,0,0.08)]">
                <HiSparkles className="text-sm" />
                Trending
              </div>
            ) : null}
          </div>

          <div className="relative mt-5 flex-1 rounded-[22px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] px-4 py-5 sm:mt-6 sm:rounded-[26px] sm:px-6 sm:py-6 lg:px-7">
            <FaQuoteLeft className="absolute left-5 top-5 text-lg text-[rgba(255,215,0,0.24)]" />
            <div className="pt-5">
              <ExpandableDiaryContent content={item?.content || ""} />
            </div>
          </div>

          <div className="font-poppins mt-5 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#a49369]">
            <span className="rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5">Digital diary</span>
            <span className="rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5">{readTime} min read</span>
            <span className="rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.02)] px-3 py-1.5">{plainText.split(/\s+/).filter(Boolean).length || 0} words</span>
          </div>

          <div className="mt-5 border-t border-[rgba(255,215,0,0.12)] pt-5">
            <div className="font-poppins mb-4 flex flex-col gap-2 text-xs text-[#baa97e] sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <p className="uppercase tracking-[0.22em]">{`${item?.total_likes ?? 0} appreciations`}</p>
              <p className="text-left text-[#8c815f] sm:text-right">{showTrending ? "Voices readers are revisiting" : "A quiet note worth reading slowly"}</p>
            </div>
            <LikeShareActionIcon item={item} variant="diary" showMeta={false} showLabels />
          </div>
        </div>
      </div>
    </m.article>
  );
};

const DiariesSection = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });
  const { response: data, loading: isLoading } = useRequest(`${apiPath.getHomeTopDiary}?page=${pagination.current}&pageSize=${pagination.pageSize}`);

  useEffect(() => {
    if (data?.status) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial="hidden"
        animate="visible"
        variants={SECTION_VARIANTS}
        className="relative isolate overflow-hidden rounded-[34px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_100%)] px-4 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:px-5 md:px-8 md:py-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,215,0,0.08),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
        <FloatingParticles />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-poppins text-[11px] uppercase tracking-[0.34em] text-[#9f8e63]">The digital diary</p>
              <h3 className="poetic-heading mt-3 text-[2.3rem] font-semibold text-[#fff6dd] sm:text-5xl">Diaries</h3>
              <p className="font-poppins mt-3 text-sm leading-7 text-[#b8af97] sm:text-[15px]">Where emotions find words</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-px w-24 bg-[linear-gradient(90deg,rgba(255,215,0,0),rgba(255,215,0,0.9),rgba(255,215,0,0))]" />
                <m.div
                  animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.98, 1.04, 0.98] }}
                  transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="h-[5px] w-12 rounded-full bg-[rgba(255,215,0,0.9)] shadow-[0_0_18px_rgba(255,215,0,0.7)]"
                />
              </div>
            </div>

            <m.button
              type="button"
              onClick={() => navigate("/sub-category/details")}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="font-poppins inline-flex w-full items-center justify-center gap-2 self-start rounded-full border border-[rgba(255,215,0,0.2)] bg-[rgba(255,255,255,0.04)] px-5 py-3 text-sm font-semibold text-[#ffe7a4] backdrop-blur-xl transition-all duration-300 hover:border-[rgba(255,215,0,0.38)] hover:bg-[rgba(255,215,0,0.08)] hover:shadow-[0_0_30px_rgba(255,215,0,0.12)] sm:w-auto md:self-auto"
            >
              View All
              <FiArrowRight className="text-base" />
            </m.button>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:gap-5">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <DiarySkeletonCard key={index} index={index} />)
              : list?.map((item, index) => <DiaryCard key={item?._id || index} item={item} index={index} />)}
          </div>

          {!isLoading && list.length === 0 ? (
            <m.div variants={CARD_VARIANTS} className="mt-8 rounded-[28px] border border-[rgba(255,215,0,0.14)] bg-[rgba(255,255,255,0.03)] px-6 py-12 text-center backdrop-blur-xl">
              <p className="poetic-heading text-3xl text-[#fff3d0]">No diary pages have opened yet</p>
              <p className="font-poppins mx-auto mt-3 max-w-xl text-sm leading-7 text-[#a89d83]">
                The next emotional note will appear here as soon as the feed has a fresh page worth slowing down for.
              </p>
            </m.div>
          ) : null}
        </div>

        <style jsx>{`
          @keyframes diaryShimmer {
            100% {
              transform: translateX(200%);
            }
          }
        `}</style>
      </m.section>
    </LazyMotion>
  );
};

export default DiariesSection;
