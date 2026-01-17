import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Input, Button, List, Avatar, Spin, Form } from "antd";
import { useGetApi } from "../hooks/useRequest";
import useRequest from "../hooks/useRequest";
import apiPath from "../constants/apiPath";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Prouser from "../assets/images/user.png";
import { useAuthContext } from "../context/AuthContext";
import { Severty, ShowToast } from "../helper/toast";
import { useSearchParams } from "react-router-dom";

dayjs.extend(relativeTime);

const CommentModal = ({ postId, visible, onClose }) => {
  const [form] = Form.useForm();
  const { userProfile } = useAuthContext();
  const [comments, setComments] = useState([]);
  const { request: postComment, loading: isPosting } = useRequest();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 15 });
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const observer = useRef();

  const {
    data: commentsData,
    isFetching,
    refetch,
  } = useGetApi({
    queryKey: [`comments`, postId, pagination.current],
    endpoint: `${apiPath.getComments}/${postId}?type=${type || "shayari"}&page=${pagination.current}&limit=${pagination.pageSize}`,
    enabled: hasMore && !!postId && visible,
  });

  useEffect(() => {
    if (visible) {
      setComments([]);
      setPagination({ current: 1, pageSize: 15 });
      setHasMore(true);
    }
  }, [visible, postId]);

  useEffect(() => {
    if (commentsData?.status) {
      const newDocs = commentsData.data.docs;
      setComments((prev) => (pagination.current === 1 ? newDocs : [...prev, ...newDocs]));
      setHasMore(commentsData.data.hasNextPage);
    }
  }, [commentsData]);

  const handlePostComment = (values) => {
    let payload = {
      text: values.comment,
    };

    if (type === "shayari") {
      payload.diary_id = postId;
    } else {
      payload.post_id = postId;
    }

    postComment({
      url: apiPath.addComment,
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        if (data.status) {
          ShowToast("Comment posted!", Severty.SUCCESS);
          form.resetFields();
          // Reset and refetch comments
          setComments([]);
          setPagination({ current: 1, pageSize: 15 });
          setHasMore(true);
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message || "An error occurred", Severty.ERROR);
      },
    });
  };

  const lastCommentElementRef = useCallback(
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
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      className="comment-modal"
      bodyStyle={{
        padding: 0,
        backgroundColor: "transparent",
      }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 bg-[#121212]">
        <h2 className="text-lg font-semibold text-white">Comments</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white transition">
          ✕
        </button>
      </div>

      {/* COMMENT LIST */}
      <div className="flex-grow overflow-y-auto p-4 max-h-[55vh] sm:max-h-[60vh] bg-[#121212]">
        <List
          dataSource={comments}
          className="space-y-3"
          renderItem={(item, index) => {
            const isLastElement = comments.length === index + 1;
            return (
              <div ref={isLastElement ? lastCommentElementRef : null} key={item._id} className="flex space-x-3 border-b border-gray-800 pb-3">
                <Avatar src={item.commenter?.image ? apiPath.assetURL + item.commenter.image : Prouser} className="w-10 h-10" />

                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{item?.commenter?.user_name}</p>

                  <p className="text-gray-300 text-sm leading-snug">{item?.text}</p>

                  <p className="text-gray-500 text-xs mt-1">{dayjs(item?.created_at).fromNow()}</p>
                </div>
              </div>
            );
          }}
        />

        {isFetching && (
          <div className="text-center py-4">
            <Spin />
          </div>
        )}
        {!isFetching && comments.length === 0 && <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>}
      </div>

      {/* COMMENT INPUT */}
      <div className="p-3 border-t border-gray-800 bg-[#121212]">
        <Form form={form} onFinish={handlePostComment} className="flex items-center w-full space-x-3">
          <Avatar src={userProfile?.image ? apiPath.assetURL + userProfile.image : Prouser} className="w-10 h-10" />

          <Form.Item name="comment" className="flex-grow mb-0" rules={[{ required: true, message: "Cannot post an empty comment!" }]}>
            <Input
              placeholder="Add a comment..."
              className="
            w-full 
            bg-gray-800 
            border border-gray-700 
            text-white 
            placeholder-gray-500 
            rounded-xl
            px-3 py-2
            focus:outline-none
            focus:ring-2 
            focus:ring-green-500 
            focus:border-green-500
          hover:bg-black 
          hover:text-white
            transition
          "
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={isPosting}
            className="
          bg-green-500 
          hover:bg-green-500 
          border-none 
          rounded-xl 
          px-4 py-2 
          font-semibold
        "
          >
            Post
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default CommentModal;
