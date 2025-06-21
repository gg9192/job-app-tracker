import { CalendarDays } from "lucide-react";
import { DashboardUpcomingInterviewComponent } from "./dashboardupcominginterviewLineItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function UpcomingInterviewsDashboardComponent() {
  interface Interview {
    id: number;
    jobTitle: string;
    company: string;
    date: string;
    time: string;
    type: string;
  }

  const fakeUpcomingInterviews: Interview[] = [
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Innovate Solutions",
      date: "Tomorrow, June 18th",
      time: "10:00 AM PST",
      type: "Video Call (Google Meet)",
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "Global Tech",
      date: "Friday, June 20th",
      time: "3:30 PM EST",
      type: "On-site Interview",
    },
    {
      id: 3,
      jobTitle: "Data Scientist",
      company: "Quantify Labs",
      date: "Monday, June 23rd",
      time: "11:00 AM CST",
      type: "Phone Screen",
    },
    {
      id: 4,
      jobTitle: "DevOps Engineer",
      company: "CloudCore",
      date: "Wednesday, June 25th",
      time: "1:00 PM EST",
      type: "Technical Interview (Zoom)",
    },
    {
      id: 5,
      jobTitle: "UX Researcher",
      company: "UserFirst Design",
      date: "Friday, June 27th",
      time: "9:00 AM PST",
      type: "Portfolio Review",
    },
  ];

  const upcomingInterviewsToDisplay = fakeUpcomingInterviews; // Change to noUpcomingInterviews to test empty state

  const maxInterviewsToShow = 2; // Number of interviews to show initially
  const hasMoreInterviews =
    upcomingInterviewsToDisplay.length > maxInterviewsToShow;
  const interviewsToShow = upcomingInterviewsToDisplay.slice(
    0,
    maxInterviewsToShow,
  );

  return (
    <Card className="col-span-1 border rounded-lg shadow-sm">
      <CardHeader>
        <CardTitle>
          {hasMoreInterviews ? (
            <div className="flex items-center justify-between">
              <div>Upcoming Interviews</div>
              <Button>All Up Coming Interviews</Button>
            </div>
          ) : (
            <div>Upcoming Interviews</div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interviewsToShow.length > 0 ? (
          <>
            {interviewsToShow.map((interview) => (
              <DashboardUpcomingInterviewComponent
                jobtitle={interview.jobTitle}
                company={interview.company}
                date={interview.date}
                time={interview.time}
                type={interview.type}
                key={interview.company + interview.date + interview.time}
              ></DashboardUpcomingInterviewComponent>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <CalendarDays className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-lg font-medium">
              No upcoming interviews... yet!
            </p>
            <p className="text-sm mt-2">Time to boost your applications!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
