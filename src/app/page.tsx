import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/link";
import ButtonStyledLink from "@/components/buttonstyledlink";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobBoardLogoDisplay } from "@/components/jobboardlogodisplay";
import { JobBoards } from "@/components/jobboardlogodisplay";
import { RecentActivityLink } from "@/components/recentactivitylink";
import { CalendarDays } from 'lucide-react'; // Example icons, you might need to install 'lucide-react'
import { DashboardUpcomingInterviewComponent } from "@/components/dashboardupcominginterview";

// --- Existing Functions (Copy-pasted for completeness, no changes here) ---
function getRandomPhrase(): string {
  const phrases = [
    "Let’s get that bread!",
    "Job hunt mode: activated!",
    "Another day, another application!",
    "You're one click away from your next opportunity!",
    "May the offers be ever in your favor!",
    "Applying is a full-time job!",
    "Keep calm and tailor your resume!",
    "Rejection is redirection!",
    "You're doing better than you think!",
    "Stay sharp, stay hired!",
    "Coffee. Resume. Apply. Repeat!",
    "Your future employer is out there!",
    "Hit send like you mean it!",
    "The grind never looked this good!",
    "Work smarter, apply faster!",
    "Dream job loading..."
  ];

  return phrases[Math.floor(Math.random() * phrases.length)];
}

function getRandomJobSearchTip(): string {
  const tips: string[] = [
    "Customize your LinkedIn headline to reflect your target role, not just your current job.",
    "Use metrics and outcomes in your resume (e.g., 'Increased sales by 35% in 6 months').",
    "Create a personal website or portfolio to showcase your work—especially in creative or technical fields.",
    "Informational interviews can be more valuable than job applications. Reach out to people in roles you admire.",
    "Google yourself and clean up your digital footprint—employers often search your name.",
    "Write a short elevator pitch about yourself and rehearse it for networking events.",
    "Set up a job search routine with specific daily or weekly goals to maintain momentum.",
    "Use advanced search filters on LinkedIn and job boards to uncover hidden opportunities.",
    "Research company culture on sites like Glassdoor before applying or interviewing.",
    "Attend industry meetups, webinars, or virtual conferences to make connections.",
    "Track your applications with a spreadsheet or tool to avoid duplicate submissions or missed follow-ups.",
    "Highlight transferable skills when switching industries or roles—frame them in the employer's language.",
    "Use your email signature to link to your resume or LinkedIn profile when networking.",
    "Volunteer for projects or nonprofits to fill employment gaps and expand your network.",
    "Ask mentors or colleagues for constructive feedback on your resume and interview style.",
    "Create a job-specific resume bank for different industries or roles you’re targeting.",
    "Follow companies you're interested in on social media to stay updated on their openings.",
    "Learn basic ATS (Applicant Tracking System) formatting rules to ensure your resume gets seen.",
    "If you’re stuck, try reverse-engineering job descriptions—what skills keep appearing?",
    "Keep a brag file—document accomplishments as they happen to reference them later.",
    "Start a blog or write on LinkedIn about topics relevant to your field to demonstrate thought leadership.",
    "Record yourself answering interview questions to identify areas for improvement.",
    "Send speculative applications—even if no job is posted—especially at startups or small companies.",
    "Revisit and refine your resume every few weeks, even while you're applying.",
    "Turn rejections into insight: ask for feedback whenever possible.",
    "Make sure your resume filename includes your name and the word 'resume' for clarity (e.g., 'John_Doe_Resume.pdf').",
    "Use action verbs in your resume (e.g., Led, Developed, Implemented) to make your achievements stand out.",
    "Don’t rely only on big job boards—check niche sites relevant to your industry.",
    "Schedule your job searching and breaks to avoid burnout.",
    "Prepare stories using the STAR method (Situation, Task, Action, Result) for behavioral interview questions."
  ];

  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
}

function unauthUserLandingPage() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center px-4">
      <section className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight drop-shadow-md">
          Organize Your Job Hunt with Confidence
        </h1>
        <p className="text-lg mb-8 text-white/90 drop-shadow-sm">
          Our job tracker helps you stay on top of every application, interview,
          and offer: beautifully and efficiently.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4">
          <Link href="/sign-up" size="xl">Get Started</Link>
          <Link href="/login" size="xl">Login</Link>
        </div>
      </section>
    </main>
  );
}

