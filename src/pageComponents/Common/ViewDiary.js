import React, { useEffect, useMemo, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { FaQuoteLeft } from "react-icons/fa";
import dayjs from "dayjs";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import defaultNoData from "../../assets/images/default/default-no-data.png";
import Prouser from "../../assets/images/user.png";
import AppImage from "../../components/AppImage";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { stripHtml } from "../../helper/functions";

const LoadingCard = () => (
  <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 md:p-6">
    <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] animate-[shimmer_2.2s_infinite]" />
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.07)]" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.07)]" />
          <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[88%] rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[72%] rounded-full bg-[rgba(255,255,255,0.06)]" />
      </div>
      <div className="mt-6 h-12 w-full rounded-2xl bg-[rgba(255,255,255,0.05)]" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-12 text-center backdrop-blur-xl md:px-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.1),transparent_40%)]" />
    <div className="relative mx-auto max-w-lg">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(255,215,0,0.14)] bg-[rgba(255,215,0,0.05)]">
        <AppImage src={defaultNoData} alt="No Data" width={88} height={88} className="h-20 w-20 object-contain opacity-90" />
      </div>
      <h3 className="poetic-heading mt-6 text-3xl text-[#fff6dc]">No shayari found</h3>
      <p className="mt-3 text-sm leading-7 text-[#a9a9a9]">This page is quiet right now. Try another mood or come back when the diary has new verses to offer.</p>
    </div>
  </div>
);

const StatChip = ({ label, value }) => (
  <div className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-3 backdrop-blur-sm">
    <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a8c61]">{label}</p>
    <p className="mt-1 text-base font-semibold text-[#fbf3db]">{value}</p>
  </div>
);

const DiaryCard = ({ item, index }) => {
  const postedAt = item?.created_at || item?.createdAt;
  const timeAgo = postedAt ? dayjs(postedAt).fromNow() : "";
  const plainText = stripHtml(item?.content || "");
  const isTopShayari = index < 3;

  return (
    <article
      className="group relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.024))] p-[1px] shadow-[0_20px_55px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.36)]"
      style={{ animation: `fadeUp 0.6s ease-out ${index * 0.08}s both` }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(135deg,rgba(255,215,0,0.22),transparent_30%,transparent_70%,rgba(255,215,0,0.12))]" />
      <div className="relative overflow-hidden rounded-[29px] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.07),transparent_30%),linear-gradient(180deg,rgba(18,18,18,0.98)_0%,rgba(11,11,11,0.98)_100%)] p-5 md:p-7">
        <div className="pointer-events-none absolute -right-8 top-6 h-28 w-28 rounded-full bg-[rgba(255,215,0,0.06)] blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,transparent_74%,rgba(255,215,0,0.03))]" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,rgba(255,215,0,0.45),rgba(255,215,0,0.06))] blur-[6px]" />
              <AppImage src={item?.author?.image || Prouser} alt="Profile" width={48} height={48} className="relative h-12 w-12 rounded-full border border-[rgba(255,215,0,0.28)] object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#fff3d4]">{item?.author?.username ?? item?.author?.user_name ?? item?.author?.name ?? "Unknown writer"}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#938666]">{timeAgo || "Freshly written"}</p>
            </div>
          </div>

          {isTopShayari ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,215,0,0.18)] bg-[rgba(255,215,0,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f5d97f]">
              <HiSparkles className="text-xs" />
              Top Shayari
            </span>
          ) : null}
        </div>

        <div className="relative mt-6 rounded-[26px] border border-[rgba(255,215,0,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-5 py-6 md:px-7 md:py-7">
          <FaQuoteLeft className="pointer-events-none absolute left-5 top-5 text-xl text-[rgba(255,215,0,0.2)]" />
          <div className="max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(255,215,0,0.18)]">
            <div
              className="pl-8 text-[17px] leading-[2.05] tracking-[0.015em] text-[#f4efe2] md:text-[19px]"
              dangerouslySetInnerHTML={{ __html: item?.content }}
            />
            <p className="mt-6 pl-8 text-sm font-medium italic text-[#b9aa7b]">{item?.author?.name ? `- ${item.author.name}` : "- Black Diary"}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#8c805f]">
          <span className="rounded-full border border-[rgba(255,215,0,0.1)] px-3 py-1">Diary Note</span>
          <span className="rounded-full border border-[rgba(255,215,0,0.1)] px-3 py-1">Poetic Mood</span>
          {plainText ? <span className="rounded-full border border-[rgba(255,215,0,0.1)] px-3 py-1">{Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 40))} min read</span> : null}
        </div>

        <div className="mt-6 border-t border-[rgba(255,215,0,0.1)] pt-4">
          <LikeShareActionIcon item={item} variant="diary" />
        </div>
      </div>
    </article>
  );
};

const resolveMoodLabel = (selectedCategory) => {
  if (!selectedCategory) return "All Moods";
  return String(selectedCategory).replace(/_/g, " ");
};

const ViewDiary = ({ selectedCategory, selectedSubCategory, pageData, pageType = "subCategory" }) => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: pageType,
    endpoint: `${apiPath.getDiary}?category=${selectedCategory ?? ""}&sub_category_id=${selectedSubCategory ?? ""}${pageType === "occasion" ? `&occasion_id=${pageData?._id}` : ""}&page=${
      pagination.current
    }&pageSize=${pagination.pageSize}`,
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSubCategory, refetch]);

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
      setPagination((prev) => ({ ...prev, total: data?.data?.totalDocs ?? 0 }));
    }
  }, [data, isError]);

  const pageTitle = useMemo(() => pageData?.name || "Shayari Diary", [pageData?.name]);
  const moodLabel = useMemo(() => resolveMoodLabel(selectedCategory), [selectedCategory]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] p-6 text-white">
          <p>Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-10">
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <div className="mb-6 rounded-[30px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9c8d61]">Curated for your mood</p>
            <h2 className="poetic-heading mt-3 text-3xl text-[#fff5dc] md:text-4xl">{`Top ${pagination.total ?? 0} pieces in ${pageTitle}`}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b7b7b7]">An editorial stream of shayari arranged for a slower, more immersive reading experience.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:min-w-[320px]">
            <StatChip label="Current Mood" value={moodLabel} />
            <StatChip label="Entries" value={pagination.total ?? 0} />
          </div>
        </div>
      </div>

      {list?.length ? (
        <div className="space-y-6">
          {list.map((item, index) => (
            <DiaryCard key={item?._id || index} item={item} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default ViewDiary;
