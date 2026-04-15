import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  Check,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Loader,
} from "lucide-react";
import Layout from "@/components/Layout";
import CaseTimeline from "@/components/CaseTimeline";
import AddNoteModal from "@/components/AddNoteModal";
import RiskGroupAssignmentModal from "@/components/RiskGroupAssignmentModal";
import { useCase } from "@/hooks/useCase";

const statusConfig = {
  open: { label: "Open", color: "bg-blue-100 text-blue-800" },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-800",
  },
  closed: { label: "Closed", color: "bg-green-100 text-green-800" },
};

const riskConfig = {
  Low: { color: "bg-green-100 text-green-800", bgLight: "bg-green-50" },
  Medium: { color: "bg-amber-100 text-amber-800", bgLight: "bg-amber-50" },
  High: { color: "bg-red-100 text-red-800", bgLight: "bg-red-50" },
};

export default function CoordinatorReview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showRiskGroupModal, setShowRiskGroupModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approve" | "escalate" | null>(null);

  const { caseData, loading, addNote, changeStatus } = useCase(id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!caseData) {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-slate-900 font-semibold">Case not found</p>
        </div>
      </Layout>
    );
  }

  const handleApproveCase = () => {
    changeStatus("in_progress");
    setReviewAction("approve");
    addNote("Case approved and activated by coordinator");
  };

  const handleEscalateCase = () => {
    changeStatus("in_progress");
    setReviewAction("escalate");
    addNote("Case escalated to emergency response - High risk intervention required");
  };

  const handleAddInternalNote = (noteContent: string) => {
    addNote(`[Internal Note] ${noteContent}`);
    setShowNoteModal(false);
  };

  const handleAssignRiskGroup = (riskGroup: string) => {
    addNote(`Case assigned to risk group: ${riskGroup}`);
    setShowRiskGroupModal(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-slate-900">
                {caseData.studentName}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusConfig[caseData.status as keyof typeof statusConfig].color
                }`}
              >
                {statusConfig[caseData.status as keyof typeof statusConfig].label}
              </span>
              {caseData.isUrgent && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Urgent
                </span>
              )}
            </div>
            <p className="text-slate-600 mt-1">
              Coordinator Review: {caseData.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Information */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Student Information
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Student ID</p>
                    <p className="text-slate-900 font-semibold mt-1">
                      {caseData.studentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Birth Date</p>
                    <p className="text-slate-900 font-semibold mt-1">
                      {new Date(caseData.birthDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Grade</p>
                    <p className="text-slate-900 font-semibold mt-1">
                      {caseData.grade}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">School</p>
                    <p className="text-slate-900 font-semibold mt-1">
                      {caseData.school}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment - Prominent for Coordinator */}
            <div
              className={`${
                riskConfig[caseData.riskLevel as keyof typeof riskConfig].bgLight
              } rounded-lg border-l-4 border-l-amber-500 p-6`}
            >
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">
                  Risk Assessment
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Risk Category</p>
                    <p className="font-medium text-slate-900 mt-1">
                      {caseData.riskCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Risk Level</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${
                        riskConfig[
                          caseData.riskLevel as keyof typeof riskConfig
                        ].color
                      }`}
                    >
                      {caseData.riskLevel}
                    </span>
                  </div>
                </div>

                {caseData.isUrgent && (
                  <div className="bg-red-100 border border-red-300 rounded px-3 py-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span className="text-sm font-medium text-red-900">
                      Case marked as URGENT - requires immediate action
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Case Description */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Situation Description
                </h2>
              </div>

              <div className="p-6">
                <p className="text-slate-700 leading-relaxed">
                  {caseData.description}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <CaseTimeline timeline={caseData.timeline} />
          </div>

          {/* Coordinator Actions Panel */}
          <div className="space-y-6">
            {/* Coordinator Review Status */}
            {reviewAction && (
              <div
                className={`rounded-lg border p-4 ${
                  reviewAction === "approve"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {reviewAction === "approve" ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {reviewAction === "approve"
                        ? "Case Approved"
                        : "Case Escalated"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {reviewAction === "approve"
                        ? "Case has been approved and activated for intervention"
                        : "Case has been escalated to emergency response"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Case Details */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Case Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500">Created</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(caseData.createdDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    by {caseData.createdBy}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-slate-500">Last Updated</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(caseData.lastUpdate).toLocaleDateString()}
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-slate-500">Internal Notes</p>
                  <p className="text-slate-900 font-medium">{caseData.notes}</p>
                </div>
              </div>
            </div>

            {/* Review Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Coordinator Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleApproveCase}
                  disabled={reviewAction === "approve"}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Approve & Activate
                </button>
                <button
                  onClick={handleEscalateCase}
                  disabled={reviewAction === "escalate"}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Escalate
                </button>
                <button
                  onClick={() => setShowRiskGroupModal(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Assign Risk Group
                </button>
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Add Internal Note
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-900">
                <strong>Coordinator Note:</strong> Review the case thoroughly. Approve to activate the case for institutional intervention, or escalate to emergency response if high risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Internal Note Modal */}
      {showNoteModal && (
        <AddNoteModal
          onClose={() => setShowNoteModal(false)}
          onSubmit={handleAddInternalNote}
        />
      )}

      {/* Risk Group Assignment Modal */}
      {showRiskGroupModal && (
        <RiskGroupAssignmentModal
          currentRiskLevel={caseData.riskLevel}
          onClose={() => setShowRiskGroupModal(false)}
          onAssign={handleAssignRiskGroup}
        />
      )}
    </Layout>
  );
}
