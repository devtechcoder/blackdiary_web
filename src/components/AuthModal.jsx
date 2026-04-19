"use client";

import React from "react";
import { Modal } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { closeAuthModal, selectAuthReturnTo, selectIsAuthModalOpen } from "../redux/slices/modalSlice";

const AuthModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthModalOpen = useSelector(selectIsAuthModalOpen);
  const returnTo = useSelector(selectAuthReturnTo);

  const handleClose = () => {
    dispatch(closeAuthModal());
  };

  const handleLogin = () => {
    const nextPath = returnTo || (typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/");
    dispatch(closeAuthModal({ preservePending: true }));
    router.push(`/login?next=${encodeURIComponent(nextPath)}`);
  };

  return (
    <Modal
      open={isAuthModalOpen}
      centered
      maskClosable
      onCancel={handleClose}
      footer={null}
      width={420}
      destroyOnClose
      className="custom-modal auth-login-modal"
      styles={{
        mask: { backgroundColor: "rgba(0, 0, 0, 0.88)" },
        content: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className="rounded-2xl bg-[#0b0b0b] p-1 text-white">
        <div className="rounded-[20px] border border-[rgba(255,215,0,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(255,215,0,0.18)] bg-[rgba(212,175,55,0.08)] text-2xl">
            <LockOutlined />
          </div>
          <h2 className="text-2xl font-semibold text-[#fff4d4]">Login Required</h2>
          <p className="mt-2 text-sm leading-6 text-[#b8b8b8]">Please login to continue</p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleLogin}
              className="inline-flex items-center justify-center rounded-full bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6c34f]"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#e7e7e7] transition-all duration-300 hover:border-[rgba(255,255,255,0.24)] hover:bg-[rgba(255,255,255,0.04)]"
            >
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
