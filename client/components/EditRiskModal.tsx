import { useState } from "react";
import { X, AlertCircle } from "lucide-react";

interface EditRiskModalProps {
  currentLevel: "Low" | "Medium" | "High";
  currentCategory: string;
  onClose: () => void;
  onSubmit: (level: "Low" | "Medium" | "High") => void;
}

const riskLevels = [
  {
    level: "Low" as const,
    description: "Minimal risk, routine monitoring",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  {
    level: "Medium" as const,
    description: "Moderate risk, requires regular follow-up",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
  },
  {
    level: "High" as const,
    description: "High risk, immediate intervention needed",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
  },
];

export default function EditRiskModal({
  currentLevel,
  currentCategory,
  onClose,
  onSubmit,
}: EditRiskModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<
    "Low" | "Medium" | "High"
  >(currentLevel);

  const handleSubmit = () => {
    if (selectedLevel !== currentLevel) {
      onSubmit(selectedLevel);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Update Risk Level
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Current Info */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Risk Category</p>
            <p className="font-semibold text-slate-900">{currentCategory}</p>
          </div>

          {/* Risk Level Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-900">Select New Level</p>

            {riskLevels.map(({ level, description, color, badge }) => (
              <label
                key={level}
                className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedLevel === level
                    ? `${color} border-current`
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="risk-level"
                  value={level}
                  checked={selectedLevel === level}
                  onChange={(e) => setSelectedLevel(e.target.value as "Low" | "Medium" | "High")}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${badge}`}>
                      {level}
                    </span>
                    {selectedLevel === level && (
                      <span className="text-xs font-semibold text-blue-600">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{description}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Warning for High Risk */}
          {selectedLevel === "High" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">High Risk Case</p>
                <p className="text-sm text-red-800 mt-1">
                  This case requires immediate intervention and close monitoring.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedLevel === currentLevel}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Update Risk Level
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
