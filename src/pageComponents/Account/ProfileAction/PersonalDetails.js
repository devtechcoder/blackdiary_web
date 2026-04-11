"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Button, Card, DatePicker, Divider, Form, Input, Modal, Typography } from "antd";
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import AccountSideNav from "../AccountSideNav";
import Main from "../../../components/layout/Main";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import useRequest from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";
import { Severty, ShowToast } from "../../../helper/toast";

const { Title, Text } = Typography;

const modalCloseIcon = <CloseOutlined className="text-lg text-[#f4d787] transition-colors duration-300 hover:text-[#ffd86d]" />;

const cardClass =
  "rounded-[28px] border border-[rgba(212,175,55,0.22)] bg-[#121212] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6";
const rowClass =
  "group flex w-full items-center justify-between gap-4 rounded-[22px] border border-[rgba(212,175,55,0.18)] bg-[#111111] px-4 py-4 text-left transition-all duration-300 hover:border-[rgba(212,175,55,0.38)] hover:bg-[rgba(212,175,55,0.08)]";
const labelClass = "block text-sm font-semibold text-white";
const valueClass = "block text-sm text-[#a7a7a7]";
const modalInputClass =
  "!h-12 !rounded-2xl !border-[#2f2f2f] !bg-[#111111] !text-white placeholder:!text-[#8f8f8f] focus:!border-[#D4AF37] focus:!shadow-[0_0_0_3px_rgba(212,175,55,0.12)]";
const modalDateClass =
  "!h-12 !w-full !rounded-2xl !border-[#2f2f2f] !bg-[#111111] !text-white hover:!border-[#D4AF37] focus:!border-[#D4AF37]";

