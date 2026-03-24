"use client";

import React, { useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useReduxRequest";
import { LikeShareActionIcon } from "../../components/ButtonField";
import Prouser from "../../assets/images/user.png";
import { OccasionSlider, PoetSlider, SubCategorySlider } from "../Common/Slider";
import { ViewSliderDairy } from "../Common/Section";
import AppImage from "../../components/AppImage";
import DiariesSection from "./DiariesSection";

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
        item?.category, // backend diary category (string)
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

          <section>
            <div className="mb-5 flex items-center justify-between gap-2">
              <h3 className="poetic-heading text-2xl font-semibold text-[#F5F5F5] md:text-3xl">Today's Biggest Hits</h3>
              <button type="button" className="text-sm font-medium text-[#D4AF37] hover:text-[#FFD700]" onClick={() => navigate("/feed?type=shayari")}>
                Show All {"->"}
              </button>
            </div>

            {homeDataLoading ? (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-[260px] animate-pulse rounded-[18px] border-none outline-none bg-[#161616]" />
                ))}
              </div>
            ) : (
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                }}
              >
                {filteredDiaries.map((item, index) => (
                  <article
                    key={item?._id || index}
                    className="rounded-[18px] border-none outline-none bg-[#161616] p-5 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    style={{
                      opacity: 0,
                      animation: `slideUp 0.6s ease forwards`,
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <AppImage
                        src={item?.author?.image || Prouser}
                        alt={item?.author?.name || item?.author?.user_name || "Author"}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full border-none outline-none object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-[#F5F5F5]">{item?.author?.name || item?.author?.user_name || "Unknown"}</h4>
                        <p className="text-xs text-[#9CA3AF]">@{item?.author?.user_name || "poet"}</p>
                      </div>
                    </div>

                    <div className="mb-4 min-h-[84px] text-sm leading-relaxed text-[#F5F5F5]" dangerouslySetInnerHTML={{ __html: item?.content || "" }} />

                    <LikeShareActionIcon item={item} />
                  </article>
                ))}
              </div>
            )}

            {!homeDataLoading && filteredDiaries.length === 0 && <p className="mt-4 text-sm text-[#9CA3AF]">No shayari found for this category.</p>}
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
