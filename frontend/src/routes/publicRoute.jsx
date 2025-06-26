import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Herosection";

export default function PublicRoute() {
  const location = useLocation();
  const path = location.pathname; // ✅ Define path
  const isHome = path === "/";
  const hideFooter = path === "/login" || path === "/signup";

  return (
    <>
      {isHome ? (
        <div className="relative h-screen text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: "url('/images/Main-image.jpg')" }}
          ></div>
          <div className="relative z-10">
            <Navbar />
            <HeroSection />
          </div>
        </div>
      ) : (
        <div className="bg-black text-white" >
          <Navbar />
        </div>
      )}

      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
}
