"use client";

import { Typography, Modal, Avatar, List, Button, Form } from "antd";
import { RightOutlined, ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";

import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";
import { resolveAssetUrl } from "../../../helper/functions";
import { Severty, ShowToast } from "../../../helper/toast";
import { FullNameInputBox, UserNameInputBox } from "../../../components/InputField";
import Prouser from "../../../assets/images/user.png";

const { Title, Text } = Typography;

const ManageAccount = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthContext();
  const [editType, setEditType] = useState();
  const [show, setShow] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  return (
    <Main>
      <div className="grid min-h-screen bg-black text-white xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="border-b border-white/10 p-3 sm:p-4 xl:border-b-0 xl:border-r xl:border-white/10 xl:bg-black/70">
          <AccountSideNav />
        </div>
        <div className="min-w-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.06),transparent_30%),linear-gradient(180deg,#171313_0%,#120f0f_100%)] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
            <header className="rounded-[30px] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(180deg,#151515_0%,#0d0d0d_100%)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] md:p-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#e7d69c] transition hover:text-[#ffd86d]"
              >
                <ArrowLeftOutlined />
                Back
              </button>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.24)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4d787]">
                    Account settings
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(212,175,55,0.22)] bg-[rgba(212,175,55,0.08)] text-[#f4d787]">
                      <UserCirclePreview user={userProfile} />
                    </div>
                    <div>
                      <Title level={4} className="!mb-0 text-white md:!text-2xl">
                        Profiles
                      </Title>
                      <Text className="text-[#a8a8a8]">Manage your profile info and account settings for Black Diary.</Text>
                    </div>
                  </div>
                  <Text className="mt-3 block max-w-2xl text-sm leading-7 text-[#b9b9b9]">
                    Keep your public identity organized and open the settings that control how people see and connect with your account.
                    <a href="#" className="ml-1 font-medium text-[#f4d787] no-underline">
                      Learn more
                    </a>
                  </Text>
                </div>
              </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)]">
              <section className="overflow-hidden rounded-[30px] border border-[rgba(212,175,55,0.18)] bg-[#121212] shadow-[0_18px_40px_rgba(0,0,0,0.24)]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/5 sm:px-6"
                  onClick={() => setShow(true)}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6B422] via-[#f5d77f] to-[#8a6810] opacity-75 blur-[2px]" />
                      <Avatar
                        size={56}
                        src={userProfile?.image ? resolveAssetUrl(userProfile.image, apiPath.assetURL) : Prouser}
                        className="relative border-2 border-[#0f0f0f] bg-[#080808]"
                      />
                    </div>
                    <div className="min-w-0">
                      <Text className="block truncate text-base font-semibold text-white">{userProfile?.user_name ?? ""}</Text>
                      <Text className="block truncate text-sm text-[#B3B3B3]">{userProfile?.name ?? ""}</Text>
                    </div>
                  </div>
                  <RightOutlined className="shrink-0 text-[#B3B3B3]" />
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <ProfileView
          show={show}
          hide={() => setShow(false)}
          setEditType={(value) => {
            setEditType(value);
            setShow(false);
            setIsEditVisible(true);
          }}
        />
      )}
      {isEditVisible && (
        <EditModal
          show={isEditVisible}
          hide={() => {
            setIsEditVisible(false);
            setShow(true);
          }}
          editType={editType}
        />
      )}
    </Main>
  );
};

const UserCirclePreview = ({ user }) => {
  const initial = user?.name?.trim()?.charAt(0) || user?.user_name?.trim()?.charAt(0) || "A";

  return <span className="text-sm font-semibold">{initial.toUpperCase()}</span>;
};

const modalCloseIcon = <CloseOutlined className="text-lg text-[#f4d787] transition-colors duration-300 hover:text-[#ffd86d]" />;

