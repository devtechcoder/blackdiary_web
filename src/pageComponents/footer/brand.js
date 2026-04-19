"use client";

import React from "react";
import PublicLayout from "../../components/layout/publicLayout";

const Brand = () => {
  const colors = [
    { name: "Black Ink", hex: "#050302", class: "bg-[#050302]" },
    { name: "Deep Charcoal", hex: "#0B0806", class: "bg-[#0B0806]" },
    { name: "Warm Gold", hex: "#D4AF37", class: "bg-[#D4AF37]" },
    { name: "Soft Gold", hex: "#F1C56A", class: "bg-[#F1C56A]" },
    { name: "Ivory Text", hex: "#F6E7C8", class: "bg-[#F6E7C8]" },
  ];

  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="text-center">
              <h1 className="poetic-heading text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">Brand Assets</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">
                Guidelines for using Black Diary's brand and assets.
              </p>
            </div>

            <div className="mt-10 w-full space-y-8">
              <section className="rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <h2 className="border-l-4 border-[#D4AF37] pl-4 text-2xl font-semibold text-[#F6E7C8]">Our Logo</h2>
                <div className="mt-6 flex flex-col items-center gap-6 rounded-[24px] border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 md:flex-row md:justify-center md:gap-10 md:p-8">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(212,175,55,0.55)] bg-[linear-gradient(180deg,#111111_0%,#080808_100%)] text-4xl font-serif text-[#F6E7C8] shadow-[0_0_26px_rgba(212,175,55,0.18)]">
                    BD
                  </div>
                  <p className="max-w-2xl text-center text-sm leading-7 text-[#D0D0D0] md:text-left sm:text-[15px]">
                    This is our primary logo. Please don't alter, rotate, or add effects to it. Use the version that provides the most contrast with the background.
                  </p>
                </div>
              </section>

              <section className="rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <h2 className="border-l-4 border-[#D4AF37] pl-4 text-2xl font-semibold text-[#F6E7C8]">Color Palette</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-5">
                  {colors.map((color) => (
                    <div key={color.name} className="rounded-[22px] border border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.02)] p-3">
                      <div className={`h-24 w-full rounded-[18px] shadow-inner ${color.class}`}></div>
                      <p className="mt-3 text-sm font-semibold text-[#F6E7C8]">{color.name}</p>
                      <p className="text-xs text-[#B9B9B9]">{color.hex}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
                <h2 className="border-l-4 border-[#D4AF37] pl-4 text-2xl font-semibold text-[#F6E7C8]">Typography</h2>
                <div className="mt-6 space-y-6 rounded-[24px] border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 sm:p-8">
                  <div>
                    <p className="mb-1 text-sm text-[#B9B9B9]">Headings</p>
                    <h1 className="text-4xl font-bold text-[#F6E7C8]">Serif Display Bold</h1>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-[#B9B9B9]">Body Text</p>
                    <p className="text-base leading-relaxed text-[#D0D0D0]">Inter Regular - The quick brown fox jumps over the lazy dog.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Brand;
