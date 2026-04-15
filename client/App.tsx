import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TeacherCases from "./pages/TeacherCases";
import NewCase from "./pages/NewCase";
import CaseDetail from "./pages/CaseDetail";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import CoordinatorReview from "./pages/CoordinatorReview";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/teacher" element={<TeacherCases />} />
            <Route path="/teacher/new-case" element={<NewCase />} />
            <Route path="/teacher/cases/:caseId" element={<CaseDetail />} />
            <Route path="/coordinator" element={<CoordinatorDashboard />} />
            <Route path="/coordinator/cases/:id" element={<CoordinatorReview />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
