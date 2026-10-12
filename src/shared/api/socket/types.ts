type TRoomIdPayload = {
  roomId: string;
};

export type TClientToServerEvents = {
  "rooms:subscribe": () => void;
  "rooms:unsubscribe": () => void;

  "room:subscribe": (payload: TRoomIdPayload) => void;
  "room:unsubscribe": (payload: TRoomIdPayload) => void;
};

export type TServerToClientEvents = {
  "rooms:updated": () => void;

  "room:updated": (payload: TRoomIdPayload) => void;
};
