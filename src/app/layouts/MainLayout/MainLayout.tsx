import { Outlet } from "react-router-dom";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";

import "./MainLayout.scss";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="main-layout__inner">
        <Header />
        <main className="main-layout__main container">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
