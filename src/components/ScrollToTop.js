import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 20,
      behavior: "auto",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}

export default ScrollToTop;
