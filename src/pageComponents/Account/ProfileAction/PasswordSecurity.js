"use client";

import { useState } from "react";
import { ArrowLeftOutlined, CheckOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import useRequest from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";
import { Severty, ShowToast } from "../../../helper/toast";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

const PasswordSecurity = () => {
  const { userProfile } = useAuthContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    request({
      url: `${apiPath.changePassword}`,
      method: "PUT",
      data: values,
      onSuccess: ({ status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          form.resetFields();
        } else {
          ShowToast(message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error?.response?.data?.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };

  return (
    <Main>
      <div className="grid min-h-screen bg-black text-white xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70">
          <AccountSideNav />
        </div>

        <div className="account-security-page min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-4xl space-y-6">
            <header className="rounded-[32px] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,#151515_0%,#0d0d0d_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#e7d69c] transition hover:text-[#ffd86d]"
              >
                <ArrowLeftOutlined />
                Back
              </button>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] text-[#f4d787]">
                    <LockOutlined className="text-xl" />
                  </div>
                  <div>
                    <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4d787]">
                      Security
                    </span>
                    <h1 className="poetic-heading text-3xl font-semibold text-white md:text-[2.15rem]">Password and security</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b9b9b9] md:text-base">
                      Update your password anytime to keep your account protected. Use a strong password that you do not use elsewhere.
                    </p>
                  </div>
                </div>

                <div className="rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f4d787]">
                  {userProfile?.user_name || "Account"}
                </div>
              </div>
            </header>

            <div className="grid gap-6">
              <Form form={form} onFinish={onFinish} layout="vertical" className="space-y-6">
                <section className="rounded-[30px] border border-[rgba(212,175,55,0.18)] bg-[#121212] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] md:p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">Change password</h2>
                      <p className="mt-1 text-sm leading-6 text-[#a8a8a8]">Enter your current password and set a new one below.</p>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] text-[#f4d787]">
                      <SafetyCertificateOutlined />
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[24px] border border-white/10 bg-[#101010] p-4 sm:p-5">
                    <Form.Item
                      name="old_password"
                      label={<span className="block text-sm font-semibold text-[#f5f5f5]">Current password</span>}
                      rules={[{ required: true, message: "Please enter the old password!" }]}
                      className="mb-0"
                    >
                      <Input.Password className="account-security-input" placeholder="Enter your current password" autoComplete="current-password" />
                    </Form.Item>

                    <Form.Item
                      name="new_password"
                      label={<span className="block text-sm font-semibold text-[#f5f5f5]">New password</span>}
                      rules={[
                        { required: true, message: "Please enter the new password!" },
                        {
                          pattern: passwordPattern,
                          message: "New password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                        },
                        { max: 250, message: "Password must not be more than 250 characters!" },
                      ]}
                      className="mb-0"
                    >
                      <Input.Password className="account-security-input" placeholder="Create a new password" autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                      name="confirm_password"
                      label={<span className="block text-sm font-semibold text-[#f5f5f5]">Confirm password</span>}
                      dependencies={["new_password"]}
                      rules={[
                        { required: true, message: "Please enter the confirm password!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("new_password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("Confirm password does not match the new password!"));
                          },
                        }),
                      ]}
                      className="mb-0"
                    >
                      <Input.Password className="account-security-input" placeholder="Confirm your new password" autoComplete="new-password" />
                    </Form.Item>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button
                      htmlType="button"
                      onClick={() => navigate(-1)}
                      className="h-11 rounded-full border border-white/10 !bg-transparent px-6 font-semibold text-white !shadow-none hover:border-[#D4AF37] hover:text-[#f4d787]"
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={loading}
                      icon={<CheckOutlined />}
                      className="account-security-submit h-11 rounded-full border border-[#D4AF37] px-6 font-semibold shadow-[0_0_14px_rgba(212,175,55,0.22)]"
                    >
                      Update password
                    </Button>
                  </div>
                </section>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default PasswordSecurity;
