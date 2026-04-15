import { AlertCircle, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

// Mock data
const summaryCards = [
  {
    id: 1,
    label: "Total Cases",
    value: "24",
    change: "+3 this month",
    icon: TrendingUp,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    id: 2,
    label: "Active Cases",
    value: "12",
    change: "+2 since yesterday",
    icon: Clock,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    id: 3,
    label: "Alerts",
    value: "3",
    change: "Requires attention",
    icon: AlertCircle,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "border-red-200",
  },
  {
    id: 4,
    label: "Completed",
    value: "9",
    change: "This month",
    icon: CheckCircle2,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
];

const recentCases = [
  {
    id: "CASE-001",
    studentName: "Ahmet Yılmaz",
    school: "Atatürk Primary School",
    status: "active",
    createdDate: "2024-01-15",
    risk: "Medium",
  },
  {
    id: "CASE-002",
    studentName: "Zeynep Demir",
    school: "Cumhuriyet Middle School",
    status: "review",
    createdDate: "2024-01-14",
    risk: "High",
  },
  {
    id: "CASE-003",
    studentName: "Emre Kaya",
    school: "Atatürk Primary School",
    status: "completed",
    createdDate: "2024-01-10",
    risk: "Low",
  },
  {
    id: "CASE-004",
    studentName: "Ayşe Çetin",
    school: "Yıldız High School",
    status: "active",
    createdDate: "2024-01-13",
    risk: "Medium",
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-blue-100 text-blue-800" },
  review: { label: "In Review", color: "bg-amber-100 text-amber-800" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800" },
};

const riskConfig = {
  Low: { color: "bg-green-100 text-green-800" },
  Medium: { color: "bg-amber-100 text-amber-800" },
  High: { color: "bg-red-100 text-red-800" },
};

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening in your cases.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`${card.bgColor} border-l-4 ${card.borderColor} rounded-lg p-6 shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {card.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">{card.change}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Cases
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentCases.map((caseItem) => (
                  <tr
                    key={caseItem.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Link
                      to={`/cases/${caseItem.id.replace('CASE-', '')}`}
                      className="contents"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-blue-600 hover:underline">
                        {caseItem.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">
                        {caseItem.studentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {caseItem.school}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusConfig[caseItem.status as keyof typeof statusConfig].color
                          }`}
                        >
                          {statusConfig[caseItem.status as keyof typeof statusConfig].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            riskConfig[caseItem.risk as keyof typeof riskConfig].color
                          }`}
                        >
                          {caseItem.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(caseItem.createdDate).toLocaleDateString()}
                      </td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-200 text-center">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              View all cases →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
