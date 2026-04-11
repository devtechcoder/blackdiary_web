"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Button, Form, Input, Modal, Select, Switch, Typography } from "antd";
import { ArrowLeftOutlined, CameraOutlined, CheckOutlined, CloseOutlined, LinkOutlined, UserOutlined } from "@ant-design/icons";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { defaultUserImage, resolveAssetUrl } from "../../helper/functions";
import useRequest from "../../hooks/useRequest";
import { Severty, ShowToast } from "../../helper/toast";
import apiPath from "../../constants/apiPath";
import lang from "../../helper/langHelper";
import { GenderOption } from "../../constants/Constants";
import AccountSideNav from "./AccountSideNav";
import ProfileImageUpload from "../../modals/ProfileImageUpload";

const { Text } = Typography;

const fieldLabelClass = "mb-2 block text-sm font-semibold text-[#f5f5f5]";
const sectionCardClass =
  "rounded-[28px] border border-[rgba(212,175,55,0.22)] bg-[#111111] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6";
const fieldInputClass =
  "!h-12 !rounded-2xl !border-[#2f2f2f] !bg-[#111111] !text-white placeholder:!text-[#8f8f8f] focus:!border-[#D4AF37] focus:!shadow-[0_0_0_3px_rgba(212,175,55,0.12)]";
const textAreaClass =
  "!min-h-[170px] !rounded-3xl !border-[#2f2f2f] !bg-[#111111] !text-white placeholder:!text-[#8f8f8f] focus:!border-[#D4AF37] focus:!shadow-[0_0_0_3px_rgba(212,175,55,0.12)]";
const selectClass =
  "edit-profile-select w-full !min-h-12";
const modalCloseIcon = <CloseOutlined className="text-lg text-[#f4d787] transition-colors duration-300 hover:text-[#ffd86d]" />;

