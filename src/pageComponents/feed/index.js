"use client";

import { useNavigate, useSearchParams } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import Main from "../../components/layout/Main";
import PostPage from "./post";
import ShayariPage from "./shayari";

const FeedPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "shayari";

  const feedTabs = [
    { key: "shayari", label: "Shayari", hint: "Poetry feed" },
    { key: "post", label: "Posts", hint: "Visual stories" },
  ];

  return (
    <Main>
      <section className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_22%),linear-gradient(180deg,#090909_0%,#050505_100%)] px-3 py-2 sm:px-4 md:px-6 md:py-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(135deg,rgba(25,25,25,0.98),rgba(12,12,12,0.98))] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:p-4 md:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.08),transparent_24%)]" />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,215,0,0.15)] bg-[rgba(255,215,0,0.06)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#f1d98d]">
                  <HiSparkles className="text-sm" />
                  Black Diary Feed
                </div>
                <h1 className="poetic-heading mt-3 text-[1.65rem] leading-tight text-[#fff4d8] sm:text-3xl md:text-4xl lg:text-[2.6rem]">
                  {type === "post" ? "Stories, visuals and moments" : "A calmer, more readable shayari feed"}
                </h1>
                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#bcb3a0] sm:text-sm">
                  {type === "post"
                    ? "Browse image-first posts with a cleaner reading flow, better spacing, and mobile-friendly actions."
                    : "Read one piece at a time with cleaner typography, stronger hierarchy, and a more comfortable mobile experience."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:min-w-[260px]">
                {feedTabs.map((tab) => {
                  const isActive = type === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => navigate(`/feed?type=${tab.key}`)}
                      className={`rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#d4af37] bg-[#d4af37] text-black shadow-[0_12px_30px_rgba(212,175,55,0.28)]"
                          : "border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] text-[#fff0c7] hover:border-[rgba(255,215,0,0.22)] hover:bg-[rgba(255,255,255,0.05)]"
                      }`}
                    >
                      <p className="text-[9px] uppercase tracking-[0.22em] opacity-75">{tab.hint}</p>
                      <p className="mt-1 text-[13px] font-semibold">{tab.label} Tab</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 md:pt-4">{type === "post" ? <PostPage /> : <ShayariPage />}</div>
        </div>
      </section>
    </Main>
  );
};

export default FeedPage;
