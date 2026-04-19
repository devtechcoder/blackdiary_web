import React, { useState, useEffect, useRef, useCallback } from "react";
import { Spin } from "antd";
import { HiSparkles } from "react-icons/hi2";
import apiPath from "../../constants/apiPath";
import { useGetApi, useRequest } from "../../hooks/useRequest";
import dayjs from "dayjs";
import Prouser from "../../assets/images/user.png";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { useNavigate } from "react-router";
import AppImage from "../../components/AppImage";
import { stripHtml } from "../../helper/functions";
import { Severty, ShowToast } from "../../helper/toast";
import useProtectedAction from "../../hooks/useProtectedAction";

const PostSkeleton = () => (
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
    <div className="mt-5 aspect-[4/5] rounded-[24px] bg-[rgba(255,255,255,0.05)]" />
    <div className="mt-5 h-12 rounded-full bg-[rgba(255,255,255,0.05)]" />
  </div>
);

const EmptyState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,215,0,0.16)] bg-[rgba(255,215,0,0.06)] text-[#f1d785]">
      <HiSparkles className="text-2xl" />
    </div>
    <h3 className="poetic-heading mt-5 text-3xl text-[#fff2cc]">No posts to show</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#aea38b]">Visual stories will appear here once creators publish new moments.</p>
  </div>
);

const ErrorState = () => (
  <div className="mx-auto w-full max-w-[54rem] rounded-[28px] border border-[rgba(255,120,120,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-12 text-center">
    <h3 className="poetic-heading text-3xl text-[#ffe0d6]">Posts could not load</h3>
    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#c8b0a9]">Something went wrong while loading posts. Please refresh and try again.</p>
  </div>
);

const PostCard = ({ post, index, likeType = "post" }) => {
  const navigate = useNavigate();
  const { request } = useRequest();
  const authorName = post?.author?.name || post?.author?.user_name || post?.author?.username || "Unknown User";
  const authorHandle = String(post?.author?.user_name || post?.author?.username || authorName).replace(/^@/, "");
  const timeAgo = post?.created_at ? dayjs(post.created_at).fromNow() : "Freshly posted";
  const plainText = stripHtml(post?.content || "");
  const [showFollowButton, setShowFollowButton] = useState(!Boolean(post?.is_follow));
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    setShowFollowButton(!Boolean(post?.is_follow));
  }, [post?._id, post?.is_follow]);

  const handleFollowToggle = () => {
    const authorId = post?.author?._id;
    if (!authorId) return;

    setFollowLoading(true);
    request({
      url: apiPath.toggleFollow,
      method: "POST",
      data: {
        following_id: authorId,
      },
      onSuccess: (response) => {
        setFollowLoading(false);
        if (response?.status) {
          setShowFollowButton(false);
          ShowToast(response?.message || "Follow state updated", Severty.SUCCESS);
        } else {
          ShowToast(response?.message || "Unable to update follow state", Severty.ERROR);
        }
      },
      onError: (error) => {
        setFollowLoading(false);
        ShowToast(error?.response?.data?.message || "Unable to update follow state", Severty.ERROR);
      },
    });
  };

  const followButtonClass = "flex shrink-0 items-center justify-center rounded-full bg-[#d4af37] px-3 py-1.5 text-xs font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2cb57] sm:px-4 sm:py-2 sm:text-sm";
  const protectedFollowAction = useProtectedAction({
    actionKey: `follow:${post?.author?._id || post?._id || "default"}`,
    execute: handleFollowToggle,
  });

  return (
    <article className="group mx-auto w-full max-w-[54rem] overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden rounded-[29px] bg-[linear-gradient(180deg,rgba(14,14,14,0.98),rgba(8,8,8,0.98))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_25%,transparent_78%,rgba(255,215,0,0.03))]" />

        <div className="relative border-b border-[rgba(255,215,0,0.08)] px-4 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <button type="button" className="flex min-w-0 flex-1 items-center gap-2 text-left sm:gap-3" onClick={() => navigate(`/@${authorHandle}`)}>
              <AppImage src={post?.author?.image || Prouser} alt={authorName} width={50} height={50} className="h-10 w-10 rounded-full border border-[rgba(255,215,0,0.18)] object-cover sm:h-12 sm:w-12" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#fff2cf] sm:text-base">{authorName}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#958660] sm:mt-1 sm:gap-2 sm:text-[11px] sm:tracking-[0.18em]">
                  <span className="truncate">@{authorHandle}</span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(255,215,0,0.45)]" />
                  <span>{timeAgo}</span>
                </div>
              </div>
            </button>

            {!post?.is_own_post && post?.author?._id && showFollowButton ? (
              <button type="button" onClick={protectedFollowAction} disabled={followLoading} className={followButtonClass}>
                {followLoading ? "Please..." : "Follow"}
              </button>
            ) : null}
          </div>
        </div>

        <div className="relative p-2.5 sm:p-3.5">
          <div className="overflow-hidden rounded-[26px] border border-[rgba(255,215,0,0.08)] bg-[rgba(255,255,255,0.02)]">
            {post.image ? (
              <AppImage src={post.image} alt="Post" width={1200} height={1200} className="h-auto max-h-[46vh] w-full bg-[#0f0f0f] object-cover sm:max-h-[52vh] lg:max-h-[58vh]" />
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#171717,#0c0c0c)] px-6 text-center sm:aspect-[16/10]">
                <p className="poetic-heading text-[1.15rem] leading-[1.5] text-[#f7efd9] sm:text-[1.55rem]">A visual post without media still deserves a graceful canvas.</p>
              </div>
            )}
          </div>

          {plainText ? (
            <div className="mt-3 rounded-[22px] border border-[rgba(255,215,0,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3.5 sm:px-5">
              <p className="text-sm leading-7 text-[#d9d1bd] sm:text-[15px]">{plainText}</p>
            </div>
          ) : null}
          <div className="mt-4 px-2 pb-1 sm:px-4">
            <LikeShareActionIcon item={post} variant="diary" showMeta={false} showLabels showLikeCount compact fullWidth={false} type={likeType} />
          </div>
        </div>
      </div>
    </article>
  );
};

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 6, total: 0 });
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const { data, isFetching, isError } = useGetApi({
    queryKey: ["post", pagination.current],
    endpoint: `${apiPath.getPost}?page=${pagination.current}&pageSize=${pagination.pageSize}`,
    enabled: hasMore,
  });

  useEffect(() => {
    if (data?.status && !isError) {
      const newDocs = data?.data?.docs ?? [];

      setPosts((prev) => {
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

  const lastPostElementRef = useCallback(
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
        {isError && posts.length === 0 ? <ErrorState /> : null}

        {posts.map((post, index) => {
          const card = <PostCard key={post?._id || index} post={post} index={index} />;

          if (posts.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={post?._id || index}>
                {card}
              </div>
            );
          }

          return card;
        })}

        {isFetching && (
          <div className="space-y-5 sm:space-y-6">
            {Array.from({ length: posts.length ? 1 : 2 }).map((_, index) => (
              <PostSkeleton key={index} />
            ))}
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          </div>
        )}

        {!isFetching && !isError && posts.length === 0 ? <EmptyState /> : null}

        {!hasMore && posts.length > 0 ? <p className="py-2 text-center text-sm uppercase tracking-[0.22em] text-[#746b58]">You have reached the end of the feed</p> : null}
      </div>
    </section>
  );
};

export default PostPage;
export { PostCard };
