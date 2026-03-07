import React, { useEffect, useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useReduxRequest";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../constants/seo";
import Prouser from "../../assets/images/user.png";
import { OccasionSlider, PoetSlider, SubCategorySlider } from "../Common/Slider";
import { ViewSliderDairy } from "../Common/Section";

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
      <Helmet>
        <title>{SEO.home.primary.title}</title>
        <meta name="description" content={SEO.home.primary.description} />
        <meta name="keywords" content={SEO.home.primary.keywords} />

        <meta property="og:title" content={SEO.home.openGraph.title} />
        <meta property="og:description" content={SEO.home.openGraph.description} />
        <meta property="og:image" content={SEO.home.openGraph.image} />
        <meta property="og:url" content={SEO.home.openGraph.url} />
        <meta property="og:type" content={SEO.home.openGraph.type} />
        <meta property="og:site_name" content={SEO.home.openGraph.site_name} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.home.twitter.title} />
        <meta name="twitter:description" content={SEO.home.twitter.description} />
        <meta name="twitter:image" content={SEO.home.twitter.image} />
        <meta name="twitter:url" content={SEO.home.twitter.url} />
        <meta name="twitter:type" content={SEO.home.twitter.type} />
        <meta name="twitter:site_name" content={SEO.home.twitter.site_name} />

        <link rel="canonical" href={SEO.common.url} />
        <meta name="robots" content={SEO.common.robots} />
        <meta name="language" content={SEO.common.language} />
        <meta name="author" content={SEO.common.author} />
      </Helmet>

      <section className="min-h-screen bg-[#0B0B0B] px-3 py-8 md:px-6">
        <div className="bd-container space-y-10">
          <section className="relative overflow-hidden rounded-3xl border border-[rgba(212,175,55,0.2)] bg-gradient-to-br from-[#111111] via-[#0f0f0f] to-[#0b0b0b] px-6 py-14 text-center shadow-[0_14px_36px_rgba(0,0,0,0.35)] md:px-10">
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
                className="mt-7 rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_14px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700] hover:bg-[#FFD700] hover:shadow-[0_0_18px_rgba(255,215,0,0.45)]"
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
                className={`rounded-full border px-[18px] py-[10px] text-sm font-medium transition-all duration-300 ${
                  activeCategory === pill
                    ? "border-[#D4AF37] bg-[#D4AF37] text-black"
                    : "border-[#2a2a2a] bg-[#161616] text-[#F5F5F5] hover:border-[#D4AF37] hover:text-[#D4AF37]"
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
                Show All ->
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
                  <div key={index} className="h-[260px] animate-pulse rounded-[18px] border border-[rgba(212,175,55,0.15)] bg-[#161616]" />
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
                    className="rounded-[18px] border border-[rgba(212,175,55,0.15)] bg-[#161616] p-5 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    style={{
                      opacity: 0,
                      animation: `slideUp 0.6s ease forwards`,
                      animationDelay: `${index * 70}ms`,
                    }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <img src={item?.author?.image || Prouser} alt={item?.author?.name || item?.author?.user_name || "Author"} className="h-11 w-11 rounded-full border border-[#D4AF37] object-cover" />
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

          <section className="space-y-8">
            <SubCategorySlider data={homeData?.subCategories ?? []} title={"Popular albums"} />
            <PoetSlider data={homeData?.topPoets ?? []} title={"Shayaron Ki Mehfil"} />
            <OccasionSlider data={homeData?.occasions ?? []} title={"Special Moments Shayari"} />
            <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Albums featuring diary you like"} type={"liked"} />
            <ViewSliderDairy data={homeData?.trendingDiary ?? []} title={"Trending Diaries"} type={"recently_viewed"} />
            <TopDiarySection />
          </section>
        </div>
      </section>
    </Main>
  );
}

const TopDiarySection = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });

  const { response: data, loading: isLoading } = useRequest(`${apiPath.getHomeTopDiary}?page=${pagination.current}&pageSize=${pagination.pageSize}`);

  useEffect(() => {
    if (data?.status) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="h-[180px] animate-pulse rounded-[18px] border border-[rgba(212,175,55,0.15)] bg-[#161616]" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-2">
        <h3 className="poetic-heading text-2xl font-semibold text-[#F5F5F5] md:text-3xl">Diaries</h3>
        <button type="button" className="text-sm font-medium text-[#D4AF37] hover:text-[#FFD700]" onClick={() => navigate(`/sub-category/details`)}>
          Show All ->
        </button>
      </div>

      <div className="space-y-4">
        {list?.map((item, index) => (
          <article
            key={item?._id || index}
            className="rounded-[18px] border border-[rgba(212,175,55,0.15)] bg-[#161616] p-5 transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            <p className="mb-4 text-sm leading-relaxed text-[#F5F5F5]" dangerouslySetInnerHTML={{ __html: item?.content || "" }} />
            <LikeShareActionIcon item={item} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default LandingIndex;
