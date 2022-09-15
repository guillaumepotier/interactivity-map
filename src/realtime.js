import { ABLY_API_KEY, ABLY_ROOM } from "./config.js";
import Ably from "ably";

const ably = new Ably.Realtime(ABLY_API_KEY);
export const channel = ably.channels.get(ABLY_ROOM);
