export interface CaseTimelineEntry {
  id: number;
  type: "created" | "status_change" | "note_added" | "risk_updated";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

export interface Case {
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

// In-memory database
const casesDatabase: Map<string, Case> = new Map();

// Initialize with mock data
function initializeMockData() {
  const mockCases: Record<string, Case> = {
    "001": {
      id: "CASE-001",
      studentName: "Ahmet Yılmaz",
      studentId: "TC-12345678901",
      birthDate: "2015-05-10",
      grade: "4-A",
      school: "Atatürk Primary School",
      riskCategory: "Neglect",
      riskLevel: "Medium",
      isUrgent: true,
      description:
        "Student showing signs of neglect. Comes to school with unwashed clothes, often reports not eating breakfast. Has been absent frequently without explanation. Shows withdrawn behavior during class and avoids social interaction with peers.",
      status: "in_progress",
      createdDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      createdBy: "Fatma Öğretmen",
      parentName: "Mehmet Yılmaz",
      parentPhone: "+90 555 123 4567",
      notes: 3,
      timeline: [
        {
          id: 1,
          type: "created",
          title: "Case Created",
          description: "Case was reported by Fatma Öğretmen",
          timestamp: "2024-01-15 10:30 AM",
          user: "Fatma Öğretmen",
        },
        {
          id: 2,
          type: "status_change",
          title: "Status Changed",
          description: "Status changed from Open to In Progress",
          timestamp: "2024-01-16 09:15 AM",
          user: "Koordinatör Admin",
        },
        {
          id: 3,
          type: "note_added",
          title: "Note Added",
          description: "Follow-up visit scheduled with family",
          timestamp: "2024-01-18 02:45 PM",
          user: "Sosyal Çalışmacı",
        },
      ],
    },
    "002": {
      id: "CASE-002",
      studentName: "Zeynep Demir",
      studentId: "TC-98765432102",
      birthDate: "2014-03-22",
      grade: "3-B",
      school: "Cumhuriyet Middle School",
      riskCategory: "Behavioral Issues",
      riskLevel: "High",
      isUrgent: false,
      description:
        "Student exhibiting aggressive behavior towards peers and teachers. Frequent disciplinary issues. Suspected family conflict based on student interviews.",
      status: "open",
      createdDate: "2024-01-14",
      lastUpdate: "2024-01-14",
      createdBy: "Ahmet Bey",
      parentName: "Hasan Demir",
      parentPhone: "+90 555 234 5678",
      notes: 1,
      timeline: [
        {
          id: 1,
          type: "created",
          title: "Case Created",
          description: "Case was reported by Ahmet Bey",
          timestamp: "2024-01-14 11:20 AM",
          user: "Ahmet Bey",
        },
      ],
    },
    "003": {
      id: "CASE-003",
      studentName: "Emre Kaya",
      studentId: "TC-55555555503",
      birthDate: "2013-07-15",
      grade: "5-A",
      school: "Atatürk Primary School",
      riskCategory: "Family Conflict",
      riskLevel: "Low",
      isUrgent: false,
      description:
        "Student reported family conflict. Parents have been advised to seek counseling. Regular check-ins scheduled.",
      status: "closed",
      createdDate: "2024-01-05",
      lastUpdate: "2024-01-10",
      createdBy: "Zehra Öğretmen",
      parentName: "Ali Kaya",
      parentPhone: "+90 555 345 6789",
      notes: 2,
      timeline: [
        {
          id: 1,
          type: "created",
          title: "Case Created",
          description: "Case was reported",
          timestamp: "2024-01-05 09:00 AM",
          user: "Zehra Öğretmen",
        },
        {
          id: 2,
          type: "status_change",
          title: "Status Changed",
          description: "Status changed to Closed",
          timestamp: "2024-01-10 04:30 PM",
          user: "Koordinatör Admin",
        },
      ],
    },
    "004": {
      id: "CASE-004",
      studentName: "Ayşe Çetin",
      studentId: "TC-77777777704",
      birthDate: "2014-11-08",
      grade: "2-C",
      school: "Yıldız High School",
      riskCategory: "Health Concerns",
      riskLevel: "Medium",
      isUrgent: false,
      description:
        "Student has been absent frequently due to health issues. School nurse consulted. Monitoring ongoing.",
      status: "in_progress",
      createdDate: "2024-01-13",
      lastUpdate: "2024-01-18",
      createdBy: "Meral Öğretmen",
      parentName: "Fatma Çetin",
      parentPhone: "+90 555 456 7890",
      notes: 0,
      timeline: [
        {
          id: 1,
          type: "created",
          title: "Case Created",
          description: "Case was reported",
          timestamp: "2024-01-13 02:15 PM",
          user: "Meral Öğretmen",
        },
      ],
    },
  };

  Object.entries(mockCases).forEach(([id, caseData]) => {
    casesDatabase.set(id, caseData);
  });
}

// Initialize on module load
initializeMockData();

export const db = {
  getAllCases: (): Case[] => {
    return Array.from(casesDatabase.values());
  },

  getCaseById: (id: string): Case | undefined => {
    return casesDatabase.get(id);
  },

  createCase: (caseData: Omit<Case, "id" | "timeline" | "notes" | "lastUpdate">): Case => {
    const id = Date.now().toString();
    const newCase: Case = {
      ...caseData,
      id: `CASE-${id}`,
      lastUpdate: new Date().toLocaleDateString(),
      notes: 0,
      timeline: [
        {
          id: 1,
          type: "created",
          title: "Case Created",
          description: `Case was reported by ${caseData.createdBy}`,
          timestamp: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          user: caseData.createdBy,
        },
      ],
    };
    casesDatabase.set(id, newCase);
    return newCase;
  },

  updateCase: (id: string, updates: Partial<Case>): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    const updated = {
      ...caseData,
      ...updates,
      lastUpdate: new Date().toLocaleDateString(),
    };
    casesDatabase.set(id, updated);
    return updated;
  },

