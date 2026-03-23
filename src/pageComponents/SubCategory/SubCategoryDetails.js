"use client";

import React, { useEffect, useMemo, useState } from "react";
import Main from "../../components/layout/Main";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import ViewDiary from "../Common/ViewDiary";
import Loader from "../../components/Loader";
import AppImage from "../../components/AppImage";
import { PoetSlider } from "../Common/Slider";

const HERO_COPY = [
  "Some feelings are too delicate for conversation and too beautiful to stay unspoken.",
  "A soft place for words that carry memory, warmth, longing, and the ache of being understood.",
  "Open the diary, slow down, and let every verse sit with you for a while.",
];

const FloatingDust = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {Array.from({ length: 14 }).map((_, index) => (
      <span
        key={index}
        className="absolute block rounded-full bg-[rgba(255,215,0,0.14)] blur-[2px] animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          left: `${8 + index * 6}%`,
          top: `${10 + (index % 5) * 16}%`,
          width: `${index % 3 === 0 ? 5 : 3}px`,
          height: `${index % 3 === 0 ? 5 : 3}px`,
          animationDelay: `${index * 0.35}s`,
          opacity: 0.25 + (index % 4) * 0.08,
        }}
      />
    ))}
  </div>
);

const FilterPill = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] transition-all duration-300 ${
      active
        ? "border-[#f1cf67] bg-[linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,215,0,0.06))] text-[#fff3c4] shadow-[0_0_18px_rgba(255,215,0,0.14)]"
        : "border-[rgba(255,215,0,0.14)] bg-[rgba(255,255,255,0.03)] text-[#aeaeae] hover:border-[rgba(255,215,0,0.28)] hover:text-[#f5e3a4]"
    }`}
  >
    {children}
  </button>
);

const SubCategoryDetails = () => {
  const { categories, subCategories } = useAppContext();
  const navigate = useNavigate();
  const { id: subCategoryId, slug } = useParams();
  const [subCategoryDetails, setSubCategoryDetails] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryId);

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: "subCategoryDetails",
    endpoint: `${apiPath.getSubCategoryDetails}/${subCategoryId}`,
    enabled: !!subCategoryId,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      setSubCategoryDetails(data?.data ?? {});
    }
  }, [data, isError]);

  useEffect(() => {
    setSelectedSubCategory(subCategoryId);
    if (subCategoryId) refetch();
  }, [subCategoryId, refetch]);

  const title = useMemo(() => {
    if (subCategoryDetails?.name) return subCategoryDetails.name;
    if (slug) return decodeURIComponent(slug);
    return "Shayari Diary";
  }, [slug, subCategoryDetails?.name]);

  const subtitle = useMemo(() => {
    const seed = title.length % HERO_COPY.length;
    return HERO_COPY[seed];
  }, [title]);

  if (isLoading) {
    return (
      <Main>
        <Loader />
      </Main>
    );
  }

  if (isError) {
    return (
      <Main>
        <div className="min-h-screen bg-[#050505] px-4 py-10 text-white">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-xl">
            <h2 className="poetic-heading text-3xl text-[#fff7de]">Unable to open this diary</h2>
            <p className="mt-3 text-sm text-[#b8b8b8]">{error?.message || "Something went wrong while loading the page."}</p>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="min-h-screen bg-[#050505] text-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.12),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(255,215,0,0.07),transparent_24%),linear-gradient(180deg,#090909_0%,#050505_100%)]" />
          <FloatingDust />

          <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-6 md:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[34px] border border-[rgba(255,215,0,0.14)] bg-[rgba(255,255,255,0.03)] shadow-[0_20px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              {subCategoryDetails?.image ? (
                <div className="absolute inset-0">
                  <AppImage src={subCategoryDetails.image} alt={title} fill sizes="100vw" className="object-cover opacity-30 blur-[1px] scale-105" />
                </div>
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.6)_35%,rgba(4,4,4,0.95)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.12),transparent_34%)]" />

              <div className="relative grid gap-8 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.3fr)_300px] lg:items-end lg:px-12 lg:py-14">
                <div className="max-w-3xl">
                  <span className="inline-flex rounded-full border border-[rgba(255,215,0,0.18)] bg-[rgba(255,215,0,0.08)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f5d97f]">
                    Black Diary Edition
                  </span>
                  <h1 className="poetic-heading mt-5 max-w-[12ch] text-4xl leading-[0.98] text-[#fff7e5] sm:text-5xl lg:text-6xl">{title}</h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d0d0d0] md:text-base">{subtitle}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <div className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[#9f8d56]">Format</p>
                      <p className="mt-1 text-sm font-medium text-[#f4ead0]">Poetic diary feed</p>
                    </div>
                    <div className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[#9f8d56]">Mood</p>
                      <p className="mt-1 text-sm font-medium text-[#f4ead0]">Slow, intimate, expressive</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#ad9b61]">Reading Atmosphere</p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-2xl bg-[rgba(0,0,0,0.24)] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">Best enjoyed with</p>
                      <p className="mt-2 text-sm leading-6 text-[#ece6d8]">Quiet nights, headphones, and a little extra time to feel every line.</p>
                    </div>
                    <div className="rounded-2xl bg-[rgba(0,0,0,0.24)] p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">Reading style</p>
                      <p className="mt-2 text-sm leading-6 text-[#ece6d8]">Scroll softly, save the ones that stay with you, and share only what means something.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
            <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.025)] p-4 shadow-[0_12px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-5">
              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-max gap-3">
                  <FilterPill
                    active={selectedSubCategory === undefined}
                    onClick={() => {
                      setSelectedSubCategory();
                      navigate("/sub-category/details");
                    }}
                  >
                    All Diaries
                  </FilterPill>
                  {subCategories?.map((item) => (
                    <FilterPill
                      key={item?._id}
                      active={selectedSubCategory === item?._id}
                      onClick={() => {
                        setSelectedSubCategory(item?._id);
                        navigate(`/sub-category/details/${item?.name}/${item?._id}`);
                      }}
                    >
                      {item?.name}
                    </FilterPill>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <div className="flex min-w-max gap-3">
                  <FilterPill
                    active={selectedCategory === undefined}
                    onClick={() => {
                      setSelectedCategory();
                    }}
                  >
                    All Moods
                  </FilterPill>
                  {categories?.map((item, index) => (
                    <FilterPill
                      key={item?.value || index}
                      active={selectedCategory === item?.value}
                      onClick={() => {
                        setSelectedCategory(item?.value);
                      }}
                    >
                      {item?.name}
                    </FilterPill>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <ViewDiary selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} pageData={subCategoryDetails} />

          <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 lg:px-8">
            <div className="rounded-[30px] border border-[rgba(255,215,0,0.1)] bg-[rgba(255,255,255,0.025)] p-4 backdrop-blur-xl md:p-6">
              <PoetSlider title="More Artists" />
            </div>
          </section>
        </div>
      </div>
    </Main>
  );
};

export default SubCategoryDetails;
