import { Router } from "express";
import { users, addUser, findUser } from "../utils/logger.mjs";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  debugger;
  await new Promise((r) => setTimeout(r, 200)); // simulate async
  res.json(users);
});

// GET one user
router.get("/:id", async (req, res) => {
  const user = findUser(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST add user
router.post("/", async (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ error: "Missing fields" });

  const newUser = addUser(name, age);
  res.status(201).json(newUser);
});

export default router;
