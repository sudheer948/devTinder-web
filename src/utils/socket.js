import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/" + { path: "/api/socket.io" }); // when you look into the network tab (this is in localhost), socket connection automatically happens in http://localhost:7777/socket.io
  }
};
