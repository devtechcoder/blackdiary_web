import { useNavigate, useSearchParams } from "react-router-dom";
import PostPage from "./post";
import ShayariPage from "./shayari";
import Main from "../../components/layout/Main";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const FeedPage = ({ isHeaderVisible = true }) => {
  const navigate = useNavigate();
  const { isMobile } = useAuthContext();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [headerVisible, setHeaderVisible] = useState(true);

  const getTabClass = (tabType) => {
    const baseClass = "w-1/2 text-center py-2 font-semibold cursor-pointer transition-colors duration-300";
    const activeClass = "text-white border-b-2 border-white";
    const inactiveClass = "text-gray-400";
    return `${baseClass} ${type === tabType ? activeClass : inactiveClass}`;
  };

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
    <>
      <Main>
        {isMobile && headerVisible && (
          <div className={`sticky top-[80px] z-40 flex bg-[#181818] transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className={getTabClass("shayari")} onClick={() => navigate("/feed?type=shayari")}>
              Shayari
            </div>
            <div className={getTabClass("post")} onClick={() => navigate("/feed?type=post")}>
              Posts
            </div>
          </div>
        )}

        {type === "post" ? <PostPage /> : <ShayariPage />}
      </Main>
    </>
  );
};

export default FeedPage;
