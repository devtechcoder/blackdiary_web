"use client";

import React from "react";
import { useSelector } from "react-redux";

import PublicLayout from "../../components/layout/publicLayout";

const FaqPage = ({ initialFaqs = [] }) => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => item.type === "faq"));
  const sortedFaqs = React.useMemo(() => [...initialFaqs].sort((a, b) => (a?.priority || 1) - (b?.priority || 1)), [initialFaqs]);

  return (
    <PublicLayout>
      <section className="relative overflow-hidden rounded-[28px] border border-[#3a2f12] bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_rgba(10,10,10,0.96)_42%,_#070707_100%)] px-4 py-10 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-20 left-0 h-52 w-52 rounded-full bg-[#d4af37]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#d4af37]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <header className="mb-8 border-b border-[#3a2f12] pb-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">Black Diary Help</p>
            <h1 className="font-['Playfair_Display'] text-4xl font-semibold text-[#f8f1d4] md:text-5xl">{headingData?.title || "Frequently Asked Questions"}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#d8d0bc] md:text-base">{headingData?.sub_title || "Find quick answers about using Black Diary, exploring content, and understanding how the platform works."}</p>
          </header>

          <div className="space-y-4">
            {sortedFaqs.map((item, index) => (
              <details
                key={item?._id || index}
                open={index === 0}
                className="group rounded-2xl border border-[#4b3b16] bg-[#111111]/90 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-colors hover:border-[#d4af37]/60"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                  <span className="pr-4 font-['Poppins'] text-lg font-semibold leading-7 text-[#f5ecd1]">{item?.question}</span>
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#6b551d] bg-[#1a1a1a] text-[#d4af37] transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <article
                  className="prose prose-invert mt-4 max-w-none border-t border-[#2a2416] pt-4 text-sm leading-7 text-[#d8d0bc]"
                  dangerouslySetInnerHTML={{ __html: item?.answer || "" }}
                />
              </details>
            ))}

            {sortedFaqs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#4b3b16] bg-[#111111]/70 px-6 py-10 text-center text-sm text-[#c9bea2]">
                No FAQs are available right now.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default FaqPage;
