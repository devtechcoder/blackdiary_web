"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { useRequest } from "../../hooks/useRequest";
import apiPath from "../../constants/apiPath";
import Prouser from "../../assets/images/user.png";
import AppImage from "../../components/AppImage";
import { LikeShareActionIcon } from "../../components/ButtonField";
import { Severty, ShowToast } from "../../helper/toast";
import useProtectedAction from "../../hooks/useProtectedAction";

const quoteThemes = [
  "from-[#1a1510] via-[#13110d] to-[#0b0b0b]",
  "from-[#151515] via-[#17110a] to-[#0b0b0b]",
  "from-[#101318] via-[#15110c] to-[#0a0a0a]",
];

const ShayariFeedCard = ({ shayari, index }) => {
  const navigate = useNavigate();
  const { request } = useRequest();
  const authorName = shayari?.author?.name || shayari?.author?.user_name || shayari?.author?.username || "Unknown User";
  const authorHandle = String(shayari?.author?.user_name || shayari?.author?.username || authorName).replace(/^@/, "");
  const timeAgo = shayari?.created_at ? dayjs(shayari.created_at).fromNow() : "Freshly written";
  const themeClass = quoteThemes[index % quoteThemes.length];
  const [showFollowButton, setShowFollowButton] = useState(!Boolean(shayari?.is_follow));
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    setShowFollowButton(!Boolean(shayari?.is_follow));
  }, [shayari?._id, shayari?.is_follow]);

  const handleFollowToggle = () => {
    const authorId = shayari?.author?._id;
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
    actionKey: `follow:${shayari?._id || shayari?.author?._id || "default"}`,
    execute: handleFollowToggle,
  });

  return (
    <article className="group mx-auto w-full max-w-[54rem] overflow-hidden rounded-[30px] border border-[rgba(255,215,0,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-[1px] shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="relative overflow-hidden rounded-[29px] bg-[linear-gradient(180deg,rgba(14,14,14,0.98),rgba(8,8,8,0.98))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_76%,rgba(255,215,0,0.03))]" />

        <div className="relative border-b border-[rgba(255,215,0,0.08)] px-4 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <button type="button" className="flex min-w-0 flex-1 items-center gap-2 text-left sm:gap-3" onClick={() => navigate(`/@${authorHandle}`)}>
              <AppImage src={shayari?.author?.image || Prouser} alt={authorName} width={50} height={50} className="h-10 w-10 rounded-full border border-[rgba(255,215,0,0.18)] object-cover sm:h-12 sm:w-12" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#fff2cf] sm:text-base">{authorName}</p>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#958660] sm:mt-1 sm:gap-2 sm:text-[11px] sm:tracking-[0.18em]">
                  <span className="truncate">@{authorHandle}</span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(255,215,0,0.45)]" />
                  <span>{timeAgo}</span>
                </div>
              </div>
            </button>

            {!shayari?.is_own_post && shayari?.author?._id && showFollowButton ? (
              <button type="button" onClick={protectedFollowAction} disabled={followLoading} className={followButtonClass}>
                {followLoading ? "Please..." : "Follow"}
              </button>
            ) : null}
          </div>
        </div>

        <div className={`relative bg-gradient-to-br ${themeClass} px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6`}>
          <div className="mx-auto max-w-[42rem]">
            <div className="max-h-[36vh] overflow-y-auto pr-1 sm:max-h-[40vh] lg:max-h-[44vh]">
              <div
                className="poetic-heading text-center text-[1.05rem] leading-[1.55] text-[#f8f0df] sm:text-[1.25rem] md:text-[1.55rem] lg:text-[1.8rem]"
                dangerouslySetInnerHTML={{ __html: shayari?.content || "" }}
              />
            </div>
          </div>
        </div>

        <div className="relative px-4 py-3 sm:px-5 sm:py-4">
          <LikeShareActionIcon item={shayari} variant="diary" showMeta={false} showLabels showLikeCount compact fullWidth={false} />
        </div>
      </div>
    </article>
  );
};

export default ShayariFeedCard;
