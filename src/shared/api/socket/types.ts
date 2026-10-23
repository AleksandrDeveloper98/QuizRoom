export type TRoomIdPayload = {
  roomId: string;
};

export type TGameStartedPayload = {
  gameId: string;
} & TRoomIdPayload;

export type TClientToServerEvents = {
  "rooms:subscribe": () => void;
  "rooms:unsubscribe": () => void;

  "room:subscribe": (payload: TRoomIdPayload) => void;
  "room:unsubscribe": (payload: TRoomIdPayload) => void;
};

export type TServerToClientEvents = {
  "rooms:updated": () => void;

  "room:updated": (payload: TRoomIdPayload) => void;

  "game:started": (payload: TGameStartedPayload) => void;
};
