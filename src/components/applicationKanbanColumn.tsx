import { JobApplication } from "@/app/applications/page";
import { useId } from "react";

export default function ApplicationKanbanColumn({applications, statusName, statusColor}:{applications: JobApplication[], statusName: string, statusColor: string}) {
    return (<div
              key={statusName}
              className="flex-shrink-0 w-full md:w-80 bg-gray-700 rounded-lg shadow-xl p-4 flex flex-col"
              style={{ minHeight: '400px' }} // Ensure columns have a minimum height
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-600">
                <h2 className="text-xl font-semibold flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
                  {statusName} ({applications.length})
                </h2>
                {/* Plus icon for adding new applications (placeholder) */}
                <button className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Job Application Cards */}
              <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-gray-600 rounded-md p-3 shadow-md border border-gray-500 hover:border-gray-400 transition-all duration-200 cursor-grab active:cursor-grabbing"
                    >
                      <h3 className="text-lg font-semibold text-gray-100 mb-1">{app.title}</h3>
                      <p className="text-gray-300 text-sm mb-1">{app.company}</p>
                      <p className="text-gray-400 text-xs">{app.location}</p>
                      <p className="text-gray-500 text-xs mt-2">Applied: {app.dateApplied}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No applications here yet.</p>
                )}
              </div>
            </div>)
}