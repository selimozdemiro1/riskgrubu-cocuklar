import { useState, useEffect } from "react";

export interface CaseTimelineEntry {
  id: number;
  type: "created" | "status_change" | "note_added" | "risk_updated";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface CaseData {
  id: string;
  studentName: string;
  studentId: string;
  birthDate: string;
  grade: string;
  school: string;
  riskCategory: string;
  riskLevel: "Low" | "Medium" | "High";
  isUrgent: boolean;
  description: string;
  status: "open" | "in_progress" | "closed";
  createdDate: string;
  lastUpdate: string;
  createdBy: string;
  parentName: string;
  parentPhone: string;
  notes: number;
  timeline: CaseTimelineEntry[];
}

export function useCase(caseId: string | undefined) {
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load case from API
  useEffect(() => {
    if (!caseId) {
      setLoading(false);
      return;
    }

    const fetchCase = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/cases/${caseId}`);

        if (!response.ok) {
          throw new Error("Case not found");
        }

        const data: CaseData = await response.json();
        setCaseData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
        setCaseData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  const changeStatus = async (newStatus: "open" | "in_progress" | "closed") => {
    if (!caseData || caseData.status === newStatus) return;

    try {
      const response = await fetch(`/api/cases/${caseId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to change status");

      const updated: CaseData = await response.json();
      setCaseData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change status");
    }
  };

  const addNote = async (noteContent: string) => {
    if (!caseData) return;

    try {
      const response = await fetch(`/api/cases/${caseId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent }),
      });

      if (!response.ok) throw new Error("Failed to add note");

      const updated: CaseData = await response.json();
      setCaseData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note");
    }
  };

  const updateRiskLevel = async (newLevel: "Low" | "Medium" | "High") => {
    if (!caseData || caseData.riskLevel === newLevel) return;

    try {
      const response = await fetch(`/api/cases/${caseId}/risk`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riskLevel: newLevel }),
      });

      if (!response.ok) throw new Error("Failed to update risk level");

      const updated: CaseData = await response.json();
      setCaseData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update risk level");
    }
  };

  const toggleUrgent = async () => {
    if (!caseData) return;

    try {
      const response = await fetch(`/api/cases/${caseId}/urgent`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to toggle urgent flag");

      const updated: CaseData = await response.json();
      setCaseData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle urgent flag");
    }
  };

  const updateCase = async (updates: Partial<CaseData>) => {
    if (!caseData) return;

    try {
      const response = await fetch(`/api/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update case");

      const updated: CaseData = await response.json();
      setCaseData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update case");
    }
  };

  return {
    caseData,
    loading,
    error,
    changeStatus,
    addNote,
    updateRiskLevel,
    toggleUrgent,
    updateCase,
  };
}
