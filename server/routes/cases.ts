import { RequestHandler } from "express";
import { db } from "../db";

// GET /api/cases - Get all cases
export const getCases: RequestHandler = (_req, res) => {
  try {
    const cases = db.getAllCases();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cases" });
  }
};

// GET /api/cases/:id - Get case by ID
export const getCaseById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const caseData = db.getCaseById(id);

    if (!caseData) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(caseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch case" });
  }
};

// POST /api/cases - Create new case
export const createCase: RequestHandler = (req, res) => {
  try {
    const {
      studentName,
      studentId,
      birthDate,
      grade,
      school,
      riskCategory,
      riskLevel,
      isUrgent,
      description,
      parentName,
      parentPhone,
      createdBy,
    } = req.body;

    // Basic validation
    if (!studentName || !studentId || !grade || !school || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCase = db.createCase({
      studentName,
      studentId,
      birthDate,
      grade,
      school,
      riskCategory,
      riskLevel: riskLevel || "Medium",
      isUrgent: isUrgent || false,
      description,
      parentName,
      parentPhone,
      status: "open",
      createdDate: new Date().toLocaleDateString(),
      createdBy: createdBy || "School Teacher",
    });

    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to create case" });
  }
};

// PATCH /api/cases/:id - Update case
export const updateCase: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status, riskLevel, isUrgent, notes } = req.body;

    let updatedCase = db.getCaseById(id);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    // Handle status change
    if (status && status !== updatedCase.status) {
      updatedCase = db.changeStatus(id, status);
    }

    // Handle risk level change
    if (riskLevel && riskLevel !== updatedCase?.riskLevel) {
      updatedCase = db.updateRiskLevel(id, riskLevel);
    }

    // Handle urgent flag
    if (isUrgent !== undefined && isUrgent !== updatedCase?.isUrgent) {
      updatedCase = db.toggleUrgent(id);
    }

    // Handle notes
    if (notes) {
      updatedCase = db.addNote(id, notes);
    }

    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to update case" });
  }
};

// PATCH /api/cases/:id/status - Change status
export const changeStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const updatedCase = db.changeStatus(id, status);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to change status" });
  }
};

// PATCH /api/cases/:id/risk - Update risk level
export const updateRisk: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { riskLevel } = req.body;

    if (!riskLevel) {
      return res.status(400).json({ error: "Risk level is required" });
    }

    const updatedCase = db.updateRiskLevel(id, riskLevel);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to update risk level" });
  }
};

// PATCH /api/cases/:id/urgent - Toggle urgent flag
export const toggleUrgent: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const updatedCase = db.toggleUrgent(id);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle urgent flag" });
  }
};

// POST /api/cases/:id/notes - Add note
export const addNote: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Note content is required" });
    }

    const updatedCase = db.addNote(id, content);
    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ error: "Failed to add note" });
  }
};
