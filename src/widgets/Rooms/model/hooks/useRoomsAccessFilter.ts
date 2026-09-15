import type { TRoomAccess } from "@/entities/room/model/types";
import { useSearchParams } from "react-router-dom";
import type { TRoomAccessFilter } from "../types";

export const useRoomsAccessFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const accessParam = searchParams.get("access");

  const access: TRoomAccess | undefined =
    accessParam === "public" || accessParam === "private"
      ? accessParam
      : undefined;

  const accessFilter: TRoomAccessFilter = access ?? "all";

  const handleAccessChange = (value: TRoomAccessFilter) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (value === "all") {
        nextParams.delete("access");
      } else {
        nextParams.set("access", value);
      }

      nextParams.set("page", "1");

      return nextParams;
    });
  };

  return {
    access,
    accessFilter,
    handleAccessChange
  };
};
