import { routes } from "@/shared/constants/routes";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import PageSuspense from "./PageSuspense";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomPage = lazy(() => import("@/pages/RoomPage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));
const CreateRoomPage = lazy(() => import("@/pages/CreateRoomPage"));

const Routing = () => {
  return (
    <Routes>
      <Route
        path={routes.welcome}
        element={
          <PageSuspense>
            <WelcomePage />
          </PageSuspense>
        }
      />

      <Route element={<ProtectedLayout />}>
        <Route element={<MainLayout />}>
          <Route
            path={routes.room}
            element={
              <PageSuspense>
                <RoomPage />
              </PageSuspense>
            }
          />
          <Route
            path={routes.rooms}
            element={
              <PageSuspense>
                <RoomsPage />
              </PageSuspense>
            }
          />
          <Route
            path={routes.createRoom}
            element={
              <PageSuspense>
                <CreateRoomPage />
              </PageSuspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
