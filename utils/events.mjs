import { EventEmitter } from "events";
export const appEvents = new EventEmitter();

appEvents.on("userAdded", (user) => {
  console.log("Event: New user added", user);
});
