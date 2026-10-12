export type TClientToServerEvents = {
  "rooms:subscribe": () => void;
  "rooms:unsubscribe": () => void;
};

export type TServerToClientEvents = {
  "rooms:updated": () => void;
};
