import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Mueve el scroll al tope en cada cambio de ruta
  }, [pathname]);

  return null;
};

export default ScrollToTop;
