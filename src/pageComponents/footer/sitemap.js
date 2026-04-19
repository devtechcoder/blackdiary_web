"use client";

import React from "react";
import PublicLayout from "../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const sitemapSections = [
  {
    title: "Main Features",
    links: [
      { name: "Home", path: "/" },
      { name: "Poets", path: "/poets" },
      { name: "Special Moments (Occasions)", path: "/occasion" },
      { name: "Search & Explore", path: "/search/sub-category" },
      { name: "Shayari", path: "/sub-category/details?category=Shayri" },
      { name: "Sher", path: "/sub-category/details?category=Sher" },
    ],
  },
  {
    title: "Our Company",
    links: [
      { name: "About Us", path: "/about-us" },
      { name: "Leadership", path: "/leadership" },
      { name: "Brand Assets", path: "/brand" },
      { name: "Careers", path: "/working-at-black-diary" },
    ],
  },
  {
    title: "Safety & Legal",
    links: [
      { name: "Support Center", path: "/safety-support" },
      { name: "Safety Tools", path: "/safety-tools" },
      { name: "Privacy Tools", path: "/privacy-tools" },
      { name: "Account Security", path: "/account-security" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms & Conditions", path: "/terms-and-conditions" },
    ],
  },
  {
    title: "Your Account",
    links: [
      { name: "Login", path: "/login" },
      { name: "Sign Up", path: "/signup" },
      { name: "Your Profile", path: "/profile" },
      { name: "Edit Profile", path: "/account/edit-profile" },
      { name: "Login Activity", path: "/account/login-activity" },
      { name: "Manage Account", path: "/account/manage-account" },
    ],
  },
];

const SitemapPage = () => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["sitemap"].includes(item.type)));

  const Section = ({ title, links }) => (
    <section className="group rounded-[28px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.28)] sm:p-7">
      <div className="mb-5 flex items-center gap-4">
        <div className="h-10 w-1 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.35)]" />
        <h2 className="poetic-heading text-2xl font-semibold text-[#F6E7C8]">{title}</h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className="flex h-full items-center justify-between rounded-[18px] border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-3 text-sm font-medium text-[#D0D0D0] transition-all duration-300 hover:border-[rgba(212,175,55,0.28)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F6E7C8]"
            >
              <span>{link.name}</span>
              <span className="text-[#F1C56A] transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F1C56A]">Navigation</p>
              <h1 className="poetic-heading mt-3 text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">{headingData?.title || "Sitemap"}</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">{headingData?.sub_title || "An overview of all pages on Black Diary."}</p>
            </div>

            <div className="mt-10 grid w-full gap-6 md:grid-cols-2 xl:grid-cols-2">
              {sitemapSections.map((section) => (
                <Section key={section.title} {...section} />
              ))}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default SitemapPage;
