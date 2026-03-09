import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router";
import { FiBookmark, FiSend } from "react-icons/fi";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import ShayariCard from "./ShayariCard";

const stripHtml = (value) => {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const ShayariGrid = ({ userId, activeTab = "shayari", onMetaChange }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const navigate = useNavigate();

  const endpoint = activeTab === "shayari" ? apiPath.getShayari : apiPath.getPost;
  const queryKey = useMemo(() => ["profile-feed", userId, activeTab, pagination.current], [userId, activeTab, pagination.current]);

  const { data, isFetching } = useGetApi({
    queryKey,
    endpoint: `${endpoint}?page=${pagination.current}&pageSize=${pagination.pageSize}&author=${userId}`,
    enabled: Boolean(userId) && hasMore,
  });

  useEffect(() => {
    setItems([]);
    setPagination({ current: 1, pageSize: 8 });
    setHasMore(true);
  }, [activeTab, userId]);

  useEffect(() => {
    if (!data?.status) return;

    const docs = data?.data?.docs || [];
    setItems((prev) => {
      const nextItems = docs.filter((doc) => !prev.some((prevDoc) => prevDoc._id === doc._id));
      return [...prev, ...nextItems];
    });

    const nextPage = Boolean(data?.data?.hasNextPage ?? data?.data?.page < data?.data?.totalPages);
    setHasMore(nextPage);

    if (onMetaChange) {
      onMetaChange(activeTab, {
        totalDocs: data?.data?.totalDocs || 0,
      });
    }
  }, [data, onMetaChange, activeTab]);

  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, current: prev.current + 1 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, isFetching]
  );

  const featuredShayari = useMemo(() => {
    if (activeTab !== "shayari") return [];
    return [...items]
      .sort((a, b) => (b?.total_likes || 0) - (a?.total_likes || 0))
      .slice(0, 5);
  }, [items, activeTab]);

  if (!isFetching && items.length === 0) {
    return <div className="rounded-2xl border border-dashed border-[#2a2a2a] py-16 text-center text-[#8a8a8a]">No {activeTab} published yet.</div>;
  }

  return (
    <section className="space-y-8">
      {activeTab === "shayari" && featuredShayari.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-[#f1d07a]">Featured Shayari by this writer</h3>
          <div className="flex snap-x gap-4 overflow-x-auto pb-2">
            {featuredShayari.map((item) => (
              <article
                key={`featured-${item._id}`}
                className="min-w-[280px] snap-start rounded-3xl border border-[#383838] bg-gradient-to-br from-[#221d12] via-[#17130e] to-[#0f0d0a] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.36)]"
              >
                <p className="mb-5 line-clamp-5 min-h-[140px] font-['Playfair_Display'] text-lg leading-relaxed text-white">{stripHtml(item?.content)}</p>
                <div className="flex items-center justify-between text-sm text-[#cfcfcf]">
                  <span>{item?.total_likes || 0} likes</span>
                  <div className="flex items-center gap-2">
                    <button type="button" className="grid h-8 w-8 place-items-center rounded-full border border-[#4a4a4a] bg-[#0f0f0f] text-[#efefef] transition-colors hover:border-[#E6B422]/70 hover:text-[#E6B422]">
                      <FiSend />
                    </button>
                    <button type="button" className="grid h-8 w-8 place-items-center rounded-full border border-[#4a4a4a] bg-[#0f0f0f] text-[#efefef] transition-colors hover:border-[#E6B422]/70 hover:text-[#E6B422]">
                      <FiBookmark />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item._id} ref={index === items.length - 1 ? lastItemRef : null}>
            <ShayariCard
              item={item}
              type={activeTab}
              assetURL={apiPath.assetURL}
              onOpen={() => navigate(`/feed?type=${activeTab}&id=${item?._id}`)}
            />
          </div>
        ))}
      </div>

      {isFetching && (
        <div className="py-2 text-center">
          <Spin />
        </div>
      )}
    </section>
  );
};

export default ShayariGrid;
