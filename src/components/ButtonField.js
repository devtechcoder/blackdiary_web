import { Col, Form, Input, Select, InputNumber, Checkbox } from "antd";
import PhoneInput from "react-phone-input-2";
import { useAppContext } from "../context/AppContext";
import lang from "../helper/langHelper";
import { FaHeart, FaComment, FaShareAlt, FaCopy } from "react-icons/fa";
import { message, Modal } from "antd";
import useRequest from "../hooks/useRequest";
import { useState } from "react";
import apiPath from "../constants/apiPath";
import { Severty, ShowToast } from "../helper/toast";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { stripHtml } from "../helper/functions";
import CommentModal from "./CommentModal";

export const ViewActionIcon = () => {
  const { language } = useAppContext();
  return (
    <div className="cursor-pointer bg-[#D4AF37] p-3 rounded-full shadow-[0_0_14px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD700]">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="black" strokeWidth="6">
        <path d="M50 10 L90 90 H10 Z" />
        <path d="M50 10 V90" />
        <path d="M10 90 L50 60 L90 90" />
      </svg>
    </div>
  );
};

export const LikeShareActionIcon = ({ item, variant = "default", showMeta = true, showLabels = variant === "diary", fullWidth = true }) => {
  const { language } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(item?.is_liked || false);
  const [totalLikes, setTotalLikes] = useState(item?.total_likes || 0);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const { request } = useRequest();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const onLike = (value) => {
    const payload = {
      diary_id: item?._id,
    };
    setLoading(true);
    request({
      url: `${apiPath.toggleLikes}?type=${type || "shayari"}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
          setIsLiked(!isLiked);
          setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  const handleShare = async (shareData) => {
    try {
      await navigator.share(shareData);
      console.log("MDN shared successfully");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };
  const isDiaryVariant = variant === "diary";

  const actionButtonClass = isDiaryVariant
    ? "group flex items-center gap-2 rounded-full border border-[rgba(255,215,0,0.12)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-[12px] font-medium text-[#c4c4c4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,215,0,0.26)] hover:bg-[rgba(255,215,0,0.06)] hover:text-[#fff0bf]"
    : "flex items-center gap-1 transition hover:text-green-400";

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      <div className={`flex flex-wrap items-center justify-start gap-3 ${isDiaryVariant ? "" : "sm:gap-6"} ${isDiaryVariant ? "text-[#b9b9b9]" : "text-zinc-400"}`}>
        <button
          type="button"
          className={`${actionButtonClass} ${isLiked ? (isDiaryVariant ? "border-[rgba(255,215,0,0.34)] bg-[rgba(255,215,0,0.08)] text-[#ffe38a]" : "text-green-400") : ""}`}
          onClick={onLike}
          disabled={loading}
          loading={loading}
        >
          <FaHeart /> <span className={showLabels ? "" : "hidden sm:inline"}>Like</span>
        </button>
        <button type="button" className={actionButtonClass} onClick={() => setIsCommentModalVisible(true)}>
          <FaComment /> <span className={showLabels ? "" : "hidden sm:inline"}>Comment</span>
        </button>
        <button
          type="button"
          className={actionButtonClass}
          onClick={() => {
            const temp = document.createElement("div");
            temp.innerHTML = item?.content || "";
            const plainText = temp.textContent || temp.innerText || "";

            const title = encodeURIComponent("Black Diary – Shayari");
            const text = encodeURIComponent(`${plainText}\n\nRead this Shayari on Black Diary 💫`);
            const baseUrl = window.location.origin + "/sub-category/details";

            const shareUrl = `${baseUrl}?title=${title}&text=${text}`;

            const shareData = {
              url: shareUrl,
            };
            handleShare(shareData);
          }}
        >
          <FaShareAlt /> <span className={showLabels ? "" : "hidden sm:inline"}>Share</span>
        </button>

        <button
          type="button"
          className={actionButtonClass}
          onClick={() => {
            // Strip HTML using a dummy div
            const tempElement = document.createElement("div");
            tempElement.innerHTML = item?.content || "";
            const plainText = tempElement.textContent || tempElement.innerText || "";

            // Copy to clipboard
            navigator.clipboard.writeText(plainText);
            message.success("Copied to clipboard!");
          }}
        >
          <FaCopy /> <span className={showLabels ? "" : "hidden sm:inline"}>Copy</span>
        </button>
      </div>

      {showMeta ? (
        <div className={`text-white ${isDiaryVariant ? "mt-4" : "mt-2"}`}>
          <p className={`${isDiaryVariant ? "text-xs uppercase tracking-[0.24em] text-[#9f8d61]" : "font-medium text-sm"}`}>{isDiaryVariant ? `${totalLikes} appreciations` : `${totalLikes} likes`}</p>
          <p className={`text-sm ${isDiaryVariant ? "mt-2 leading-6 text-[#d6d6d6]" : ""}`}>
            {!!item?.content && (
              <>
                <span className="font-medium mr-2">{item.author?.user_name || item.author?.username || item.author?.name || "Unknown User"}</span>
                <span className={isDiaryVariant ? "text-[#8e8e8e]" : "text-gray-400"}>{item.content ? `${stripHtml(item.content).substring(0, 80)}...` : ""}</span>
              </>
            )}{" "}
          </p>
          <p className={`${isDiaryVariant ? "mt-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6f6f]" : "text-gray-500 text-xs mt-1 uppercase"}`}>{dayjs(item?.created_at).fromNow()}</p>
        </div>
      ) : null}

      <CommentModal postId={item?._id} visible={isCommentModalVisible} onClose={() => setIsCommentModalVisible(false)} />
    </div>
  );
};

export const FollowIcon = ({ userId, classname, hideButton = false, buttonName = "Follow", onActionComplete }) => {
  const { language } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(hideButton || true);
  const { request } = useRequest();

  const onFollow = (value) => {
    const payload = {
      following_id: userId,
    };
    setLoading(true);
    request({
      url: `${apiPath.toggleFollow}`,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          setShowButton(!showButton);
          ShowToast(data.message, Severty.SUCCESS);
          if (onActionComplete) {
            onActionComplete();
          }
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  return (
    <>
      {!!showButton && (
        <button
          className={classname ? classname : "bg-green-500 text-white font-semibold px-3 py-1 rounded-md text-sm hover:bg-green-600 transition-colors duration-200"}
          onClick={onFollow}
          disabled={loading}
          loading={loading}
        >
          {buttonName}
        </button>
      )}
    </>
  );
};
