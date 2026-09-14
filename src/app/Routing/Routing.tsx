import { routes } from "@/shared/constants/routes";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PageLoader from "@/shared/ui/PageLoader";
import ProtectedLayout from "../layouts/ProtectedLayout";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomPage = lazy(() => import("@/pages/RoomPage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));
const CreateRoomPage = lazy(() => import("@/pages/CreateRoomPage"));

const Routing = () => {
  return (
    <Suspense fallback={<PageLoader fullscreen />}>
      <Routes>
        <Route path={routes.welcome} element={<WelcomePage />} />

        <Route element={<ProtectedLayout />}>
          <Route element={<MainLayout />}>
            <Route path={routes.room} element={<RoomPage />} /> 
            <Route path={routes.rooms} element={<RoomsPage />} />
            <Route path={routes.createRoom} element={<CreateRoomPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
