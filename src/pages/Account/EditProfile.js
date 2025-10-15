import React, { useEffect, useState } from "react";
import Main from "../../components/layout/Main";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { Avatar, Button, Col, Form, Image, Modal, Row, Select, Typography } from "antd";
import { defaultUserImage } from "../../helper/functions";
import useRequest from "../../hooks/useRequest";
import { Severty, ShowToast } from "../../helper/toast";
import { CheckboxInput, FullNameInputBox, SelectInput, SingleCheckboxInput, TextInputBox } from "../../components/InputField";
import apiPath from "../../constants/apiPath";
import lang from "../../helper/langHelper";
import { GenderOption } from "../../constants/Constants";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AccountSideNav from "./AccountSideNav";
import ProfileImageUpload from "../../modals/ProfileImageUpload";
const { Title, Text } = Typography;
export default function EditProfile() {
  const { setIsLoggedIn, userProfile, refreshUser } = useAuthContext();
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      ...values,
    };
    request({
      url: `${apiPath.editProfile}`,
      method: "PUT",
      data: payload,
      onSuccess: ({ data, status, message }) => {
        setLoading(false);
        if (status) {
          ShowToast(message, Severty.SUCCESS);
          refreshUser();
          navigate(`/profile`);
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

  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-400 transition">
              <ArrowLeftOutlined className="text-white text-lg hover:scale-110 duration-200" onClick={() => navigate(-1)} />
              <Title level={4} className="!mb-0 text-white">
                Edit profile
              </Title>
            </div>

            {/* Profile Preview Box */}
            <div className="bg-[#121212] p-4 rounded-xl flex items-center space-x-4 border border-gray-700">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold">
                {userProfile?.image ? <Image src={userProfile?.image} /> : <span>{defaultUserImage(userProfile?.user_name)}</span>}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{userProfile?.user_name ?? ""}</p>
                <p className="text-sm text-gray-400">{userProfile?.name ?? ""}</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={() => setShow(true)}>
                Change photo
              </button>
            </div>

            {/* Form */}
            <Form id="create" form={form} onFinish={onFinish} layout="vertical" className="text-white">
              <Col span={24}>
                <TextInputBox max={1000} cover={{ span: 24 }} name="website_link" label="Website" placeholder="Website Link" rules={false} />
              </Col>

              <Col span={24}>
                <TextInputBox type="textArea" max={1000} cover={{ span: 24 }} name="bio" label="Bio" placeholder="Bio" rules={false} />
              </Col>

              <Col span={24}>
                <SelectInput className="custom-ant-input" options={GenderOption} cover={{ span: 24 }} name="gender" label="Gender" placeholder="Select Gender" rules={false} />
              </Col>

              <Col span={24}>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Show account suggestions on profiles</label>
                  <div className="flex items-center justify-between p-4 border border-gray-700 rounded-md bg-[#121212]">
                    <p className="text-sm text-gray-300">Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</p>
                    <SingleCheckboxInput name="is_suggestion_verify" options={{ _id: "is_suggestion_verify" }} rules={false} />
                  </div>
                </div>
              </Col>

              <Col span={12}>
                <Button htmlType="submit" layout="vertical" className="w-full py-2 bg-green-500 text-black font-semibold rounded-full hover:opacity-90 transition">
                  Submit
                </Button>
              </Col>
            </Form>

            <div className="text-xs text-gray-500">
              Certain profile info, like your name, bio and links, is visible to everyone.
              <a href="#" className="text-blue-500">
                {" "}
                See what profile info is visible
              </a>
            </div>
          </div>
        </div>
      </div>
      {show && <AddProfileImage show={show} hide={() => setShow(false)} />}
    </Main>
  );
}

const AddProfileImage = ({ show, hide }) => {
  const { setIsLoggedIn, userProfile, refreshUser } = useAuthContext();
  const [form] = Form.useForm();
  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const FileType = ["image/png", "image/jpg", "image/jpeg", "image/avif", "image/webp", "image/gif"];
  const handleImage = (data) => {
    data ? setImage(data) : setImage();
  };

  useEffect(() => {
    if (!userProfile) return;
    setImage(userProfile.image);
  }, [userProfile]);

  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      ...values,
      image: image,
      action: "profile",
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

  return (
    <Modal
      open={show}
      width={750}
      okText={lang("Done")}
      cancelText={lang("Back")}
      onCancel={hide}
      okButtonProps={{
        form: "profile-image",
        htmlType: "submit",
        loading: loading,
      }}
      centered
      className="custom-modal dark-scroll rounded-3xl overflow-hidden"
      bodyStyle={{ backgroundColor: "#121212", padding: "2rem" }}
    >
      <Form id="profile-image" form={form} onFinish={onFinish} layout="vertical" initialValues={{ is_active: true }}>
        <Title level={4} className="text-white mb-6">
          {lang("Profile picture")}
        </Title>

        <div className="w-20 h-20 mb-6 bg-black rounded-full flex items-center justify-center text-white font-bold mx-auto border-2 border-[#1DB954]">
          {userProfile?.image ? (
            <Image src={userProfile?.image} preview={false} className="rounded-full object-cover" width={80} height={80} />
          ) : (
            <span>{defaultUserImage(userProfile?.user_name)}</span>
          )}
        </div>

        <Row gutter={[16, 0]}>
          <Col span={24}>
            <Form.Item name="image" className="text-white">
              <ProfileImageUpload value={image} fileType={FileType} btnName={"New Photo"} imageType="profile" onChange={(data) => handleImage(data)} isDimension={true} />
            </Form.Item>
          </Col>
        </Row>

        <Text className="text-xs text-[#B3B3B3] block text-center mt-4">Recommended size: 600x600px. Images should be square and under 2MB.</Text>
      </Form>
    </Modal>
  );
};
