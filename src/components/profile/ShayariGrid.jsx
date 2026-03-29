import React, { useCallback, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import { useNavigate } from "react-router";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import ShayariCard from "./ShayariCard";

const ShayariGrid = ({ userId, activeTab = "shayari", onMetaChange }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);
  const navigate = useNavigate();

  const endpoint = activeTab === "shayari" ? apiPath.getShayari : apiPath.getPost;
  const { data, isFetching } = useGetApi({
    queryKey: ["profile-feed", userId, activeTab, pagination.current],
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

  if (!isFetching && items.length === 0) {
    return <div className="rounded-2xl border border-dashed border-[#2a2a2a] py-16 text-center text-[#8a8a8a]">No {activeTab} published yet.</div>;
  }

  return (
    <section className="space-y-8">
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
