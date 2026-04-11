import React, { useState, useEffect, useRef, useCallback } from "react";
import { Spin } from "antd";
import { HiSparkles } from "react-icons/hi2";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import ShayariFeedCard from "../Common/ShayariFeedCard";

const FeedSkeleton = () => (
  <div className="mx-auto w-full max-w-[54rem] animate-pulse overflow-hidden rounded-[28px] border border-[rgba(255,215,0,0.1)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 sm:p-5">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.08)]" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.08)]" />
          <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>
      <div className="h-10 w-24 rounded-full bg-[rgba(255,215,0,0.12)]" />
    </div>
    <div className="mt-5 rounded-[24px] bg-[rgba(255,255,255,0.03)] px-5 py-8">
      <div className="space-y-4">
        <div className="h-4 w-full rounded-full bg-[rgba(255,255,255,0.07)]" />
        <div className="h-4 w-[88%] rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[74%] rounded-full bg-[rgba(255,255,255,0.05)]" />
      </div>
    </div>
    <div className="mt-5 h-12 rounded-full bg-[rgba(255,255,255,0.05)]" />
  </div>
);

const EmptyState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,215,0,0.16)] bg-[rgba(255,215,0,0.06)] text-[#f1d785]">
      <HiSparkles className="text-2xl" />
    </div>
    <h3 className="poetic-heading mt-5 text-3xl text-[#fff2cc]">Feed is quiet right now</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#aea38b]">New lines will appear here as soon as fresh shayari is published.</p>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,120,120,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <h3 className="poetic-heading text-3xl text-[#ffe0d6]">Feed could not load</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#c8b0a9]">Something went wrong while loading shayari. Please refresh and try again.</p>
  </div>
);

const ShayariPage = () => {
  const [shayaris, setShayaris] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 4, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError } = useGetApi({
    queryKey: ["shayari", pagination.current],
    endpoint: `${apiPath.getShayari}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data?.data?.docs ?? [];

      setShayaris((prev) => {
        const existingIds = new Set(prev.map((item) => item?._id));
        const merged = [...prev];

        newDocs.forEach((item) => {
          if (!existingIds.has(item?._id)) {
            merged.push(item);
          }
        });

        return merged;
      });

      setPagination((prev) => ({
        ...prev,
        total: data?.data?.totalDocs ?? 0,
      }));

      if (data?.data?.page >= data?.data?.totalPages) {
        setHasMore(false);
      }
    }
  }, [data, isError]);

  const lastShayariElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore],
  );

  return (
    <section className="w-full">
      <div className="space-y-4 sm:space-y-5">
        {isError && shayaris.length === 0 ? <ErrorState /> : null}

        {shayaris.map((shayari, index) => {
          const card = <ShayariFeedCard key={shayari?._id || index} shayari={shayari} index={index} />;

          if (shayaris.length === index + 1) {
            return (
              <div ref={lastShayariElementRef} key={shayari?._id || index}>
                {card}
              </div>
            );
          }

          return card;
        })}

        {isFetching && (
          <div className="space-y-5 sm:space-y-6">
            {Array.from({ length: shayaris.length ? 1 : 2 }).map((_, index) => (
              <FeedSkeleton key={index} />
            ))}
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          </div>
        )}

        {!isFetching && !isError && shayaris.length === 0 ? <EmptyState /> : null}

        {!hasMore && shayaris.length > 0 ? <p className="py-2 text-center text-sm uppercase tracking-[0.22em] text-[#746b58]">You have reached the end of the feed</p> : null}
      </div>
    </section>
  );
};

export default ShayariPage;
