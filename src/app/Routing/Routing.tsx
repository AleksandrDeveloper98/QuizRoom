import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import LeaveRoomButton from "@/features/leave-room/ui/LeaveRoomButton";
import ButtonLogout from "@/features/guest-session/ui/ButtonLogout";
import { routes } from "@/shared/constants/routes";
import Button from "@/shared/ui/Button";
import MainLayout from "../layouts/MainLayout";
import PageSuspense from "./PageSuspense";
import SessionGuard from "../layouts/SessionGuard";
import SocketConnection from "../layouts/SocketConnection";
import LeaveGameButton from "@/features/leave-game/ui/LeaveGameButton";

const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const RoomPage = lazy(() => import("@/pages/RoomPage"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage"));
const CreateRoomPage = lazy(() => import("@/pages/CreateRoomPage"));
const InviteRoomPage = lazy(() => import("@/pages/InviteRoomPage"));
const GamePage = lazy(() => import("@/pages/GamePage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const Routing = () => {
  return (
    <Routes>
      {/* для неавторизованных гостей */}
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

      {/* для авторизованных гостей */}
      <Route element={<SessionGuard access="authenticated" />}>
        {/* + сокет */}
        <Route element={<SocketConnection />}>
          <Route
            path={routes.invite}
            element={
              <PageSuspense>
                <InviteRoomPage />
              </PageSuspense>
            }
          />

          {/* логика такова, что для каждой страницы нужна своя кнопка в footer */}
          <Route
            path={routes.rooms}
            element={
              <PageSuspense>
                <MainLayout footer={<ButtonLogout />} />
              </PageSuspense>
            }
          >
            <Route index element={<RoomsPage />} />
          </Route>

          <Route
            path={routes.createRoom}
            element={
              <PageSuspense>
                <MainLayout
                  footer={<Button to={routes.rooms}>Назад к комнатам</Button>}
                />
              </PageSuspense>
            }
          >
            <Route index element={<CreateRoomPage />} />
          </Route>

          <Route
            path={routes.room}
            element={
              <PageSuspense>
                <MainLayout footer={<LeaveRoomButton />} />
              </PageSuspense>
            }
          >
            <Route index element={<RoomPage />} />
          </Route>

          <Route
            path={routes.game}
            element={
              <PageSuspense>
                <MainLayout footer={<LeaveGameButton />} />
              </PageSuspense>
            }
          >
            <Route index element={<GamePage />} />
          </Route>
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
