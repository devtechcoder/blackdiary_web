"use client";

import React, { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PublicLayout from "../../components/layout/publicLayout";
import { useRequest } from "../../hooks/useReduxRequest";
import apiPath from "../../constants/apiPath";
import TeamCard from "./TeamCard";

const Leadership = () => {
  const [list, setList] = useState([]);
  const [pagination] = useState({ current: 1, pageSize: 10 });

  const { response: data, loading } = useRequest(`${apiPath.getLeadershipList}?page=${pagination.current}&pageSize=${pagination.pageSize}`);

  useEffect(() => {
    if (data?.status) {
      setList(data?.data?.docs ?? []);
    }
  }, [data]);

  const teamMembers = list.slice(0, 4);

  return (
    <>
      <PublicLayout contentClassName="p-0 text-white bg-[#0d0d0d] flex flex-col flex-1 overflow-x-hidden" containerClassName="flex flex-col flex-1 w-full max-w-none">
        <LazyMotion features={domAnimation}>
          <section className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#1a120b_0%,#0b0806_42%,#050302_100%)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,173,66,0.16),transparent_26%),radial-gradient(circle_at_10%_40%,rgba(255,132,31,0.16),transparent_18%),radial-gradient(circle_at_90%_38%,rgba(255,132,31,0.16),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,175,71,0.12),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,188,84,0.8)_0.7px,transparent_0.7px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute inset-y-0 left-8 w-px bg-[linear-gradient(180deg,transparent,rgba(212,175,55,0.32),transparent)]" />
            <div className="pointer-events-none absolute inset-y-0 right-8 w-px bg-[linear-gradient(180deg,transparent,rgba(212,175,55,0.32),transparent)]" />
            <m.div
              animate={{ y: [0, -10, 0], opacity: [0.14, 0.26, 0.14] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="pointer-events-none absolute left-[8%] top-[14%] h-28 w-28 rounded-full bg-[rgba(255,164,63,0.12)] blur-3xl"
            />
            <m.div
              animate={{ y: [0, 14, 0], opacity: [0.1, 0.22, 0.1] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
              className="pointer-events-none absolute right-[10%] top-[22%] h-36 w-36 rounded-full bg-[rgba(255,164,63,0.08)] blur-3xl"
            />
            <m.div
              animate={{ x: [0, 12, 0], opacity: [0.12, 0.2, 0.12] }}
              transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.7 }}
              className="pointer-events-none absolute bottom-[10%] left-[18%] h-24 w-24 rounded-full bg-[rgba(255,164,63,0.08)] blur-3xl"
            />

            <div className="relative mx-auto flex max-w-[1600px] flex-col items-center">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="poetic-heading text-3xl font-semibold text-[#F1C56A] sm:text-4xl lg:text-5xl">
                  Our Leadership
                </h1>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#CFC3B0] sm:mt-3 sm:text-[15px]">
                  The passionate team dedicated to bringing poetry to the world.
                </p>
              </div>

              <div className="mt-5 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
                {loading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-[26px] border border-[rgba(212,175,55,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-5"
                      >
                        <div className="mx-auto h-24 w-24 rounded-full border border-[rgba(212,175,55,0.2)] bg-[rgba(255,255,255,0.04)] sm:h-28 sm:w-28" />
                        <div className="mx-auto mt-4 h-6 w-32 rounded-full bg-[rgba(255,255,255,0.06)] sm:mt-5 sm:w-40" />
                        <div className="mx-auto mt-2 h-3.5 w-24 rounded-full bg-[rgba(255,255,255,0.05)] sm:w-28" />
                        <div className="mx-auto mt-3 h-3.5 w-full rounded-full bg-[rgba(255,255,255,0.05)]" />
                        <div className="mx-auto mt-2 h-3.5 w-[92%] rounded-full bg-[rgba(255,255,255,0.05)]" />
                        <div className="mx-auto mt-2 h-3.5 w-[82%] rounded-full bg-[rgba(255,255,255,0.05)]" />
                      </div>
                    ))
                  : teamMembers.map((member, index) => <TeamCard key={member?._id || index} member={member} index={index} />)}
              </div>

              {!loading && !teamMembers.length ? (
                <div className="mt-8 rounded-[28px] border border-[rgba(212,175,55,0.16)] bg-[rgba(255,255,255,0.03)] px-6 py-12 text-center text-[#B9B9B9] backdrop-blur-xl">
                  No leadership data available right now.
                </div>
              ) : null}
            </div>
          </section>
        </LazyMotion>
      </PublicLayout>
    </>
  );
};

export default Leadership;