const PersonalDetails = () => {
  const { userProfile, refreshUser } = useAuthContext();
  const { request } = useRequest();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const contactValue = useMemo(() => {
    const countryCode = userProfile?.country_code ? String(userProfile.country_code).replace(/[^\d]/g, "") : "";
    const mobileNumber = userProfile?.mobile_number ? String(userProfile.mobile_number).replace(/[^\d]/g, "") : "";

    if (!mobileNumber) return "Add contact info";
    return countryCode ? `+${countryCode}-${mobileNumber}` : `${mobileNumber}`;
  }, [userProfile?.country_code, userProfile?.mobile_number]);

  const birthdayValue = useMemo(() => {
    if (!userProfile?.dob) return "Add birthday";
    const parsedDob = dayjs(userProfile.dob, "YYYY-MM-DD", true);
    return parsedDob.isValid() ? parsedDob.format("DD MMM YYYY") : userProfile.dob;
  }, [userProfile?.dob]);

  const openEditor = (action) => {
    setActiveAction(action);
    setShowModal(true);
  };

  const closeEditor = () => {
    setShowModal(false);
    setActiveAction(null);
    form.resetFields();
  };

  useEffect(() => {
    if (!showModal || !activeAction || !userProfile) return;

    if (activeAction === "contact") {
      form.setFieldsValue({
        country_code: userProfile?.country_code ? String(userProfile.country_code).replace(/[^\d]/g, "") : "",
        mobile_number: userProfile?.mobile_number ? String(userProfile.mobile_number).replace(/[^\d]/g, "") : "",
      });
    }

    if (activeAction === "birthday") {
      form.setFieldsValue({
        dob: userProfile?.dob ? dayjs(userProfile.dob, "YYYY-MM-DD", true) : null,
      });
    }
  }, [activeAction, form, showModal, userProfile]);

  const handleFinish = (values = {}) => {
    const payload =
      activeAction === "contact"
        ? {
            country_code: String(values.country_code || "").replace(/[^\d]/g, ""),
            mobile_number: String(values.mobile_number || "").replace(/[^\d]/g, ""),
          }
        : {
            dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : null,
          };

    setLoading(true);
    request({
      url: apiPath.personalDetails,
      method: "PUT",
      data: payload,
      onSuccess: ({ status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          refreshUser();
          closeEditor();
        } else {
          ShowToast(message, Severty.ERROR);
        }
      },
      onError: (error) => {
        setLoading(false);
        ShowToast(error?.response?.data?.message || "Something went wrong", Severty.ERROR);
      },
    });
  };

  const isContactAction = activeAction === "contact";
  const modalTitle = isContactAction ? "Contact info" : "Birthday";
  const modalDescription = isContactAction
    ? "Update the phone number linked to your Black Diary account."
    : "Add or update your birthday so your account details stay accurate.";

  return (
    <Main>
      <div className="grid min-h-screen bg-black text-white xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:sticky xl:top-0 xl:h-[calc(100vh-2rem)] xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70 xl:overflow-y-auto">
          <AccountSideNav />
        </div>
        <div className="min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
            <Card className={cardClass} style={{ backgroundColor: "#121212", color: "white", border: "1px solid rgba(212,175,55,0.18)" }}>
              <div className="mb-4 flex items-center gap-2 cursor-pointer transition text-[#D4AF37] hover:text-[#ffd86d]">
                <ArrowLeftOutlined className="text-lg text-[#D4AF37] hover:scale-110 duration-200" onClick={() => navigate(-1)} />
                <Title level={4} style={{ color: "#D4AF37" }} className="!mb-0 text-[#D4AF37]">
                  Personal details
                </Title>
              </div>

              <Text className="text-gray-300">
                Black Diary uses this information to verify your identity and to keep our community safe. You decide what personal details you make visible to others.
              </Text>

              <Divider style={{ backgroundColor: "rgba(212,175,55,0.18)" }} />

              <button type="button" onClick={() => openEditor("contact")} className={`${rowClass} cursor-pointer`}>
                <div>
                  <Text className={labelClass}>Contact info</Text>
                  <Text className={valueClass}>{contactValue}</Text>
                </div>
                <RightOutlined className="text-white transition group-hover:text-[#f4d787]" />
              </button>

              <Divider style={{ backgroundColor: "rgba(212,175,55,0.18)" }} />

              <button type="button" onClick={() => openEditor("birthday")} className={`${rowClass} cursor-pointer`}>
                <div>
                  <Text className={labelClass}>Birthday</Text>
                  <Text className={valueClass}>{birthdayValue}</Text>
                </div>
                <RightOutlined className="text-white transition group-hover:text-[#f4d787]" />
              </button>

              <Divider style={{ backgroundColor: "rgba(212,175,55,0.18)" }} />

              <div className={rowClass}>
                <div>
                  <Text className={labelClass}>Account ownership and control</Text>
                  <Text className={valueClass}>Manage your data, modify your legacy contact, deactivate or delete your accounts and profiles.</Text>
                </div>
                <RightOutlined className="text-white" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        open={showModal}
        centered
        width={isContactAction ? 560 : 520}
        onCancel={closeEditor}
        closable
        closeIcon={modalCloseIcon}
        destroyOnClose
        className="custom-modal account-profile-modal personal-details-modal rounded-3xl overflow-hidden"
        bodyStyle={{ backgroundColor: "#111111", padding: 0 }}
        footer={[
          <Button
            key="back"
            onClick={closeEditor}
            className="h-11 rounded-full border border-white/10 !bg-transparent px-6 font-semibold text-white !shadow-none hover:border-[#D4AF37] hover:text-[#f4d787]"
          >
            Cancel
          </Button>,
          <Button
            key="done"
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
            icon={<CheckOutlined />}
            className="h-11 rounded-full border border-[#D4AF37] px-6 font-semibold shadow-[0_0_14px_rgba(212,175,55,0.22)]"
          >
            Save changes
          </Button>,
        ]}
      >
        <div className="border-b border-white/10 px-6 py-5">
          <Text className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a58f53]">{isContactAction ? "Contact details" : "Birthday settings"}</Text>
          <h3 className="mt-2 text-2xl font-semibold text-white">{modalTitle}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#a8a8a8]">{modalDescription}</p>
        </div>

        <Form id="personal-details-form" form={form} onFinish={handleFinish} layout="vertical" className="px-6 py-6">
          {isContactAction ? (
            <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
              <Form.Item
                name="country_code"
                label={<span className="mb-2 block text-sm font-semibold text-[#f5f5f5]">Country code</span>}
                rules={[
                  { required: true, message: "Please enter country code" },
                  { pattern: /^\d{1,4}$/, message: "Country code must contain only 1 to 4 digits" },
                ]}
                className="mb-0"
              >
                <Input prefix="+" placeholder="91" maxLength={4} inputMode="numeric" className={modalInputClass} />
              </Form.Item>

              <Form.Item
                name="mobile_number"
                label={<span className="mb-2 block text-sm font-semibold text-[#f5f5f5]">Phone number</span>}
                rules={[
                  { required: true, message: "Please enter phone number" },
                  { pattern: /^\d{8,12}$/, message: "Phone number must be between 8 and 12 digits" },
                ]}
                className="mb-0"
              >
                <Input placeholder="9876543210" maxLength={12} inputMode="numeric" className={modalInputClass} />
              </Form.Item>
            </div>
          ) : (
            <Form.Item
              name="dob"
              label={<span className="mb-2 block text-sm font-semibold text-[#f5f5f5]">Birthday</span>}
              rules={[{ required: true, message: "Please select birthday" }]}
              className="mb-0"
            >
              <DatePicker
                format="DD MMM YYYY"
                placeholder="Select birthday"
                className={modalDateClass}
                disabledDate={(current) => current && current.valueOf() > Date.now()}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Main>
  );
};

export default PersonalDetails;
