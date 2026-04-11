"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import DiaryHitCard from "../Common/DiaryHitCard";

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

const DiarySkeletonCard = ({ index }) => (
  <div
    className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.15)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_22px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6"
    style={{ animationDelay: `${index * 90}ms` }}
  >
    <div className="absolute inset-0 -translate-x-full animate-[diaryShimmer_2.6s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.08)]" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
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
              : list?.map((item, index) => <DiaryHitCard key={item?._id || index} item={item} index={index} />)}
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
