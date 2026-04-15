import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BarChart3, BookOpen, Settings, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/", icon: BarChart3 },
    { label: "Teacher Panel", href: "/teacher", icon: BookOpen },
    { label: "Coordinator", href: "/coordinator", icon: CheckSquare },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 w-64 h-screen bg-white border-r border-slate-200 shadow-lg transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Case Risk</h1>
              <p className="text-xs text-slate-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    "hover:bg-slate-100 text-slate-600",
                    "text-sm font-medium"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-blue-700">ST</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">School Teacher</p>
              <p className="text-xs text-slate-500">teacher@school.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <h2 className="text-lg font-semibold text-slate-900 hidden sm:block">
              Child Risk Management System
            </h2>
            <div className="w-8 h-8" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
