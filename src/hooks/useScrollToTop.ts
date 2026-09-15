import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Jumps to the top of the page on every route change (multi-page site, no anchor scrolling). */
export function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
