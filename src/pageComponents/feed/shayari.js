import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Avatar, Input, Button, Spin } from "antd";
import { HeartOutlined, HeartFilled, MessageOutlined, SendOutlined, MoreOutlined } from "@ant-design/icons";
import Main from "../../components/layout/Main";
import apiPath from "../../constants/apiPath";
import { useGetApi } from "../../hooks/useRequest";
import dayjs from "dayjs";
import Prouser from "../../assets/images/user.png";
import { FollowIcon, LikeShareActionIcon } from "../../components/ButtonField";
import { useNavigate } from "react-router";

// Utility to get a random gradient background
const gradients = [
  "bg-gradient-to-br from-[#171717] to-[#0d0d0d]",
  "bg-gradient-to-br from-[#1f1a12] to-[#0d0d0d]",
  "bg-gradient-to-br from-[#1d1710] to-[#0d0d0d]",
];
const getRandomGradient = () => gradients[Math.floor(Math.random() * gradients.length)];

// Utility to strip HTML tags for plain text display

const ShayariCard = ({ shayari }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-lg premium-shayari-card premium-hover-card mb-6" bodyStyle={{ padding: 0 }}>
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/@${shayari.author?.user_name}`)}>
          <Avatar src={shayari.author?.image || Prouser} />
          <span className="text-white font-semibold premium-title">{shayari.author?.user_name || "Unknown User"}</span>
        </div>
        <div className="flex items-center gap-4">
          {!shayari?.is_follow && <FollowIcon userId={shayari?.author?._id} hideButton={shayari?.is_follow || false} />}
          <MoreOutlined className="text-white text-xl cursor-pointer" />
        </div>
      </div>

      {/* Shayari Text Content */}
      <div className={`flex items-center justify-center text-center p-8 min-h-[300px] ${getRandomGradient()}`}>
        <p
          className="poetic-content text-xl md:text-2xl font-medium leading-relaxed whitespace-pre-line text-white"
          style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
          dangerouslySetInnerHTML={{ __html: shayari?.content }}
        />
      </div>

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center text-white text-xl">
          <div className="flex gap-4">
            <LikeShareActionIcon item={shayari} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ShayariPage = () => {
  const [shayaris, setShayaris] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError, error } = useGetApi({
    queryKey: ["shayari", pagination.current],
    endpoint: `${apiPath.getShayari}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore, // Only fetch if there's more data
  });
  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data.data.docs;
      // Append new data to the existing list
      setShayaris((prev) => [...prev, ...newDocs]);
      setPagination((prev) => ({
        ...prev,
        total: data.data.totalDocs,
      }));
      // Check if there are more pages to load
      if (data.data.page >= data.data.totalPages) {
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
    [isFetching, hasMore]
  );

  return (
    <>
      <div className="flex justify-center w-full bg-[#0d0d0d] text-white">
        <div className="flex flex-col items-center w-full px-4">
          {shayaris.map((shayari, index) => {
            if (shayaris.length === index + 1) {
              return (
                <div ref={lastShayariElementRef} key={shayari._id}>
                  <ShayariCard shayari={shayari} />
                </div>
              );
            } else {
              return <ShayariCard key={shayari._id} shayari={shayari} />;
            }
          })}

          {isFetching && <Spin size="large" className="my-4" />}

          {!hasMore && <p className="text-gray-500 my-4">You've reached the end!</p>}
        </div>
      </div>
    </>
  );
};

export default ShayariPage;
