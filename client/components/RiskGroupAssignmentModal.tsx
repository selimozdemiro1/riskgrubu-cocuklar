import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

interface RiskGroupAssignmentModalProps {
  currentRiskLevel: "Low" | "Medium" | "High";
  onClose: () => void;
  onAssign: (riskGroup: string) => void;
}

const riskGroups = [
  {
    id: "primary-low",
    name: "Primary Care Unit - Low Risk",
    institution: "Child Services - District A",
    sla: "30 days",
    description: "Routine monitoring and support",
    riskLevel: "Low" as const,
  },
  {
    id: "primary-medium",
    name: "Family Support Team - Medium Risk",
    institution: "Child Services - District B",
    sla: "14 days",
    description: "Regular follow-ups and interventions",
    riskLevel: "Medium" as const,
  },
  {
    id: "emergency-high",
    name: "Emergency Response Unit - High Risk",
    institution: "Child Services - Crisis Team",
    sla: "3 days",
    description: "Immediate intervention and protection",
    riskLevel: "High" as const,
  },
];

const riskLevelColors = {
  Low: "bg-green-50 border-green-200",
  Medium: "bg-amber-50 border-amber-200",
  High: "bg-red-50 border-red-200",
};

const riskLevelBadges = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-red-100 text-red-800",
};

export default function RiskGroupAssignmentModal({
  currentRiskLevel,
  onClose,
  onAssign,
}: RiskGroupAssignmentModalProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleAssign = () => {
    if (selectedGroup) {
      onAssign(selectedGroup);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">
            Assign to Risk Group
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Current Risk Info */}
          <div className={`rounded-lg border p-4 ${riskLevelColors[currentRiskLevel]}`}>
            <p className="text-sm text-slate-600 mb-1">Current Risk Level</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  riskLevelBadges[currentRiskLevel]
                }`}
              >
                {currentRiskLevel} Risk
              </span>
              <p className="text-sm text-slate-700">
                Select appropriate risk group below
              </p>
            </div>
          </div>

          {/* Risk Groups Selection */}
          <div className="space-y-3">
            {riskGroups.map((group) => (
              <label
                key={group.id}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedGroup === group.id
                    ? `${riskLevelColors[group.riskLevel]} border-current`
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex gap-4">
                  <input
                    type="radio"
                    name="risk-group"
                    value={group.id}
                    checked={selectedGroup === group.id}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {group.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-0.5">
                          {group.institution}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                          riskLevelBadges[group.riskLevel]
                        }`}
                      >
                        {group.riskLevel}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">
                      {group.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>
                        <strong>SLA:</strong> {group.sla}
                      </span>
                      {selectedGroup === group.id && (
                        <span className="text-blue-600 font-semibold">
                          ✓ Selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Risk Group Assignment</p>
              <p className="text-sm text-blue-800 mt-1">
                The selected risk group will manage this case according to their SLA (Service Level Agreement). The case will be assigned to the primary institution coordinator.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 flex gap-3 justify-end p-6 border-t border-slate-200 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedGroup}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Assign Risk Group
          </button>
        </div>
      </div>
    </div>
  );
}
