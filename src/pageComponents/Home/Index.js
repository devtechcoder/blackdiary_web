"use client";

import React, { useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useReduxRequest";
import { OccasionSlider, PoetSlider, SubCategorySlider } from "../Common/Slider";
import { ViewSliderDairy } from "../Common/Section";
import DiariesSection from "./DiariesSection";
import DiaryHitCard from "../Common/DiaryHitCard";

const HOME_PILLS = ["All", "Sher", "Shayari", "Ghazal", "Nazm", "Story", "Meme"];
const CATEGORY_ALIAS = {
  shayari: "shayri",
};

function LandingIndex() {
  const navigate = useNavigate();
  const { response: data, loading: homeDataLoading } = useRequest(apiPath.homeData);
  const [activeCategory, setActiveCategory] = useState("All");

  const homeData = useMemo(() => {
    if (!data?.status) return {};
    return data?.data || {};
  }, [data]);

  const diaries = useMemo(() => {
    if (!data?.status) return [];
    return data?.data?.trendingDiary || [];
  }, [data]);

  const filteredDiaries = useMemo(() => {
    if (activeCategory === "All") return diaries;

    const activeCategoryKey = (CATEGORY_ALIAS[activeCategory.toLowerCase()] || activeCategory).toLowerCase();

    return diaries.filter((item) => {
      const bucket = [
        item?.category,
        item?.type,
        item?.category_name,
        item?.sub_category_name,
        item?.category?.name,
        item?.sub_category?.name,
      ]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase());

      return bucket.some((value) => value === activeCategoryKey || value.includes(activeCategoryKey));
    });
  }, [diaries, activeCategory]);

  return (
    <Main>
      <section className="min-h-screen bg-[#0B0B0B] px-3 py-8 md:px-6">
        <div className="bd-container space-y-10">
          <section className="relative overflow-hidden rounded-3xl outline-none bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0b0b0b] px-6 py-14 text-center shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_55%)]" />
            <div className="relative mx-auto max-w-3xl">
              <h1 className="poetic-heading text-5xl font-semibold text-[#D4AF37] md:text-6xl">Black Diary</h1>
              <h2 className="mt-3 text-xl text-[#F5F5F5] md:text-2xl">Where Words Become Feelings</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#9CA3AF] md:text-base">
                A modern platform to explore Shayari, Ghazals, Nazms and poetic moments.
              </p>
              <button
                type="button"
                onClick={() => navigate("/feed?type=shayari")}
                className="mt-7 rounded-full border border-[rgba(255,215,0,0.45)] outline-none bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_14px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700] hover:bg-[#FFD700] hover:shadow-[0_0_18px_rgba(255,215,0,0.45)]"
              >
                Explore Shayari
              </button>
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            {HOME_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveCategory(pill)}
                className={`home-category-pill rounded-full border-none outline-none px-[18px] py-[10px] text-sm font-medium transition-all duration-300 ${
                  activeCategory === pill
                    ? "is-active bg-[#D4AF37] text-black"
                    : "bg-[#161616] text-[#F5F5F5] hover:text-[#D4AF37]"
                }`}
              >
                {pill}
              </button>
            ))}
          </section>

          <section className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(18,18,18,0.98),rgba(10,10,10,0.98))] px-4 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.28)] sm:px-5 sm:py-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="poetic-heading mt-2 text-[1.45rem] font-semibold leading-tight text-[#F5F5F5] sm:text-[1.7rem] md:text-[1.85rem]">
                  Today's Biggest Hits
                </h3>
                <p className="mt-1 text-[12px] leading-5 text-[#9CA3AF] sm:text-[13px]">
                  Small, clean cards for the posts readers are opening most right now.
                </p>
              </div>
              <button
                type="button"
                className="self-start text-[12px] font-medium text-[#D4AF37] transition-colors duration-300 hover:text-[#FFD700] sm:mt-0"
                onClick={() => navigate("/feed?type=shayari")}
              >
                Show All {"->"}
              </button>
            </div>

            {homeDataLoading ? (
              <div className="mx-auto grid max-w-3xl gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse rounded-[24px] border border-[rgba(255,215,0,0.08)] bg-[#161616] p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.08)]" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.08)]" />
                        <div className="h-2.5 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 rounded-[18px] bg-[rgba(255,255,255,0.03)] p-3">
                      <div className="h-3 w-[95%] rounded-full bg-[rgba(255,255,255,0.08)]" />
                      <div className="h-3 w-[82%] rounded-full bg-[rgba(255,255,255,0.07)]" />
                      <div className="h-3 w-[68%] rounded-full bg-[rgba(255,255,255,0.05)]" />
                    </div>
                    <div className="mt-4 h-9 rounded-full bg-[rgba(255,255,255,0.05)]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto grid max-w-3xl gap-4">
                {filteredDiaries.map((item, index) => (
                  <DiaryHitCard key={item?._id || index} item={item} index={index} />
                ))}
              </div>
            )}

            {!homeDataLoading && filteredDiaries.length === 0 && <p className="mt-3 text-[12px] text-[#9CA3AF]">No shayari found for this category.</p>}
          </section>

          <section className="space-y-5">
            <SubCategorySlider data={homeData?.subCategories ?? []} title={"Popular albums"} />
            <PoetSlider data={homeData?.topPoets ?? []} title={"Shayaron Ki Mehfil"} />
            <OccasionSlider data={homeData?.occasions ?? []} title={"Special Moments Shayari"} />
            <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Albums featuring diary you like"} type={"liked"} />
            <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Trending Diaries"} type={"recently_viewed"} />
            <DiariesSection />
          </section>
        </div>
      </section>
    </Main>
  );
}

export default LandingIndex;
