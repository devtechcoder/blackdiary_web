"use client";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import Main from "../../components/layout/Main";
import PostPage from "./post";
import ShayariPage from "./shayari";
import { useAuthContext } from "../../context/AuthContext";

const FeedPage = ({ isHeaderVisible = true }) => {
  const navigate = useNavigate();
  const { isMobile } = useAuthContext();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "shayari";
  const [tabsVisible, setTabsVisible] = useState(true);

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 96) {
        setTabsVisible(false);
      } else {
        setTabsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const feedTabs = [
    { key: "shayari", label: "Shayari", hint: "Poetry feed" },
    { key: "post", label: "Posts", hint: "Visual stories" },
  ];

  return (
    <Main>
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_22%),linear-gradient(180deg,#090909_0%,#050505_100%)] px-3 py-4 sm:px-4 md:px-6 md:py-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(135deg,rgba(25,25,25,0.98),rgba(12,12,12,0.98))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-5 md:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.08),transparent_24%)]" />
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,215,0,0.15)] bg-[rgba(255,215,0,0.06)] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#f1d98d]">
                  <HiSparkles className="text-sm" />
                  Black Diary Feed
                </div>
                <h1 className="poetic-heading mt-4 text-[2rem] leading-tight text-[#fff4d8] sm:text-4xl md:text-5xl">
                  {type === "post" ? "Stories, visuals and moments" : "A calmer, more readable shayari feed"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#bcb3a0] sm:text-[15px]">
                  {type === "post"
                    ? "Browse image-first posts with a cleaner reading flow, better spacing, and mobile-friendly actions."
                    : "Read one piece at a time with cleaner typography, stronger hierarchy, and a more comfortable mobile experience."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
                <div className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#9f8d61]">Mode</p>
                  <p className="mt-1 text-sm font-semibold text-[#fff0c7]">{type === "post" ? "Posts" : "Shayari"}</p>
                </div>
                <div className="rounded-2xl border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#9f8d61]">Layout</p>
                  <p className="mt-1 text-sm font-semibold text-[#fff0c7]">Mobile first</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`sticky z-40 mt-4 transition-transform duration-300 ${
              isMobile && !tabsVisible ? "-translate-y-[140%] opacity-0" : "translate-y-0 opacity-100"
            } ${isMobile ? "top-[80px]" : "top-4"}`}
          >
            <div className={`rounded-[22px] border border-[rgba(255,215,0,0.12)] bg-[rgba(12,12,12,0.88)] p-2 shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl ${isHeaderVisible ? "" : "pointer-events-none opacity-0"}`}>
              <div className="grid grid-cols-2 gap-2">
                {feedTabs.map((tab) => {
                  const isActive = type === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => navigate(`/feed?type=${tab.key}`)}
                      className={`rounded-2xl px-3 py-3 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-[#d4af37] text-black shadow-[0_12px_30px_rgba(212,175,55,0.28)]"
                          : "bg-transparent text-[#c7bea8] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#fff1c9]"
                      }`}
                    >
                      <p className="text-sm font-semibold">{tab.label}</p>
                      <p className={`mt-1 text-[11px] ${isActive ? "text-black/70" : "text-[#8f8570]"}`}>{tab.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-5 md:pt-6">{type === "post" ? <PostPage /> : <ShayariPage />}</div>
        </div>
      </section>
    </Main>
  );
};

export default FeedPage;
