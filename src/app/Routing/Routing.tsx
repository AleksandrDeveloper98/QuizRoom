import { routes } from "@/shared/constants/routes";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PageSuspense from "./PageSuspense";
import SessionGuard from "../layouts/SessionGuard";
import ButtonLogout from "@/features/guest-session/ui/ButtonLogout";
import Button from "@/shared/ui/Button";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomPage = lazy(() => import("@/pages/RoomPage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));
const CreateRoomPage = lazy(() => import("@/pages/CreateRoomPage"));
const InviteRoomPage = lazy(() => import("@/pages/InviteRoomPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const Routing = () => {
  return (
    <Routes>
      // для неавторизованных гостей
      <Route element={<SessionGuard access="anonymous" />}>
        <Route
          path={routes.welcome}
          element={
            <PageSuspense>
              <WelcomePage />
            </PageSuspense>
          }
        />
      </Route>
      // для авторизованных гостей
      <Route element={<SessionGuard access="authenticated" />}>
        <Route
          path={routes.invite}
          element={
            <PageSuspense>
              <InviteRoomPage />
            </PageSuspense>
          }
        />
        // логика такова, что для каждой страницы нужна своя кнопка в footer
        <Route
          path={routes.rooms}
          element={<MainLayout footer={<ButtonLogout />} />}
        >
          <Route
            index
            element={
              <PageSuspense>
                <RoomsPage />
              </PageSuspense>
            }
          />
        </Route>

        <Route
          path={routes.createRoom}
          element={
            <MainLayout
              footer={<Button to={routes.rooms}>Назад к комнатам</Button>}
            />
          }
        >
          <Route
            index
            element={
              <PageSuspense>
                <CreateRoomPage />
              </PageSuspense>
            }
          />
        </Route>

        <Route
          path={routes.room}
          element={
            <MainLayout
              footer={<Button to={routes.rooms}>Назад к комнатам</Button>}
            />
          }
        >
          <Route
            index
            element={
              <PageSuspense>
                <RoomPage />
              </PageSuspense>
            }
          />
        </Route>
      </Route>
      <Route
        path={routes.notFound}
        element={
          <PageSuspense>
            <NotFoundPage />
          </PageSuspense>
        }
      />
    </Routes>
  );
};

export default Routing;
