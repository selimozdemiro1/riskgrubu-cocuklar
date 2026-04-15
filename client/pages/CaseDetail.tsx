import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  Clock,
  CheckCircle2,
  MessageSquare,
  Edit2,
  Flag,
  Loader,
} from "lucide-react";
import Layout from "@/components/Layout";
import CaseTimeline from "@/components/CaseTimeline";
import AddNoteModal from "@/components/AddNoteModal";
import EditRiskModal from "@/components/EditRiskModal";
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

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const { caseData, loading, error, changeStatus, addNote, updateRiskLevel, toggleUrgent } =
    useCase(id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !caseData) {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-slate-900 font-semibold">
            {error || "Case not found"}
          </p>
          <p className="text-slate-600 mt-2">
            {error ? "Unable to load the case. Please try again." : "The case you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  const handleStatusChange = (newStatus: "open" | "in_progress" | "closed") => {
    changeStatus(newStatus);
  };

  const handleAddNote = (noteContent: string) => {
    addNote(noteContent);
    setShowNoteModal(false);
  };

  const handleUpdateRisk = (newLevel: "Low" | "Medium" | "High") => {
    updateRiskLevel(newLevel);
    setShowRiskModal(false);
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
            <p className="text-slate-600 mt-1">{caseData.id}</p>
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

            {/* Risk Information */}
            <div
              className={`${
                riskConfig[caseData.riskLevel as keyof typeof riskConfig].bgLight
              } rounded-lg border-l-4 border-l-amber-500 p-6`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Risk Assessment
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 text-sm">Risk Category:</span>
                      <span className="font-medium text-slate-900">
                        {caseData.riskCategory}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 text-sm">Risk Level:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          riskConfig[
                            caseData.riskLevel as keyof typeof riskConfig
                          ].color
                        }`}
                      >
                        {caseData.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleUrgent}
                  className={`p-2 rounded-lg transition-colors ${
                    caseData.isUrgent
                      ? "bg-red-200 text-red-700"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                  title="Toggle urgent flag"
                >
                  <Flag className="w-5 h-5" />
                </button>
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

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Case Metadata */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Case Details
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
                  <p className="text-slate-500">Notes</p>
                  <p className="text-slate-900 font-medium">{caseData.notes}</p>
                </div>
              </div>
            </div>

            {/* Parent/Guardian Info */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Parent/Guardian
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-slate-500">Name</p>
                  <p className="text-slate-900 font-medium">
                    {caseData.parentName}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Phone</p>
                  <p className="text-slate-900 font-medium">
                    {caseData.parentPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Management */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Change Status
              </h3>
              <div className="space-y-2">
                {Object.entries(statusConfig).map(([statusKey, config]) => (
                  <button
                    key={statusKey}
                    onClick={() =>
                      handleStatusChange(statusKey as "open" | "in_progress" | "closed")
                    }
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      caseData.status === statusKey
                        ? `${config.color} border-2 border-current`
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">
                Actions
              </h3>
              <button
                onClick={() => setShowNoteModal(true)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Add Note
              </button>
              <button
                onClick={() => setShowRiskModal(true)}
                className="w-full flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Update Risk Level
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      {showNoteModal && (
        <AddNoteModal
          onClose={() => setShowNoteModal(false)}
          onSubmit={handleAddNote}
        />
      )}

      {/* Edit Risk Modal */}
      {showRiskModal && (
        <EditRiskModal
          currentLevel={caseData.riskLevel}
          currentCategory={caseData.riskCategory}
          onClose={() => setShowRiskModal(false)}
          onSubmit={handleUpdateRisk}
        />
      )}
    </Layout>
  );
}