  addTimelineEntry: (id: string, entry: Omit<CaseTimelineEntry, "id">): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    const newEntry: CaseTimelineEntry = {
      ...entry,
      id: caseData.timeline.length + 1,
    };

    caseData.timeline.push(newEntry);
    caseData.lastUpdate = new Date().toLocaleDateString();

    casesDatabase.set(id, caseData);
    return caseData;
  },

  addNote: (id: string, noteContent: string): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    caseData.notes += 1;

    const newEntry: CaseTimelineEntry = {
      id: caseData.timeline.length + 1,
      type: "note_added",
      title: "Note Added",
      description: noteContent,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      user: "School Teacher",
    };

    caseData.timeline.push(newEntry);
    caseData.lastUpdate = new Date().toLocaleDateString();

    casesDatabase.set(id, caseData);
    return caseData;
  },

  changeStatus: (
    id: string,
    newStatus: "open" | "in_progress" | "closed"
  ): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    const statusLabels = {
      open: "Open",
      in_progress: "In Progress",
      closed: "Closed",
    };

    const oldStatus = caseData.status;
    caseData.status = newStatus;

    const newEntry: CaseTimelineEntry = {
      id: caseData.timeline.length + 1,
      type: "status_change",
      title: "Status Changed",
      description: `Status changed from ${statusLabels[oldStatus]} to ${statusLabels[newStatus]}`,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      user: "School Teacher",
    };

    caseData.timeline.push(newEntry);
    caseData.lastUpdate = new Date().toLocaleDateString();

    casesDatabase.set(id, caseData);
    return caseData;
  },

  updateRiskLevel: (
    id: string,
    newLevel: "Low" | "Medium" | "High"
  ): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    const oldLevel = caseData.riskLevel;
    caseData.riskLevel = newLevel;

    const newEntry: CaseTimelineEntry = {
      id: caseData.timeline.length + 1,
      type: "risk_updated",
      title: "Risk Level Updated",
      description: `Risk level changed from ${oldLevel} to ${newLevel}`,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      user: "School Teacher",
    };

    caseData.timeline.push(newEntry);
    caseData.lastUpdate = new Date().toLocaleDateString();

    casesDatabase.set(id, caseData);
    return caseData;
  },

  toggleUrgent: (id: string): Case | null => {
    const caseData = casesDatabase.get(id);
    if (!caseData) return null;

    caseData.isUrgent = !caseData.isUrgent;
    caseData.lastUpdate = new Date().toLocaleDateString();

    casesDatabase.set(id, caseData);
    return caseData;
  },
};
