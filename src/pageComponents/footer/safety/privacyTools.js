"use client";

import React from "react";
import PublicLayout from "../../../components/layout/publicLayout";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, MessageOutlined, TagsOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useRequest } from "../../../hooks/useReduxRequest";
import apiPath from "../../../constants/apiPath";

const getPrivacyIcon = (title = "") => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("mention") || normalizedTitle.includes("tag")) return <TagsOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("activity") || normalizedTitle.includes("status")) return <UserSwitchOutlined className="text-3xl text-indigo-500" />;
  if (normalizedTitle.includes("story") || normalizedTitle.includes("reply") || normalizedTitle.includes("share")) return <MessageOutlined className="text-3xl text-indigo-500" />;

  return <EyeInvisibleOutlined className="text-3xl text-indigo-500" />;
};

const PrivacyTools = () => {
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => item.type === "user_privacy_tools"));
  const { response: data, loading } = useRequest(`${apiPath.common.getMasters}/user_privacy_tools`);

  const privacyOptions = React.useMemo(() => {
    const list = data?.data;
    if (!Array.isArray(list)) return [];

    return list.map((item) => {
      const title = item?.title || item?.name || "";

      return {
        icon: getPrivacyIcon(title),
        title,
        description: item?.description || "",
        link: item?.link || item?.url || "#",
        linkText: item?.sub_title || "Learn More",
      };
    });
  }, [data]);

  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
            {/* Header */}
            <div className="max-w-3xl text-center">
              <h1 className="poetic-heading text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">{headingData?.title || ""}</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">{headingData?.sub_title || ""}</p>
            </div>

            {/* Privacy Settings List */}
            <div className="mt-10 grid w-full gap-8">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl"
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div className="h-11 w-11 rounded-full bg-[rgba(255,255,255,0.08)]" />
                        <div className="h-6 w-40 rounded bg-[rgba(255,255,255,0.08)]" />
                      </div>
                      <div className="mb-2 h-4 w-full rounded bg-[rgba(255,255,255,0.08)]" />
                      <div className="mb-6 h-4 w-5/6 rounded bg-[rgba(255,255,255,0.06)]" />
                      <div className="h-4 w-28 rounded bg-[rgba(255,255,255,0.08)]" />
                    </div>
                  ))
                : privacyOptions.map((option, index) => (
                    <div
                      key={index}
                      className="group flex flex-col gap-5 rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 text-[#D7D7D7] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-[rgba(212,175,55,0.28)] sm:flex-row sm:items-start"
                    >
                      <div className="flex-shrink-0 rounded-2xl border border-[rgba(212,175,55,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#F6E7C8]">{option.title}</h3>
                        <p className="mt-2 mb-5 text-sm leading-7 text-[#D0D0D0] sm:text-[15px]">{option.description}</p>
                        <Link to={option.link} className="inline-flex items-center gap-1 font-semibold text-[#F1C56A] transition-colors duration-300 hover:text-[#FFD97A]">
                          {option.linkText}
                          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  ))}
              {!loading && privacyOptions.length === 0 && (
                <div className="rounded-[24px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] px-6 py-10 text-center text-[#CFC3B0] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
                  No privacy tools available right now.
                </div>
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default PrivacyTools;
