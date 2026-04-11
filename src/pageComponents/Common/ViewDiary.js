import React, { useEffect, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import defaultNoData from "../../assets/images/default/default-no-data.png";
import AppImage from "../../components/AppImage";
import ShayariFeedCard from "./ShayariFeedCard";

const LoadingCard = () => (
  <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 md:p-6">
    <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] animate-[shimmer_2.2s_infinite]" />
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[rgba(255,255,255,0.07)]" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.07)]" />
          <div className="h-3 w-20 rounded-full bg-[rgba(255,255,255,0.05)]" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[88%] rounded-full bg-[rgba(255,255,255,0.06)]" />
        <div className="h-4 w-[72%] rounded-full bg-[rgba(255,255,255,0.06)]" />
      </div>
      <div className="mt-6 h-12 w-full rounded-2xl bg-[rgba(255,255,255,0.05)]" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-12 text-center backdrop-blur-xl md:px-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.1),transparent_40%)]" />
    <div className="relative mx-auto max-w-lg">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(255,215,0,0.14)] bg-[rgba(255,215,0,0.05)]">
        <AppImage src={defaultNoData} alt="No Data" width={88} height={88} className="h-20 w-20 object-contain opacity-90" />
      </div>
      <h3 className="poetic-heading mt-6 text-3xl text-[#fff6dc]">No shayari found</h3>
      <p className="mt-3 text-sm leading-7 text-[#a9a9a9]">This page is quiet right now. Try another mood or come back when the diary has new verses to offer.</p>
    </div>
  </div>
);

const ViewDiary = ({ selectedCategory, selectedSubCategory, pageData, pageType = "subCategory" }) => {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const { data, isLoading, isError, error, refetch } = useGetApi({
    queryKey: pageType,
    endpoint: `${apiPath.getDiary}?category=${selectedCategory ?? ""}&sub_category_id=${selectedSubCategory ?? ""}${pageType === "occasion" ? `&occasion_id=${pageData?._id}` : ""}&page=${
      pagination.current
    }&pageSize=${pagination.pageSize}`,
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedSubCategory, refetch]);

  useEffect(() => {
    if (data?.status && !isError) {
      setList(data?.data?.docs ?? []);
      setPagination((prev) => ({ ...prev, total: data?.data?.totalDocs ?? 0 }));
    }
  }, [data, isError]);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] p-6 text-white">
          <p>Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-10">
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>

      {list?.length ? (
        <div className="space-y-6">
          {list.map((item, index) => (
            <ShayariFeedCard key={item?._id || index} shayari={item} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default ViewDiary;
