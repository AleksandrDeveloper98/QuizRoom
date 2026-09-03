import { routes } from "@/shared/constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useCurrentGuestPlayer } from "@/entities/guestPlayer/api/guestPlayerQueries";
import PageLoader from "@/shared/ui/PageLoader";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));

const Routing = () => {
  useCurrentGuestPlayer();

  return (
    <Suspense fallback={<PageLoader fullscreen/>}>
      <Routes>
        <Route path={routes.welcome} element={<WelcomePage />} />

        <Route element={<MainLayout />}>
          <Route path={routes.rooms} element={<RoomsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
