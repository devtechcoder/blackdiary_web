import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import { useAuthContext } from "../../context/AuthContext";

const { Content } = Layout;

function Main({ children }) {
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

  return (
    <Layout className="layout-dashboard min-h-screen bg-[#0d0d0d]">
      {isMobile ? (
        <>
          <Header isMobile={isMobile} isVisible={headerVisible} />
          <Content className="p-4 pb-20 text-white bg-[#0d0d0d] flex flex-col min-h-[calc(100vh-80px)]">
            <div className="bd-container flex flex-col flex-1">
              <div className="flex-1">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, { isHeaderVisible: headerVisible });
                  }
                  return child;
                })}
              </div>
              <Footer />
            </div>
          </Content>
          <BottomNav />
        </>
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidenav />
          <main className="flex-1 min-w-0 bg-[#0d0d0d] flex flex-col">
            <div className="flex-1 overflow-y-auto text-white bg-[#0d0d0d]">
              <div className="p-4">
                <div className="bd-container w-full mx-auto min-h-full">{children}</div>
              </div>
            </div>
            <div className="p-4 pt-0 bg-[#0d0d0d]">
              <div className="bd-container w-full mx-auto">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      )}
    </Layout>
  );
}

export default Main;
