import React, { useState, useEffect, useRef, useCallback } from "react";
import { Spin } from "antd";
import { HiSparkles } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import dayjs from "dayjs";
import Prouser from "../../assets/images/user.png";
import { FollowIcon, LikeShareActionIcon } from "../../components/ButtonField";
import { useNavigate } from "react-router";
import AppImage from "../../components/AppImage";

const quoteThemes = [
  "from-[#1a1510] via-[#13110d] to-[#0b0b0b]",
  "from-[#151515] via-[#17110a] to-[#0b0b0b]",
  "from-[#101318] via-[#15110c] to-[#0a0a0a]",
];

const FeedSkeleton = () => (
  <div className="mx-auto w-full max-w-[54rem] animate-pulse overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 sm:p-5">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.08)]" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>
      <div className="h-10 w-24 rounded-full bg-[rgba(255,215,0,0.12)]" />
    </div>
    <div className="mt-5 rounded-[24px] bg-[rgba(255,255,255,0.03)] px-5 py-8">
      <div className="space-y-4">
        <div className="h-4 w-full rounded-full bg-[rgba(255,255,255,0.07)]" />
        <div className="h-4 w-[88%] rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[74%] rounded-full bg-[rgba(255,255,255,0.05)]" />
      </div>
    </div>
    <div className="mt-5 h-12 rounded-full bg-[rgba(255,255,255,0.05)]" />
  </div>
);

const EmptyState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,215,0,0.16)] bg-[rgba(255,215,0,0.06)] text-[#f1d785]">
      <HiSparkles className="text-2xl" />
    </div>
    <h3 className="poetic-heading mt-5 text-3xl text-[#fff2cc]">Feed is quiet right now</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#aea38b]">New lines will appear here as soon as fresh shayari is published.</p>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,120,120,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <h3 className="poetic-heading text-3xl text-[#ffe0d6]">Feed could not load</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#c8b0a9]">Something went wrong while loading shayari. Please refresh and try again.</p>
  </div>
);

const ShayariCard = ({ shayari, index }) => {
  const navigate = useNavigate();
  const authorName = shayari?.author?.name || shayari?.author?.user_name || shayari?.author?.username || "Unknown User";
  const authorHandle = String(shayari?.author?.user_name || shayari?.author?.username || authorName).replace(/^@/, "");
  const timeAgo = shayari?.created_at ? dayjs(shayari.created_at).fromNow() : "Freshly written";
  const themeClass = quoteThemes[index % quoteThemes.length];

  return (
    <article className="group mx-auto w-full max-w-[54rem] overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden rounded-[29px] bg-[linear-gradient(180deg,rgba(14,14,14,0.98),rgba(8,8,8,0.98))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_76%,rgba(255,215,0,0.03))]" />

        <div className="relative border-b border-[rgba(255,215,0,0.08)] px-4 py-3.5 sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" className="flex min-w-0 items-center gap-3 text-left" onClick={() => navigate(`/@${authorHandle}`)}>
                <AppImage src={shayari?.author?.image || Prouser} alt={authorName} width={50} height={50} className="h-12 w-12 rounded-full border border-[rgba(255,215,0,0.18)] object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-[#fff2cf]">{authorName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#958660]">
                    <span className="truncate">@{authorHandle}</span>
                    <span className="h-1 w-1 rounded-full bg-[rgba(255,215,0,0.45)]" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              {!shayari?.is_follow && (
                <FollowIcon
                  userId={shayari?.author?._id}
                  hideButton={shayari?.is_follow || false}
                  classname="rounded-full bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2cb57]"
                />
              )}
            </div>
          </div>
        </div>

        <div className={`relative bg-gradient-to-br ${themeClass} px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8`}>
          <FaQuoteLeft className="absolute left-4 top-4 text-[1.8rem] text-[rgba(255,215,0,0.18)] sm:left-6" />
          <div className="mx-auto max-w-[42rem]">
            <div className="max-h-[40vh] overflow-y-auto pr-1 sm:max-h-[44vh] lg:max-h-[48vh]">
              <div
                className="poetic-heading text-center text-[1.2rem] leading-[1.65] text-[#f8f0df] sm:text-[1.55rem] md:text-[1.95rem] lg:text-[2.15rem]"
                dangerouslySetInnerHTML={{ __html: shayari?.content || "" }}
              />
            </div>
          </div>
        </div>

        <div className="relative px-4 py-4 sm:px-5 sm:py-5">
          <div className="rounded-[24px] border border-[rgba(255,215,0,0.08)] bg-[rgba(255,255,255,0.02)] p-4 sm:p-5">
            <LikeShareActionIcon item={shayari} variant="diary" showMeta={false} showLabels />
          </div>
        </div>
      </div>
    </article>
  );
};

const ShayariPage = () => {
  const [shayaris, setShayaris] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 4, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError } = useGetApi({
    queryKey: ["shayari", pagination.current],
    endpoint: `${apiPath.getShayari}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data?.data?.docs ?? [];

      setShayaris((prev) => {
        const existingIds = new Set(prev.map((item) => item?._id));
        const merged = [...prev];

        newDocs.forEach((item) => {
          if (!existingIds.has(item?._id)) {
            merged.push(item);
          }
        });

        return merged;
      });

      setPagination((prev) => ({
        ...prev,
        total: data?.data?.totalDocs ?? 0,
      }));

      if (data?.data?.page >= data?.data?.totalPages) {
        setHasMore(false);
      }
    }
  }, [data, isError]);

  const lastShayariElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore],
  );

  return (
    <section className="w-full">
      <div className="space-y-5 sm:space-y-6">
        {isError && shayaris.length === 0 ? <ErrorState /> : null}

        {shayaris.map((shayari, index) => {
          const card = <ShayariCard key={shayari?._id || index} shayari={shayari} index={index} />;

          if (shayaris.length === index + 1) {
            return (
              <div ref={lastShayariElementRef} key={shayari?._id || index}>
                {card}
              </div>
            );
          }

          return card;
        })}

        {isFetching && (
          <div className="space-y-5 sm:space-y-6">
            {Array.from({ length: shayaris.length ? 1 : 2 }).map((_, index) => (
              <FeedSkeleton key={index} />
            ))}
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          </div>
        )}

        {!isFetching && !isError && shayaris.length === 0 ? <EmptyState /> : null}

        {!hasMore && shayaris.length > 0 ? <p className="py-2 text-center text-sm uppercase tracking-[0.22em] text-[#746b58]">You have reached the end of the feed</p> : null}
      </div>
    </section>
  );
};

export default ShayariPage;
