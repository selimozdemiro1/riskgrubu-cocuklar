import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";

export default function NewCase() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Student info
    studentName: "",
    studentId: "",
    birthDate: "",
    grade: "",
    schoolName: "",

    // Risk info
    riskCategory: "",
    description: "",
    severity: "medium",
    isUrgent: false,

    // Additional
    parentName: "",
    parentPhone: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const inputElement = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? inputElement.checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Navigate back to cases list
    setTimeout(() => navigate("/teacher"), 500);
  };

  const isFormValid =
    formData.studentName &&
    formData.studentId &&
    formData.grade &&
    formData.schoolName &&
    formData.riskCategory &&
    formData.description;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/teacher")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Case</h1>
            <p className="text-slate-600 mt-1">
              Report a child at risk and provide detailed information
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Student Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Ahmet Yılmaz"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Student ID / T.C. No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 12345678901"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Grade / Class <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4-A"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Atatürk Primary School"
                />
              </div>
            </div>
          </div>

          {/* Risk Information Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Risk Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Risk Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="riskCategory"
                  value={formData.riskCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="neglect">Neglect</option>
                  <option value="abuse">Abuse</option>
                  <option value="behavioral">Behavioral Issues</option>
                  <option value="family">Family Conflict</option>
                  <option value="health">Health Concerns</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Severity Level
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isUrgent"
                    name="isUrgent"
                    checked={formData.isUrgent}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isUrgent"
                    className="text-sm font-medium text-slate-900"
                  >
                    Mark as urgent (requires immediate attention)
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Situation Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide a detailed description of the situation, observations, and concerns..."
                />
              </div>
            </div>
          </div>

          {/* Parent/Guardian Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Parent/Guardian Information (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+90 XXX XXX XXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any other relevant information..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/teacher")}
              className="px-6 py-2 border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              Create Case
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
