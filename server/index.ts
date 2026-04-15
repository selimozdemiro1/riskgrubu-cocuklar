import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  changeStatus,
  updateRisk,
  toggleUrgent,
  addNote,
} from "./routes/cases";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Case API routes
  app.get("/api/cases", getCases);
  app.get("/api/cases/:id", getCaseById);
  app.post("/api/cases", createCase);
  app.patch("/api/cases/:id", updateCase);
  app.patch("/api/cases/:id/status", changeStatus);
  app.patch("/api/cases/:id/risk", updateRisk);
  app.patch("/api/cases/:id/urgent", toggleUrgent);
  app.post("/api/cases/:id/notes", addNote);

  return app;
}
