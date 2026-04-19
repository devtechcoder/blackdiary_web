"use client";

import React, { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/publicLayout";
import apiPath from "../../constants/apiPath";
import { useRequest } from "../../hooks/useReduxRequest";
import { useSelector } from "react-redux";

const AboutUs = () => {
  const [list, setList] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["about_us"].includes(item.type)));

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setShouldFetch(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { response: data, loading } = useRequest(`${apiPath.common.getCms}/about-us`, {
    skip: !shouldFetch,
  });

  useEffect(() => {
    if (data?.status) {
      setList(data?.data ?? {});
    }
  }, [data]);

  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.14),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.1),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.75)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center">
            <div className="max-w-3xl text-center">
              <h1 className="poetic-heading text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">{headingData?.title || "About Us"}</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">{headingData?.sub_title || ""}</p>
            </div>

            <div className="mt-8 w-full rounded-[28px] border border-[rgba(212,175,55,0.18)] bg-[rgba(255,255,255,0.03)] p-5 text-[#D7D7D7] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-[20px] border border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.03)] p-5">
                      <div className="h-4 w-full rounded bg-[rgba(255,255,255,0.06)] mb-3" />
                      <div className="h-4 w-11/12 rounded bg-[rgba(255,255,255,0.05)] mb-3" />
                      <div className="h-4 w-10/12 rounded bg-[rgba(255,255,255,0.04)]" />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="about-us-content space-y-4 text-sm leading-7 text-[#D0D0D0] sm:text-[15px] [&_h1]:poetic-heading [&_h1]:mb-2 [&_h1]:text-2xl [&_h1]:text-[#F1C56A] [&_h2]:poetic-heading [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:text-[#F1C56A] [&_h3]:font-semibold [&_h3]:text-[#F6DEA1] [&_p]:text-[#D0D0D0] [&_a]:text-[#F1C56A] [&_a]:underline [&_a:hover]:text-[#FFD97A]"
                  dangerouslySetInnerHTML={{ __html: list?.description || "" }}
                />
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default AboutUs;
