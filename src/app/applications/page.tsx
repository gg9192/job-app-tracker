"use client"
import ApplicationKanbanColumn from '@/components/applicationKanbanColumn';
import React from 'react';

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'APPLIED' | 'INTERVIEWING' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';
  dateApplied: string; // ISO date string
}


// Hardcoded job application data for demonstration
const jobApplications: JobApplication[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    status: 'APPLIED',
    dateApplied: '2024-05-20',
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Creative Agency',
    location: 'New York, NY',
    status: 'INTERVIEWING',
    dateApplied: '2024-05-25',
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Data Innovations',
    location: 'Seattle, WA',
    status: 'APPLIED',
    dateApplied: '2024-06-01',
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Innovate Corp',
    location: 'Boston, MA',
    status: 'OFFER',
    dateApplied: '2024-06-05',
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Chicago, IL',
    status: 'REJECTED',
    dateApplied: '2024-05-10',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Services',
    location: 'Austin, TX',
    status: 'INTERVIEWING',
    dateApplied: '2024-06-10',
  },
  {
    id: '7',
    title: 'Mobile Developer',
    company: 'App Creations',
    location: 'Los Angeles, CA',
    status: 'WITHDRAWN',
    dateApplied: '2024-05-15',
  },
];

const statusEnum = {
  APPLIED: "APPLIED",
  INTERVIEWING: "INTERVIEWING",
  OFFER: "OFFER",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN",
};

// Helper to get status display name and color
const getStatusProps = (status:Object):{name:string, color: string} => {
  switch (status) {
    case statusEnum.APPLIED:
      return { name: 'Applied', color: 'bg-blue-500' };
    case statusEnum.INTERVIEWING:
      return { name: 'Interviewing', color: 'bg-purple-500' };
    case statusEnum.OFFER:
      return { name: 'Offer', color: 'bg-green-500' };
    case statusEnum.REJECTED:
      return { name: 'Rejected', color: 'bg-red-500' };
    case statusEnum.WITHDRAWN:
      return { name: 'Withdrawn', color: 'bg-gray-500' };
    default:
      return { name: 'Unknown', color: 'bg-gray-400' };
  }
};

export default function ApplicationsPage() {
  // Group applications by status
  const groupedApplications: { [key: string]: JobApplication[] } = Object.values(statusEnum).reduce((acc, status) => {
    acc[status] = jobApplications.filter(app => app.status === status);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 font-inter">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-gray-100">Job Application Tracker</h1>
        <p className="text-lg text-center text-gray-400 mt-2">Organize and track your job applications with ease.</p>
      </header>

      {/* Main content area - Columns */}
      <div className="flex flex-wrap gap-6 justify-center">
        {Object.keys(groupedApplications).map((statusKey, idx) => {
          const { name: statusName, color: statusColor } = getStatusProps(statusKey);
          return (
            <ApplicationKanbanColumn key={idx} applications={groupedApplications[statusKey]} statusColor={statusColor} statusName={statusName}></ApplicationKanbanColumn>
          );
        })}
      </div>
    </div>
  );
};

