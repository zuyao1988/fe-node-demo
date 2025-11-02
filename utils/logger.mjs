import fs from "fs";
import path from "path";
import crypto from "crypto";
import { __dirname } from "./dirname.mjs";
import { appEvents } from "./events.mjs";

// Sample users
export let users = [
  { id: 1, name: "John Doe", age: 35 },
  { id: 2, name: "Jane Doe", age: 24 },
  { id: 3, name: "Jim Doe", age: 21 },
];

// Find user by id
export function findUser(id) {
  return users.find((u) => u.id === parseInt(id));
}

// Add user
export function addUser(name, age) {
  const id = crypto.randomInt(1000, 9999);
  const newUser = { id, name, age };
  users.push(newUser);

  // Log to file
  fs.appendFileSync(
    path.join(__dirname, "users.log"),
    `Added: ${JSON.stringify(newUser)}\n`
  );

  // Fire event
  appEvents.emit("userAdded", newUser);

  return newUser;
}
