"use client";

import React, { useEffect, useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import AppImage from "../../components/AppImage";

const EMOTION_THEMES = [
  {
    match: ["love", "romantic", "romance", "ishq", "mohabbat", "heart"],
    glow: "rgba(255, 215, 0, 0.12)",
    overlay: "from-[rgba(62,34,25,0.96)] via-[rgba(27,20,17,0.88)] to-[rgba(13,13,13,0.98)]",
    aura: "from-[rgba(255,215,0,0.18)] via-[rgba(178,106,62,0.14)] to-transparent",
  },
  {
    match: ["sad", "alone", "pain", "broken", "lonely", "bewafa"],
    glow: "rgba(113, 143, 214, 0.12)",
    overlay: "from-[rgba(18,24,36,0.97)] via-[rgba(15,18,26,0.9)] to-[rgba(10,10,10,0.98)]",
    aura: "from-[rgba(93,115,171,0.2)] via-[rgba(39,47,74,0.12)] to-transparent",
  },
  {
    match: ["friend", "friendship", "bond", "yaari", "dosti"],
    glow: "rgba(173, 143, 76, 0.12)",
    overlay: "from-[rgba(33,29,20,0.96)] via-[rgba(21,19,16,0.88)] to-[rgba(13,13,13,0.98)]",
    aura: "from-[rgba(212,175,55,0.16)] via-[rgba(112,89,47,0.12)] to-transparent",
  },
  {
    match: ["life", "motivation", "inspire", "success", "attitude"],
    glow: "rgba(212, 175, 55, 0.13)",
    overlay: "from-[rgba(29,24,18,0.96)] via-[rgba(20,17,14,0.88)] to-[rgba(13,13,13,0.98)]",
    aura: "from-[rgba(255,215,0,0.14)] via-[rgba(145,112,47,0.1)] to-transparent",
  },
];

const DEFAULT_THEME = {
  glow: "rgba(255, 215, 0, 0.1)",
  overlay: "from-[rgba(22,22,22,0.96)] via-[rgba(17,17,17,0.88)] to-[rgba(13,13,13,0.98)]",
  aura: "from-[rgba(255,215,0,0.14)] via-[rgba(83,63,27,0.1)] to-transparent",
};

const resolveTheme = (name = "") => {
  const normalizedName = String(name).toLowerCase();
  return EMOTION_THEMES.find((theme) => theme.match.some((token) => normalizedName.includes(token))) || DEFAULT_THEME;
};

const resolveCountLabel = (item) => {
  const rawCount = item?.shayari_count ?? item?.total_shayari ?? item?.post_count ?? item?.total_count ?? item?.count;
  const numericCount = Number(rawCount);

  if (Number.isFinite(numericCount) && numericCount > 0) {
    return `${numericCount}+ Shayari`;
  }

  return "Explore Shayari";
};

const CategorySkeleton = () => (
  <div className="animate-pulse rounded-3xl border border-[rgba(255,215,0,0.08)] bg-[#171717] p-4">
    <div className="mb-5 h-5 w-32 rounded-full bg-[#262626]" />
    <div className="h-40 rounded-2xl bg-[linear-gradient(135deg,#1d1d1d_0%,#141414_100%)]" />
    <div className="mt-4 h-4 w-24 rounded-full bg-[#242424]" />
  </div>
);

const ViewAllSubCategory = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 20 });

  const { data, isLoading, isError, error } = useGetApi({
    queryKey: "ViewAllSubCategory",
    endpoint: `${apiPath.listSubCategory}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
    }
  }, [data, isError]);

  const cards = useMemo(
    () =>
      list.map((item) => ({
        ...item,
        theme: resolveTheme(item?.name),
        countLabel: resolveCountLabel(item),
      })),
    [list]
  );

  if (isLoading) {
    return (
      <Main>
        <section className="min-h-screen bg-[#0D0D0D] px-4 py-8 md:px-6">
          <div className="bd-container">
            <div className="rounded-[32px] border border-[rgba(255,215,0,0.08)] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_38%),linear-gradient(180deg,#111111_0%,#0D0D0D_100%)] p-5 md:p-8">
              <div className="mb-8 max-w-2xl">
                <div className="mb-4 h-12 w-56 animate-pulse rounded-full bg-[#1D1D1D]" />
                <div className="h-5 w-72 animate-pulse rounded-full bg-[#191919]" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <section className="min-h-screen bg-[#0D0D0D] px-4 py-8 md:px-6">
          <div className="bd-container">
            <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[#141414] p-6 text-[#EDEDED]">
              <h2 className="poetic-heading text-3xl text-[#F5F5F5]">Browse Categories</h2>
              <p className="mt-3 text-sm text-[#B6B6B6]">We couldn&apos;t load the category collection right now.</p>
              <p className="mt-2 text-sm text-[#8F8F8F]">{error?.message || "Something went wrong."}</p>
            </div>
          </div>
        </section>
      </Main>
    );
  }

  return (
    <Main>
      <section className="min-h-screen bg-[#0D0D0D] px-4 py-8 md:px-6">
        <div className="bd-container">
          <div className="overflow-hidden rounded-[32px] border border-[rgba(255,215,0,0.08)] bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,215,0,0.05),transparent_24%),linear-gradient(180deg,#111111_0%,#0D0D0D_100%)] p-5 md:p-8 lg:p-10">
            <div className="relative mb-8 overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.1)] bg-[linear-gradient(135deg,rgba(24,24,24,0.96)_0%,rgba(14,14,14,0.98)_55%,rgba(11,11,11,1)_100%)] px-5 py-8 md:px-8 md:py-10">
              <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-[rgba(255,215,0,0.08)] blur-3xl" />
              <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle,rgba(255,215,0,0.12),transparent_62%)]" />
              <div className="relative max-w-3xl">
                <span className="inline-flex items-center rounded-full border border-[rgba(255,215,0,0.18)] bg-[rgba(255,215,0,0.05)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                  Black Diary Collection
                </span>
                <h1 className="poetic-heading mt-5 text-4xl text-[#F8F5ED] md:text-5xl">Browse Categories</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A9A9A9] md:text-base">
                  Explore emotions through words. Discover intimate spaces for love, longing, heartbreak, friendship and every shade in between.
                </p>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="rounded-[28px] border border-[rgba(255,215,0,0.1)] bg-[#141414] px-6 py-12 text-center">
                <h2 className="poetic-heading text-3xl text-[#F5F5F5]">No categories found</h2>
                <p className="mt-3 text-sm text-[#9D9D9D]">The emotional archives are empty right now. Check back in a moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((item, idx) => (
                  <button
                    key={item?._id || idx}
                    type="button"
                    onClick={() => navigate(`/sub-category/details/${item?.name}/${item?._id}`)}
                    className="group relative overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.14)] bg-[#1A1A1A] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255,215,0,0.38)] hover:shadow-[0_0_25px_rgba(255,215,0,0.15)]"
                    style={{ boxShadow: `0 18px 42px -28px ${item.theme.glow}` }}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.theme.overlay}`} />
                    <div className={`pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.14),transparent_35%)]`} />
                    <div className={`pointer-events-none absolute -bottom-10 right-0 h-36 w-36 rounded-full bg-gradient-to-tr ${item.theme.aura} blur-3xl`} />

                    <div className="relative flex h-full min-h-[290px] flex-col justify-between">
                      <div>
                        <span className="inline-flex rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,215,0,0.05)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#C9A227]">
                          Category
                        </span>
                        <h2 className="poetic-heading mt-5 max-w-[11ch] text-3xl leading-tight text-[#F8F5ED]">{item?.name}</h2>
                      </div>

                      <div className="relative mt-8 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.04)] bg-[#121212]">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(8,8,8,0.08)_0%,rgba(8,8,8,0.32)_48%,rgba(8,8,8,0.82)_100%)]" />
                        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.06),transparent_44%)]" />
                        <div className="relative h-40 overflow-hidden">
                          <AppImage
                            src={item?.image}
                            alt={item?.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-cover opacity-70 transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="relative mt-5 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-[#B9B9B9]">{item.countLabel}</p>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Main>
  );
};

export default ViewAllSubCategory;
