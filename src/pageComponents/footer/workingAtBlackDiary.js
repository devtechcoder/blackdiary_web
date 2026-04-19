"use client";

import React from "react";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Empower Expression",
    description: "We build tools that give a voice to creators and help them share their stories with the world.",
  },
  {
    title: "Foster Community",
    description: "We believe in the power of connection and strive to create a welcoming space for all.",
  },
  {
    title: "Innovate with Purpose",
    description: "We merge technology and art to create meaningful experiences for our users.",
  },
  {
    title: "Embrace Diversity",
    description: "We celebrate unique perspectives and believe they make our platform and community stronger.",
  },
];

const openPositions = [
  {
    title: "Senior Frontend Engineer",
    location: "Remote",
    department: "Engineering",
  },
  {
    title: "Content Curator (Poetry & Shayari)",
    location: "Remote",
    department: "Content",
  },
  {
    title: "Community Manager",
    location: "Remote",
    department: "Marketing",
  },
];

const WorkingAtBlackDiary = () => {
  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <div className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-12 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />
          <div className="relative mx-auto w-full max-w-6xl">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="poetic-heading text-4xl font-bold text-[#F1C56A] mb-3 md:text-5xl">Shape the Future of Expression</h1>
              <p className="text-lg text-[#D0D0D0]">Join us at Black Diary and be part of a team that's passionate about words, technology, and community.</p>
            </div>

            {/* Our Values Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center text-[#F6E7C8] mb-10">Our Core Values</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {values.map((value, index) => (
                  <div key={index} className="rounded-[24px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                    <h3 className="mb-2 text-xl font-semibold text-[#F1C56A]">{value.title}</h3>
                    <p className="text-[#D0D0D0]">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Open Positions Section */}
            <section>
              <h2 className="text-3xl font-bold text-center text-[#F6E7C8] mb-10">Open Positions</h2>
              <div className="overflow-hidden rounded-[24px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                <div className="divide-y divide-[rgba(212,175,55,0.12)]">
                  {openPositions.map((position, index) => (
                    <div key={index} className="flex flex-col items-start justify-between p-6 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.03)] sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-[#F6E7C8]">{position.title}</h3>
                        <p className="mt-1 text-[#D0D0D0]">
                          {position.department} &middot; {position.location}
                        </p>
                      </div>
                      <Link to="#" className="mt-4 inline-block rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-semibold text-[#090909] transition-colors duration-300 hover:bg-[#E1C04A] sm:mt-0">
                        Apply Now
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default WorkingAtBlackDiary;
