import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useScrollToTop } from "../hooks/useScrollToTop";

export default function Layout() {
  useSmoothScroll();
  useScrollToTop();

  return (
    <div className="bg-paper text-ink">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
