import { Clock, FileText, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

interface TimelineEntry {
  id: number;
  type: "created" | "status_change" | "note_added" | "file_added" | "risk_updated";
  title: string;
  description: string;
  timestamp: string;
  user: string;
}

interface CaseTimelineProps {
  timeline: TimelineEntry[];
}

const typeIcons = {
  created: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  status_change: <Clock className="w-5 h-5 text-blue-600" />,
  note_added: <MessageSquare className="w-5 h-5 text-amber-600" />,
  file_added: <FileText className="w-5 h-5 text-slate-600" />,
  risk_updated: <AlertCircle className="w-5 h-5 text-red-600" />,
};

const typeBg = {
  created: "bg-green-50",
  status_change: "bg-blue-50",
  note_added: "bg-amber-50",
  file_added: "bg-slate-50",
  risk_updated: "bg-red-50",
};

export default function CaseTimeline({ timeline }: CaseTimelineProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Activity Timeline</h2>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {timeline.length > 0 ? (
            timeline.map((entry, index) => (
              <div key={entry.id} className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`p-2 rounded-full ${
                      typeBg[entry.type]
                    } border border-current`}
                  >
                    {typeIcons[entry.type]}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-12 bg-slate-200 mt-2" />
                  )}
                </div>

                {/* Timeline content */}
                <div className="pb-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {entry.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {entry.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>{entry.timestamp}</span>
                    <span>•</span>
                    <span>by {entry.user}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">
              No activity yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
