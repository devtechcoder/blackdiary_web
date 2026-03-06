import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { MenuOutlined } from "@ant-design/icons";
import BottomNav from "./BottomNav";
import { useAuthContext } from "../../context/AuthContext";

const { Content } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { isMobile } = useAuthContext();

  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        // Scrolling down
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const showDrawer = () => setVisible(true);

  return (
    <Layout className={`layout-dashboard bg-[#0d0d0d] ${isMobile ? "min-h-screen" : "h-screen overflow-hidden"}`}>
      {isMobile ? (
        <>
          <Header showDrawer={showDrawer} isMobile={isMobile} isVisible={headerVisible} />
          <Content className="p-4 pb-20 text-white bg-[#0d0d0d] flex-grow">
            <div className="bd-container">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, { isHeaderVisible: headerVisible });
                }
                return child;
              })}
              <Footer />
            </div>
          </Content>
          <BottomNav />
        </>
      ) : (
        <Layout className="h-full">
          <Sidenav />
          <Layout className="flex flex-col">
            <Content className="overflow-y-auto text-white bg-[#0d0d0d]">
              <div className="p-4 bd-container">{children}</div>
              <div className="p-4 pt-0 bd-container">
                <Footer />
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default Main;
