import React, { useCallback, useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import { useGetApi } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import ShayariFeedCard from "../../pageComponents/Common/ShayariFeedCard";
import { PostCard } from "../../pageComponents/feed/post";

const ShayariGrid = ({ userId, activeTab = "shayari", onMetaChange }) => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

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
    <section className="space-y-5">
      <div className="space-y-4 sm:space-y-5">
        {items.map((item, index) => (
          <div key={item._id} ref={index === items.length - 1 ? lastItemRef : null}>
            {activeTab === "shayari" ? <ShayariFeedCard shayari={item} index={index} /> : <PostCard post={item} index={index} likeType="post" />}
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
