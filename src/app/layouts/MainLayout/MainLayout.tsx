import { Outlet } from "react-router-dom";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";

import "./MainLayout.scss";
import type { TMainLayoutProps } from "./types";

const MainLayout = (props: TMainLayoutProps) => {
  const { footer } = props;
  return (
    <div className="main-layout">
      <div className="main-layout__inner">
        <Header />
        <main className="main-layout__main">
          <Outlet />
        </main>
        {footer && <Footer>{footer}</Footer>}
      </div>
    </div>
  );
};

export default MainLayout;
