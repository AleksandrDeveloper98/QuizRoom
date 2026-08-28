import { routes } from "@/shared/constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));

const Routing = () => {
  return (
    <Suspense>
      <Routes>
        <Route path={routes.welcome} element={<WelcomePage />} />
        <Route path={routes.rooms} element={<RoomsPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
