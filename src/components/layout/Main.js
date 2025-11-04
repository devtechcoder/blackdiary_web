import { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { MenuOutlined } from "@ant-design/icons";
import BottomNav from "./BottomNav";

const { Content } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  return (
    <Layout className="layout-dashboard h-screen overflow-hidden bg-[#181818]">
      <Header showDrawer={showDrawer} isMobile={isMobile} />

      <Layout>
        {isMobile ? <BottomNav /> : <Sidenav />}

        <Layout className="h-[calc(100vh-64px)] overflow-hidden flex flex-col flex-1">
          <Content className="overflow-y-auto p-4 text-white bg-[#181818] flex-grow">
            {children}
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Main;
