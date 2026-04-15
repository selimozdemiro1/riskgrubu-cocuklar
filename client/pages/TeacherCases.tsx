import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import Layout from "@/components/Layout";

// Mock data
const teacherCases = [
  {
    id: "CASE-T001",
    studentName: "Ahmet Yılmaz",
    studentId: "TC-00123",
    grade: "4-A",
    status: "open",
    description: "Student showing signs of neglect, irregular attendance",
    createdDate: "2024-01-15",
  },
  {
    id: "CASE-T002",
    studentName: "Zeynep Demir",
    studentId: "TC-00124",
    grade: "3-B",
    status: "in_progress",
    description: "Behavioral issues and suspected family conflict",
    createdDate: "2024-01-10",
  },
  {
    id: "CASE-T003",
    studentName: "Emre Kaya",
    studentId: "TC-00125",
    grade: "5-A",
    status: "closed",
    description: "Resolved after family counseling intervention",
    createdDate: "2024-01-05",
  },
];

const statusConfig = {
  open: { label: "Open", color: "bg-blue-100 text-blue-800", icon: "●" },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-800",
    icon: "●",
  },
  closed: { label: "Closed", color: "bg-green-100 text-green-800", icon: "●" },
};

export default function TeacherCases() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredCases = selectedStatus
    ? teacherCases.filter((c) => c.status === selectedStatus)
    : teacherCases;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with action button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Cases</h1>
            <p className="text-slate-600 mt-1">
              Manage and track all cases you've reported
            </p>
          </div>
          <Link
            to="/teacher/new-case"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Case
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              selectedStatus === null
                ? "text-blue-600 border-blue-600"
                : "text-slate-600 border-transparent hover:text-slate-900"
            }`}
          >
            All Cases ({teacherCases.length})
          </button>
          {Object.entries(statusConfig).map(([status, config]) => {
            const count = teacherCases.filter((c) => c.status === status)
              .length;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                  selectedStatus === status
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 border-transparent hover:text-slate-900"
                }`}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Cases list */}
        {filteredCases.length > 0 ? (
          <div className="grid gap-4">
            {filteredCases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {caseItem.studentName}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusConfig[
                            caseItem.status as keyof typeof statusConfig
                          ].color
                        }`}
                      >
                        {statusConfig[caseItem.status as keyof typeof statusConfig]
                          .label}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm mb-3">
                      {caseItem.description}
                    </p>

                    <div className="flex gap-6 text-xs text-slate-500">
                      <div>
                        <span className="font-medium">Case ID:</span>{" "}
                        {caseItem.id}
                      </div>
                      <div>
                        <span className="font-medium">Student ID:</span>{" "}
                        {caseItem.studentId}
                      </div>
                      <div>
                        <span className="font-medium">Grade:</span> {caseItem.grade}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(caseItem.createdDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/teacher/cases/${caseItem.id}`}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0 inline-flex"
                  >
                    <Eye className="w-5 h-5 text-slate-600" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <p className="text-slate-600">No cases found</p>
            <p className="text-sm text-slate-500 mt-1">
              Create a new case to get started
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
