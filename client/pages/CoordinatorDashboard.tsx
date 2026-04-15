import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, TrendingUp, Flag, Clock, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import { useCase } from "@/hooks/useCase";

// Mock case list data
const allCases = [
  { id: "001", studentName: "Ahmet Yılmaz", status: "open", riskLevel: "Medium", isUrgent: true },
  { id: "002", studentName: "Zeynep Demir", status: "open", riskLevel: "High", isUrgent: false },
  { id: "003", studentName: "Emre Kaya", status: "closed", riskLevel: "Low", isUrgent: false },
  { id: "004", studentName: "Ayşe Çetin", status: "in_progress", riskLevel: "Medium", isUrgent: false },
];

const statusConfig = {
  open: { label: "Open", color: "bg-blue-100 text-blue-800" },
  in_progress: { label: "In Progress", color: "bg-amber-100 text-amber-800" },
  closed: { label: "Closed", color: "bg-green-100 text-green-800" },
};

const riskConfig = {
  Low: { color: "bg-green-100 text-green-800", priority: 0 },
  Medium: { color: "bg-amber-100 text-amber-800", priority: 1 },
  High: { color: "bg-red-100 text-red-800", priority: 2 },
};

export default function CoordinatorDashboard() {
  const [filterPriority, setFilterPriority] = useState<"all" | "urgent" | "high">( "all");

  // Calculate statistics
  const totalCases = allCases.length;
  const highRiskCount = allCases.filter((c) => c.riskLevel === "High").length;
  const urgentCount = allCases.filter((c) => c.isUrgent).length;
  const needsReviewCount = allCases.filter(
    (c) => c.status === "open" || c.riskLevel === "High"
  ).length;

  // Filter cases for review queue
  const reviewQueueCases = allCases
    .filter((c) => c.status === "open" || c.riskLevel === "High")
    .sort((a, b) => {
      // Sort by urgency first, then by risk level
      if (a.isUrgent !== b.isUrgent) {
        return a.isUrgent ? -1 : 1;
      }
      return (riskConfig[b.riskLevel as keyof typeof riskConfig].priority || 0) -
             (riskConfig[a.riskLevel as keyof typeof riskConfig].priority || 0);
    });

  // Apply filter
  const filteredCases =
    filterPriority === "all"
      ? reviewQueueCases
      : filterPriority === "urgent"
      ? reviewQueueCases.filter((c) => c.isUrgent)
      : reviewQueueCases.filter((c) => c.riskLevel === "High");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Coordinator Panel</h1>
          <p className="text-slate-600 mt-1">
            Review and manage cases across all schools and institutions
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Cases</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {totalCases}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-red-700 text-sm font-medium">High Risk Cases</p>
                <p className="text-3xl font-bold text-red-900 mt-2">
                  {highRiskCount}
                </p>
              </div>
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-red-700 text-sm font-medium">Urgent Cases</p>
                <p className="text-3xl font-bold text-red-900 mt-2">
                  {urgentCount}
                </p>
              </div>
              <Flag className="w-6 h-6 text-red-600" />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-amber-700 text-sm font-medium">Needs Review</p>
                <p className="text-3xl font-bold text-amber-900 mt-2">
                  {needsReviewCount}
                </p>
              </div>
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Review Queue */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Review Queue
              </h2>
              <span className="text-sm font-medium text-slate-600">
                {filteredCases.length} cases
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterPriority("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterPriority === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All ({reviewQueueCases.length})
              </button>
              <button
                onClick={() => setFilterPriority("urgent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterPriority === "urgent"
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Urgent ({reviewQueueCases.filter((c) => c.isUrgent).length})
              </button>
              <button
                onClick={() => setFilterPriority("high")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterPriority === "high"
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                High Risk ({reviewQueueCases.filter((c) => c.riskLevel === "High").length})
              </button>
            </div>
          </div>

          {/* Cases List */}
          {filteredCases.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {filteredCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  to={`/coordinator/cases/${caseItem.id}`}
                  className="block p-6 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left side */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                          {caseItem.studentName}
                        </h3>

                        {/* Badges */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusConfig[caseItem.status as keyof typeof statusConfig].color
                          }`}
                        >
                          {statusConfig[caseItem.status as keyof typeof statusConfig].label}
                        </span>

                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            riskConfig[caseItem.riskLevel as keyof typeof riskConfig].color
                          }`}
                        >
                          {caseItem.riskLevel} Risk
                        </span>

                        {caseItem.isUrgent && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                            <Flag className="w-3 h-3" /> Urgent
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-600">
                        Case ID: <span className="font-mono text-blue-600">CASE-{caseItem.id}</span>
                      </p>
                    </div>

                    {/* Right side - Action */}
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors flex-shrink-0">
                      <Eye className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-600 font-medium">No cases to review</p>
              <p className="text-sm text-slate-500 mt-1">
                All cases are reviewed and assigned
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Review Queue:</strong> Shows all Open cases and High Risk cases that need coordinator attention. Sort by urgency and risk level to prioritize your work.
          </p>
        </div>
      </div>
    </Layout>
  );
}
