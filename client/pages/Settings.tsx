import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "institutions", label: "Institutions" },
    { id: "schools", label: "Schools" },
    { id: "neighborhoods", label: "Neighborhoods" },
    { id: "risk-groups", label: "Risk Groups" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">
            Manage system configurations and reference data
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 rounded-t-lg">
          <div className="flex border-b border-slate-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 border-transparent hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                General Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Case Risk Management System"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>UTC+3 (Turkey)</option>
                    <option>UTC+0 (London)</option>
                    <option>UTC+1 (Europe)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    System Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Child Risk Management and Case Tracking System"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {["institutions", "schools", "neighborhoods", "risk-groups"].includes(
            activeTab
          ) && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((item) => (
                      <tr key={item} className="border-b border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-900 font-medium">
                          Item {item}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-slate-500 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Notification Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900">Email Notifications</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Configure SMTP settings for email notifications
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900">SMS Notifications</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Configure Netgsm API settings for SMS notifications
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Configure
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900">In-App Notifications</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Manage in-app notification preferences
                    </p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> Some settings require system administrator permissions to change.
            Contact your system administrator if you need assistance.
          </p>
        </div>
      </div>
    </Layout>
  );
}