// --- New/Modified Code for Upcoming Interviews ---
interface Interview {
  id: number;
  jobTitle: string;
  company: string;
  date: string; // e.g., "June 25th"
  time: string; // e.g., "2:00 PM EST"
  type: string; // e.g., "Video Call (Zoom)", "On-site"
}

function loggedInUserDashboard(firstName: String) {

  const activities = [
    {
      id: 1,
      company: "TechCorp",
      title: "Frontend Developer",
      type: "applied",
      time: "2 hours ago",
    },
    {
      company: "Innova Inc.",
      title: "UI/UX Designer",
      type: "interview",
      time: "Yesterday",
    },
  ];

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
  const hasMoreInterviews = upcomingInterviewsToDisplay.length > maxInterviewsToShow;
  const interviewsToShow = upcomingInterviewsToDisplay.slice(0, maxInterviewsToShow);


  return (
    <main className="p-6 space-y-6">
      {/* Welcome Banner */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>
            <div>
              Welcome back <strong>{firstName}</strong>!
            </div>
          </CardHeader>
          <CardContent>
            <h1>{getRandomPhrase()}</h1>
            <div className="mt-4 text-sm text-muted-foreground">
              Tip of the day: {getRandomJobSearchTip()}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>Job Boards</CardHeader>
          <CardContent className="flex flex-row justify-between items-center">
            {(["linkedin", "indeed", "monster", "glassdoor"] as JobBoards[]).map((element) => (<JobBoardLogoDisplay jobBoardType={element} key={element}></JobBoardLogoDisplay>))}
          </CardContent>
        </Card>

        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>Recent Activity</div>
              <Button>Activity This Week</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              // @ts-ignore
              <RecentActivityLink jobtitle={activity.title} activityType={activity.type} time={activity.time} company={activity.company} key={activity.title + activity.time + activity.company}></RecentActivityLink>
            ))}
          </CardContent>
        </Card>

        {/* Interviews and Quick Actions */}
        <Card className="col-span-2 border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>{hasMoreInterviews ? (<div className="flex items-center justify-between">
              <div>Upcoming Interviews</div>
              <Button>All Up Coming Interviews</Button>
            </div>) : (<div>Upcoming Interviews</div>)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interviewsToShow.length > 0 ? (
              <>
                {interviewsToShow.map((interview) => (
                  <DashboardUpcomingInterviewComponent jobtitle={interview.jobTitle} company={interview.company} date={interview.date} time={interview.time} type={interview.type} key={interview.company + interview.date + interview.time}></DashboardUpcomingInterviewComponent>
                ))}

              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <CalendarDays className="h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg font-medium">No upcoming interviews... yet!</p>
                <p className="text-sm mt-2">Time to boost your applications!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col pt-5">
              {[
              { href: "/applications/new", text: "Add New Application" },
              { href: "/resumes/upload", text: "View My Applications" }, // Changed this to make more sense
              { href: "/experience/add", text: "Add Experience" },
            ].map((action) => (
              <ButtonStyledLink href={action.href} key={action.href}>{action.text}</ButtonStyledLink>
            ))}
          </CardContent>
        </Card>
        {/* Search Applications */}
        <Card className="border rounded-lg shadow-sm col-span-3">
          <CardHeader>
            <CardTitle>Search Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-column">
              <Input
                type="text"
                placeholder="Search by company, position, or keyword"
                className="h-10"
              />
              <Button className="ml-4 h-10 w-10">
                <svg className="w-100 h-100" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Resumes */}
        <Card className="border rounded-lg shadow-sm col-span-1">
          <CardHeader>
            <CardTitle>Recent Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>resume_v3.pdf - Uploaded 2 days ago</li>
              <li>resume_startup_focused.pdf - Uploaded last week</li>
            </ul>
          </CardContent>
        </Card>

        {/* Insights & Analytics */}
        <Card className="border rounded-lg shadow-sm col-span-2">
          <CardHeader>
            <CardTitle>Insights & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>You have applied to 14 jobs this month.</p>
            <p>2 interviews scheduled</p>
            <p>5 applications waiting for response</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}


export default async function LandingPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const currentUser = await getLoggedInUser(session);
  const isLoggedIn = currentUser !== null;

  return isLoggedIn ? loggedInUserDashboard(currentUser.firstname) : unauthUserLandingPage();
}