import { Router } from "express";

const router = Router();

function verifyToken(token) {
  return true;
}
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized User" });
  }

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

router.get("/", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
