"use client";

import React, { useState, useMemo } from "react";
import { SearchApplicationComponent } from "@/components/searchApplicationsComponent";
import JobApplicationTable from "@/components/applicationstable";
import { Card } from "@/components/ui/card";

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  status: "APPLIED" | "INTERVIEWING" | "OFFER" | "REJECTED" | "WITHDRAWN";
  dateApplied: string;
  tags?: string[];
}

const allJobApplications: JobApplication[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    status: "APPLIED",
    dateApplied: "2024-05-20",
    tags: ["React", "Frontend", "Remote"],
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Agency",
    location: "New York, NY",
    status: "INTERVIEWING",
    dateApplied: "2024-05-25",
    tags: ["Design", "Figma", "UI/UX"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "Data Innovations",
    location: "Seattle, WA",
    status: "APPLIED",
    dateApplied: "2024-06-01",
    tags: ["Backend", "Node.js", "API"],
  },
  {
    id: "4",
    title: "Senior Software Engineer",
    company: "Innovate Corp",
    location: "Remote",
    status: "APPLIED",
    dateApplied: "2024-06-05",
    tags: ["Senior", "Full Stack", "Leadership"],
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Analytics Hub",
    location: "Chicago, IL",
    status: "REJECTED",
    dateApplied: "2024-05-10",
    tags: ["Data Science", "Python", "ML"],
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "Cloud Services",
    location: "Austin, TX",
    status: "INTERVIEWING",
    dateApplied: "2024-06-10",
    tags: ["DevOps", "AWS", "CI/CD"],
  },
  {
    id: "7",
    title: "Mobile Developer",
    company: "App Creations",
    location: "Los Angeles, CA",
    status: "WITHDRAWN",
    dateApplied: "2024-05-15",
    tags: ["Mobile", "React Native", "iOS"],
  },
  {
    id: "8",
    title: "Product Manager",
    company: "Growth Solutions",
    location: "San Francisco, CA",
    status: "OFFER",
    dateApplied: "2024-05-28",
    tags: ["PM", "Agile", "Roadmap"],
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "Quality Labs",
    location: "Denver, CO",
    status: "APPLIED",
    dateApplied: "2024-06-12",
    tags: ["QA", "Automation", "Testing"],
  },
  {
    id: "10",
    title: "Cloud Architect",
    company: "Azure Nexus",
    location: "Dallas, TX",
    status: "INTERVIEWING",
    dateApplied: "2024-06-08",
    tags: ["Cloud", "Azure", "Architecture"],
  },
  {
    id: "11",
    title: "Marketing Specialist",
    company: "Brand Builders",
    location: "New York, NY",
    status: "APPLIED",
    dateApplied: "2024-06-15",
    tags: ["Marketing", "SEO", "Social Media"],
  },
  {
    id: "12",
    title: "HR Business Partner",
    company: "People First",
    location: "Remote",
    status: "REJECTED",
    dateApplied: "2024-05-01",
    tags: ["HR", "Remote", "People Ops"],
  },
  {
    id: "13",
    title: "UI/UX Lead",
    company: "Design Innovators",
    location: "San Jose, CA",
    status: "OFFER",
    dateApplied: "2024-06-03",
    tags: ["Design", "Leadership", "UI/UX"],
  },
  {
    id: "14",
    title: "Systems Administrator",
    company: "NetSec Solutions",
    location: "Boston, MA",
    status: "APPLIED",
    dateApplied: "2024-06-18",
    tags: ["SysAdmin", "Linux", "Networking"],
  },
  {
    id: "15",
    title: "Data Analyst",
    company: "Insight Corp",
    location: "Atlanta, GA",
    status: "INTERVIEWING",
    dateApplied: "2024-06-07",
    tags: ["Data", "SQL", "Dashboards"],
  },
  {
    id: "16",
    title: "Software Engineer Intern",
    company: "Innovate Solutions",
    location: "New York, NY",
    status: "APPLIED",
    dateApplied: "2024-06-20",
    tags: ["Internship", "JavaScript", "Learning"],
  },
  {
    id: "17",
    title: "Data Engineer",
    company: "DataFlow Inc.",
    location: "San Francisco, CA",
    status: "INTERVIEWING",
    dateApplied: "2024-06-19",
    tags: ["ETL", "Pipelines", "Big Data"],
  },
  {
    id: "18",
    title: "Graphic Designer",
    company: "Visual Arts Co.",
    location: "Remote",
    status: "APPLIED",
    dateApplied: "2024-06-17",
    tags: ["Design", "Photoshop", "Illustrator"],
  },
  {
    id: "19",
    title: "Project Manager",
    company: "Global Projects",
    location: "London, UK",
    status: "REJECTED",
    dateApplied: "2024-05-05",
    tags: ["PM", "International", "Scrum"],
  },
  {
    id: "20",
    title: "Network Administrator",
    company: "Connect IT",
    location: "Chicago, IL",
    status: "OFFER",
    dateApplied: "2024-06-11",
    tags: ["Networking", "IT", "SysAdmin"],
  },
  {
    id: "21",
    title: "DevRel Advocate",
    company: "DevCommunity",
    location: "Remote",
    status: "APPLIED",
    dateApplied: "2024-06-22",
    tags: ["DevRel", "Community", "Writing"],
  },
  {
    id: "22",
    title: "Security Analyst",
    company: "Secure Corp",
    location: "Washington, D.C.",
    status: "INTERVIEWING",
    dateApplied: "2024-06-16",
    tags: ["Security", "SIEM", "Compliance"],
  },
  {
    id: "23",
    title: "Content Writer",
    company: "WordCrafters",
    location: "Remote",
    status: "WITHDRAWN",
    dateApplied: "2024-05-20",
    tags: ["Writing", "Content", "Marketing"],
  },
  {
    id: "24",
    title: "Sales Executive",
    company: "SalesForce Pro",
    location: "Austin, TX",
    status: "APPLIED",
    dateApplied: "2024-06-21",
    tags: ["Sales", "CRM", "B2B"],
  },
  {
    id: "25",
    title: "Research Scientist",
    company: "BioTech Innovations",
    location: "Boston, MA",
    status: "INTERVIEWING",
    dateApplied: "2024-06-14",
    tags: ["Research", "Biotech", "Science"],
  },
  {
    id: "26",
    title: "Customer Support Rep",
    company: "HelpDesk Solutions",
    location: "Orlando, FL",
    status: "APPLIED",
    dateApplied: "2024-06-23",
    tags: ["Support", "Customer", "Tickets"],
  },
  {
    id: "27",
    title: "Financial Analyst",
    company: "Wealth Management Group",
    location: "New York, NY",
    status: "OFFER",
    dateApplied: "2024-06-09",
    tags: ["Finance", "Excel", "Investments"],
  },
  {
    id: "28",
    title: "Electrical Engineer",
    company: "Power Systems Inc.",
    location: "Houston, TX",
    status: "REJECTED",
    dateApplied: "2024-05-18",
    tags: ["Electrical", "Circuits", "Hardware"],
  },
  {
    id: "29",
    title: "Civil Engineer",
    company: "BuildRite Co.",
    location: "Seattle, WA",
    status: "APPLIED",
    dateApplied: "2024-06-24",
    tags: ["Construction", "AutoCAD", "Engineering"],
  },
  {
    id: "30",
    title: "Biomedical Scientist",
    company: "MediLabs",
    location: "San Diego, CA",
    status: "INTERVIEWING",
    dateApplied: "2024-06-13",
    tags: ["Biomedical", "Research", "Lab"],
  },
];

export default function App() {
  const [applications, setApplications] =
    useState<JobApplication[]>(allJobApplications);

  const filteredApplications = useMemo(() => {
    return applications;
  }, [applications]);

  const handleUpdateStatus = (
    id: string,
    newStatus: JobApplication["status"],
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-4 py-10">
      <Card className="flex flex-col p-5 w-[90vw] max-h-[90vh] overflow-auto items-center">
        <div className="w-[90%] mb-4">
          <SearchApplicationComponent />
        </div>
        <div className="w-full overflow-scroll">
          <JobApplicationTable
            applications={filteredApplications}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </Card>
    </div>
  );
}
