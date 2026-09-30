import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    let alive = true;
    const reset = () => {
      if (alive) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    reset();
    requestAnimationFrame(() => requestAnimationFrame(reset));
    const timer = setTimeout(reset, 250);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