export default function EditProfile() {
  const { userProfile, refreshUser } = useAuthContext();
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const profileImage = useMemo(() => resolveAssetUrl(userProfile?.image, apiPath.assetURL), [userProfile?.image]);
  const genderOptions = useMemo(
    () =>
      GenderOption.map((item) => ({
        value: item._id,
        label: item.name,
      })),
    [],
  );

  const onFinish = (values) => {
    setLoading(true);

    request({
      url: `${apiPath.editProfile}`,
      method: "PUT",
      data: values,
      onSuccess: ({ status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          refreshUser();
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

  useEffect(() => {
    if (!userProfile) return;

    form.setFieldsValue({
      website_link: userProfile?.website_link ?? "",
      bio: userProfile?.bio ?? "",
      gender: userProfile?.gender ?? undefined,
      is_suggestion_verify: !!userProfile?.is_suggestion_verify,
    });
  }, [form, userProfile]);

  return (
    <Main>
      <div className="edit-profile-page min-h-[calc(100vh-2rem)] bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.08),transparent_28%),linear-gradient(180deg,#090909_0%,#0d0d0d_100%)] px-2 py-3 text-white md:px-0 md:py-4">
        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <div className="order-2 xl:order-1">
            <AccountSideNav />
          </div>

          <div className="order-1 min-w-0 space-y-6 xl:order-2">
            <header className="rounded-[32px] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(180deg,#151515_0%,#0d0d0d_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#e7d69c] transition hover:text-[#ffd86d]"
              >
                <ArrowLeftOutlined />
                Back
              </button>

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6B422] via-[#f5d77f] to-[#8a6810] opacity-90 blur-[2px]" />
                    <Avatar
                      size={92}
                      className="relative border-2 border-[#0f0f0f] bg-[#080808] text-2xl font-bold text-white shadow-[0_0_0_1px_rgba(212,175,55,0.18)]"
                      src={profileImage || undefined}
                    >
                      {defaultUserImage(userProfile?.user_name)}
                    </Avatar>
                  </div>

                  <div>
                    <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4d787]">
                      Profile settings
                    </span>
                    <h1 className="poetic-heading text-3xl font-semibold text-white md:text-[2.15rem]">Edit profile</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b9b9b9] md:text-base">
                      Tune your public identity, bio, and suggestion preferences so your profile feels polished on both mobile and desktop.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Button
                    type="primary"
                    icon={<CameraOutlined />}
                    onClick={() => setShow(true)}
                    className="h-12 rounded-full border border-[#D4AF37] px-5 font-semibold shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                  >
                    Change photo
                  </Button>
                </div>
              </div>
            </header>

            <Form id="edit-profile-form" form={form} onFinish={onFinish} layout="vertical" className="edit-profile-form space-y-6">
              <section className={sectionCardClass}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Public profile</h2>
                    <p className="mt-1 text-sm leading-6 text-[#a8a8a8]">These details shape how people see your Black Diary presence.</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] text-[#f4d787]">
                    <UserOutlined />
                  </div>
                </div>

                <div className="space-y-4">
                  <Form.Item
                    name="website_link"
                    label={<span className={fieldLabelClass}>Website link</span>}
                    rules={[{ max: 1000, message: lang("Value must not be more than 1000 characters!") }]}
                    className="mb-0"
                  >
                    <Input
                      prefix={<LinkOutlined className="text-[#9c9c9c]" />}
                      placeholder="https://your-website.com"
                      className={fieldInputClass}
                    />
                  </Form.Item>

                  <Form.Item
                    name="bio"
                    label={<span className={fieldLabelClass}>Bio</span>}
                    rules={[{ max: 1000, message: lang("Value must not be more than 1000 characters!") }]}
                    className="mb-0"
                  >
                    <Input.TextArea placeholder="Tell people a little about yourself..." autoSize={{ minRows: 6, maxRows: 8 }} className={textAreaClass} />
                  </Form.Item>

                  <Form.Item name="gender" label={<span className={fieldLabelClass}>Gender</span>} className="mb-0">
                    <Select
                      placeholder="Select gender"
                      options={genderOptions}
                      className={selectClass}
                      popupClassName="edit-profile-select-dropdown"
                      getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    />
                  </Form.Item>
                </div>
              </section>

              <section className={sectionCardClass}>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Profile suggestions</h2>
                    <p className="mt-1 text-sm leading-6 text-[#a8a8a8]">
                      Choose whether similar accounts can be shown on your profile and whether your account can be suggested elsewhere.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#0f0f0f] p-4 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <Text className="block text-base font-semibold text-white">Show account suggestions on profiles</Text>
                    <p className="mt-1 text-sm leading-6 text-[#a6a6a6]">
                      When this is on, your account may appear in related profile recommendations across Black Diary.
                    </p>
                  </div>

                  <Form.Item name="is_suggestion_verify" valuePropName="checked" className="mb-0">
                    <Switch />
                  </Form.Item>
                </div>
              </section>

              <section className="rounded-[28px] border border-[rgba(212,175,55,0.22)] bg-[#101010] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Before you save</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-[#a8a8a8]">
                      Name, bio, and links can be visible to everyone depending on your profile settings.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      type="default"
                      onClick={() => navigate(-1)}
                      className="h-12 rounded-full border border-white/10 !bg-transparent px-6 font-semibold text-white !shadow-none hover:border-[#D4AF37] hover:text-[#f4d787]"
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={loading}
                      icon={<CheckOutlined />}
                      className="h-12 rounded-full border border-[#D4AF37] px-7 font-semibold shadow-[0_0_14px_rgba(212,175,55,0.22)]"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </section>
            </Form>
          </div>
        </div>
      </div>

      {show && <AddProfileImage show={show} hide={() => setShow(false)} />}
    </Main>
  );
}

const AddProfileImage = ({ show, hide }) => {
  const { userProfile, refreshUser } = useAuthContext();
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const FileType = ["image/png", "image/jpg", "image/jpeg", "image/avif", "image/webp", "image/gif"];

  const previewImage = useMemo(() => resolveAssetUrl(image || userProfile?.image, apiPath.assetURL), [image, userProfile?.image]);

  const handleImage = (data) => {
    const nextImage = data || null;
    setImage(nextImage);
    form.setFieldsValue({ image: nextImage });
  };

  useEffect(() => {
    if (!userProfile) return;
    setImage(userProfile.image || null);
  }, [userProfile]);

  const onFinish = (values = {}) => {
    setLoading(true);
    const payload = {
      image: values?.image || image || userProfile?.image || null,
      action: "profile",
    };

    request({
      url: `${apiPath.editByAction}`,
      method: "PUT",
      data: payload,
      onSuccess: ({ status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          hide();
          refreshUser();
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
    <Modal
      open={show}
      width={720}
      onCancel={hide}
      closable
      closeIcon={modalCloseIcon}
      footer={[
        <Button
          key="back"
          onClick={hide}
          className="edit-profile-modal-footer-btn h-11 rounded-full border border-white/10 !bg-transparent px-6 font-semibold text-white !shadow-none hover:border-[#D4AF37] hover:text-[#f4d787]"
        >
          {lang("Back")}
        </Button>,
        <Button
          key="done"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
          className="edit-profile-modal-primary-btn h-11 rounded-full border border-[#D4AF37] px-6 font-semibold shadow-[0_0_14px_rgba(212,175,55,0.22)]"
        >
          {lang("Done")}
        </Button>,
      ]}
      centered
      className="custom-modal edit-profile-modal dark-scroll rounded-3xl overflow-hidden"
      bodyStyle={{ backgroundColor: "#111111", padding: 0 }}
    >
      <div className="border-b border-white/10 px-6 py-5">
        <Text className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a58f53]">Profile picture</Text>
        <h3 className="mt-2 text-2xl font-semibold text-white">Update your photo</h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#a8a8a8]">Crop a clean square image so your profile looks sharp everywhere on Black Diary.</p>
      </div>

      <Form id="profile-image" form={form} onFinish={onFinish} layout="vertical" initialValues={{ is_active: true }} className="px-6 py-6">
        <Form.Item name="image" hidden>
          <Input type="hidden" />
        </Form.Item>
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6B422] via-[#f5d77f] to-[#8a6810] opacity-80 blur-[2px]" />
            <Avatar size={108} className="relative border-2 border-[#0f0f0f] bg-[#080808] text-3xl font-bold text-white">
              {previewImage ? <img src={previewImage} alt="Profile preview" className="h-full w-full rounded-full object-cover" /> : defaultUserImage(userProfile?.user_name)}
            </Avatar>
          </div>

          <div className="w-full rounded-[24px] border border-white/10 bg-[#0f0f0f] p-4">
            <div className="flex justify-center">
              <ProfileImageUpload
                value={image}
                fileType={FileType}
                btnName="Upload new photo"
                imageType="profile"
                onChange={handleImage}
                isDimension
                buttonClassName="mx-auto"
              />
            </div>
            <p className="mt-3 text-center text-xs leading-6 text-[#a8a8a8]">Recommended size: 600 x 600 px. Use a square image under 2 MB for the best result.</p>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
