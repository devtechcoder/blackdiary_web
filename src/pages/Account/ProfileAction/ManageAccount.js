import { Typography, Modal, Avatar, List, Button, Form, Row, Col } from "antd";
import { RightOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import Main from "../../../components/layout/Main";
import AccountSideNav from "../AccountSideNav";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import apiPath from "../../../constants/apiPath";
import { Severty, ShowToast } from "../../../helper/toast";
import { FullNameInputBox, UserNameInputBox } from "../../../components/InputField";
import { Helmet } from "react-helmet-async";
import { SEO } from "../../../constants/seo";
const { Title, Text } = Typography;

const ManageAccount = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const [editType, setEditType] = useState();
  const [show, setShow] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  return (
    <Main>
      <div className="flex min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-80 p-4 border-r border-gray-800">
          <AccountSideNav />
        </div>
        <div className="min-h-screen bg-[#191414] text-white px-6 py-10">
          <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-400 transition">
            <ArrowLeftOutlined className="text-white text-lg hover:scale-110 duration-200" onClick={() => navigate(-1)} />
            <Title level={4} className="!mb-0 text-white">
              Profiles
            </Title>
          </div>
          <Text className="text-[#B3B3B3]">
            Manage your profile info, and use the same info across Facebook, Instagram and Meta Horizon. Add more profiles by adding your accounts.{" "}
            <a href="#" className="text-[#1DB954] font-medium">
              Learn more
            </a>
          </Text>

          <div className="mt-6 bg-[#121212] border border-[#2a2a2a] rounded-2xl overflow-hidden max-w-xl">
            {/* Profile Row */}
            <div className="flex items-center justify-between px-4 py-4 hover:bg-[#1a1a1a] transition-all" onClick={() => setShow(true)}>
              <div className="flex items-center gap-3">
                <Avatar size="large" src="https://i.ibb.co/TTFj0Wh/blackdp.jpg" />
                <div className="flex flex-col">
                  <Text className="text-white font-medium">blackdiary_00</Text>
                  <Text className="text-[#B3B3B3] text-xs">jyotraditya choudhary</Text>
                </div>
              </div>
              <RightOutlined className="text-[#B3B3B3]" />
            </div>

            {/* Add account row */}
            {/* <div className="border-t border-[#2a2a2a]">
              <Button type="text" icon={<PlusOutlined />} className="text-[#1DB954] font-medium w-full text-left px-4 py-4 hover:bg-[#1a1a1a] hover:text-[#1ed760]">
                Add accounts
              </Button>
            </div> */}
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

const ProfileView = ({ show, hide, setEditType }) => {
  const { setIsLoggedIn, refreshUser, userProfile } = useAuthContext();
  const navigate = useNavigate();
  const data = [
    { title: "Name", _id: "name" },
    { title: "Username", _id: "username" },
    { title: "Profile picture", isActive: true, _id: "profile" },
  ];

  return (
    <Modal
      open={show}
      onCancel={hide}
      footer={null}
      closable
      centered
      width={500}
      bodyStyle={{ padding: 0, backgroundColor: "#121212" }}
      className="custom-modal dark-scroll rounded-3xl overflow-hidden"
    >
      <div className="text-center px-6 py-8 text-white">
        <Avatar size={96} src="https://i.ibb.co/TTFj0Wh/blackdp.jpg" className="mx-auto" />
        <Text className="block mt-4 text-lg font-semibold text-white">{userProfile?.name}</Text>
        <Text className="block text-[#B3B3B3] text-sm">{userProfile?.user_name}</Text>
      </div>

      <div className="bg-[#121212] text-white">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              className={`hover:bg-[#1a1a1a] px-6 ${item.isActive ? "bg-[#1a1a1a]" : ""}`}
              style={{ borderBottom: "1px solid #2a2a2a" }}
              onClick={() => (item?._id === "profile" ? navigate(`/account/edit-profile/${userProfile?.user_name}/${userProfile?._id}`) : setEditType(item?._id))}
            >
              <Text className="text-white font-medium">{item.title}</Text>
              <RightOutlined className="text-[#B3B3B3]" />
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

const EditModal = ({ show, hide, editType }) => {
  const [form] = Form.useForm();
  const { setIsLoggedIn, userProfile, refreshUser } = useAuthContext();

  const { request } = useRequest();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      centered
      width={500}
      bodyStyle={{ padding: 0, backgroundColor: "#121212" }}
      className="custom-modal dark-scroll rounded-3xl overflow-hidden"
    >
      <div className="text-center px-6 py-8 text-white">
        <Text className="block mt-4 text-lg font-semibold text-white">{handleHeading(editType)}</Text>
      </div>

      <div className="bg-[#121212] text-white">
        {" "}
        <Form id="create" form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={[16, 0]}>
            <Col span={24} sm={24}>
              {editType === "name" && <FullNameInputBox cover={{ md: 24, xl: 24, span: 24 }} name="name" placeholder={"Full Name"} rules={true} />}
              {editType === "username" && <UserNameInputBox cover={{ md: 24, xl: 24, span: 24 }} name="user_name" placeholder={"User Name"} rules={true} />}
            </Col>
          </Row>
          <Row>
            <Button htmlType="submit" layout="vertical" className="w-full py-2 bg-green-500 text-black font-semibold rounded-full hover:opacity-90 transition">
              Done
            </Button>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ManageAccount;
