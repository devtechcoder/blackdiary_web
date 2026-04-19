"use client";

import React, { useEffect, useState } from "react";
import PublicLayout from "../../components/layout/publicLayout";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import { useSelector } from "react-redux";

const TermsAndConditions = () => {
  const [list, setList] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const headingData = useSelector((state) => state.masterData.allPageHeadings?.find((item) => ["terms_and_conditions"].includes(item.type)));

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setShouldFetch(true));
    return () => cancelAnimationFrame(frameId);
  }, []);

  const { response: data, loading } = useRequest(`${apiPath.common.getCms}/terms-and-conditions`, {
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

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
            <div className="max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F1C56A]">Legal</p>
              <h1 className="poetic-heading mt-3 text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">{headingData?.title || "Terms and Conditions"}</h1>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#CFC3B0] sm:text-[15px]">{headingData?.sub_title || ""}</p>
            </div>

            <div className="mt-10 w-full rounded-[30px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] p-6 text-[#D7D7D7] shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-8 lg:p-10">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="rounded-[24px] border border-[rgba(212,175,55,0.12)] bg-[rgba(255,255,255,0.03)] p-5 sm:p-6">
                      <div className="h-4 w-full rounded bg-[rgba(255,255,255,0.08)] mb-3" />
                      <div className="h-4 w-11/12 rounded bg-[rgba(255,255,255,0.06)] mb-3" />
                      <div className="h-4 w-10/12 rounded bg-[rgba(255,255,255,0.05)]" />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="terms-conditions-content space-y-5 text-sm leading-7 text-[#D0D0D0] sm:text-[15px] [&_h1]:poetic-heading [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:text-[#F1C56A] [&_h2]:poetic-heading [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:text-[#F1C56A] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#F6E7C8] [&_p]:mb-3 [&_p]:text-[#D0D0D0] [&_ul]:my-4 [&_ol]:my-4 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mb-2 [&_a]:text-[#F1C56A] [&_a]:underline [&_a:hover]:text-[#FFD97A] [&_strong]:text-[#F6E7C8] [&_hr]:my-6 [&_hr]:border-[rgba(212,175,55,0.16)]"
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

export default TermsAndConditions;