const ProfileView = ({ show, hide, setEditType }) => {
  const { userProfile } = useAuthContext();
  const navigate = useNavigate();
  const data = [
    {
      title: "Name",
      description: "Change how your name appears on Black Diary.",
      _id: "name",
    },
    {
      title: "Username",
      description: "Update your public handle and profile link.",
      _id: "username",
    },
    {
      title: "Profile picture",
      description: "Replace the image people see across your profile.",
      isActive: true,
      _id: "profile",
    },
  ];

  return (
    <Modal
      open={show}
      onCancel={hide}
      footer={null}
      closable
      closeIcon={modalCloseIcon}
      centered
      width="min(92vw, 620px)"
      bodyStyle={{ padding: 0, backgroundColor: "#121212" }}
      className="custom-modal account-profile-modal dark-scroll overflow-hidden"
    >
      <div className="border-b border-white/10 bg-[linear-gradient(180deg,#171717_0%,#111111_100%)] px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E6B422] via-[#f5d77f] to-[#8a6810] opacity-80 blur-[2px]" />
              <Avatar
                size={76}
                src={userProfile?.image ? resolveAssetUrl(userProfile.image, apiPath.assetURL) : Prouser}
                className="relative border-2 border-[#0f0f0f] bg-[#080808]"
              />
            </div>
            <div className="min-w-0">
              <Text className="block truncate text-lg font-semibold text-white sm:text-xl">{userProfile?.name}</Text>
              <Text className="block truncate text-sm text-[#B3B3B3]">{userProfile?.user_name}</Text>
            </div>
          </div>

          <div className="hidden rounded-full border border-[rgba(212,175,55,0.18)] bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f4d787] sm:block">
            Account
          </div>
        </div>
      </div>

      <div className="bg-[#121212] px-4 py-4 text-white sm:px-6 sm:py-5">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="!p-0 !border-b-0" style={{ marginBottom: 12 }}>
              <button
                type="button"
                onClick={() => (item?._id === "profile" ? navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`) : setEditType(item?._id))}
                className={[
                  "group flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300",
                  item.isActive
                    ? "border-[rgba(212,175,55,0.34)] bg-[rgba(212,175,55,0.08)] shadow-[0_0_0_1px_rgba(212,175,55,0.08)]"
                    : "border-white/10 bg-[#171717] hover:border-[rgba(212,175,55,0.24)] hover:bg-[#1b1b1b]",
                ].join(" ")}
              >
                <div className="min-w-0">
                  <Text className="block text-base font-semibold text-white">{item.title}</Text>
                  <Text className="mt-1 block text-sm leading-6 text-[#a6a6a6]">{item.description}</Text>
                </div>
                <RightOutlined className="shrink-0 text-[#8c8c8c] transition-colors duration-300 group-hover:text-[#f4d787]" />
              </button>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

const EditModal = ({ show, hide, editType }) => {
  const [form] = Form.useForm();
  const { userProfile, refreshUser } = useAuthContext();

  const { request } = useRequest();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      ...values,
      action: editType,
    };

    request({
      url: `${apiPath.editByAction}`,
      method: "PUT",
      data: payload,
      onSuccess: ({ data, status, message }) => {
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

  useEffect(() => {
    if (!userProfile) return;
    form.setFieldsValue({ ...userProfile });
  }, [userProfile]);

  const handleHeading = (type) => {
    switch (type) {
      case "username":
        return "User Name";

      case "name":
        return "Name";

      default:
        return "Unknown Type";
    }
  };

  return (
    <Modal
      open={show}
      onCancel={hide}
      footer={null}
      closable
      closeIcon={modalCloseIcon}
      centered
      width="min(94vw, 480px)"
      bodyStyle={{ padding: 0, backgroundColor: "#121212" }}
      className="custom-modal account-profile-modal account-edit-modal dark-scroll overflow-hidden"
    >
      <div className="bg-[linear-gradient(180deg,#171717_0%,#111111_100%)] px-4 py-4 pr-12 text-left sm:px-6 sm:py-5 sm:pr-14">
        <Text className="block text-lg font-semibold text-white sm:text-xl">{handleHeading(editType)}</Text>
        <p className="mt-1 max-w-md text-sm leading-6 text-[#a8a8a8]">Make a quick update and keep your profile details polished.</p>
      </div>

      <div className="bg-[#121212] px-4 py-4 text-white sm:px-6 sm:py-5">
        <Form id="create" form={form} onFinish={onFinish} layout="vertical" className="space-y-5">
          <div className="space-y-3 rounded-[22px] border border-white/10 bg-[#101010] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a58f53]">{handleHeading(editType)}</p>
            {editType === "name" && (
              <FullNameInputBox
                cover={{ md: 24, xl: 24, span: 24 }}
                name="name"
                placeholder={"Full Name"}
                rules={true}
                inputProps={{
                  className: "account-edit-input",
                  autoComplete: "name",
                }}
              />
            )}
            {editType === "username" && (
              <UserNameInputBox
                cover={{ md: 24, xl: 24, span: 24 }}
                name="user_name"
                placeholder={"User Name"}
                rules={true}
                inputProps={{
                  className: "account-edit-input",
                  autoComplete: "username",
                }}
              />
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:flex sm:justify-end">
            <Button
              htmlType="button"
              onClick={hide}
              className="h-11 rounded-full border border-white/10 !bg-transparent px-6 font-semibold text-white !shadow-none hover:border-[#D4AF37] hover:text-[#f4d787]"
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="account-edit-submit h-11 rounded-full border border-[#D4AF37] bg-[#D4AF37] px-6 font-semibold text-black hover:opacity-95">
              Done
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ManageAccount;
