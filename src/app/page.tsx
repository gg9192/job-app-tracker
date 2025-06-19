import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/components/link";
import ButtonStyledLink from "@/components/buttonstyledlink";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobBoardLogoDisplay } from "@/components/jobboardlogodisplay";
import { JobBoards } from "@/components/jobboardlogodisplay";
import UpcomingInterviewsDashboardComponent from "@/components/dashboardupcominginterviews";
import { RecentActivityDashboardCard } from "@/components/RecentActivityDashboardCard";
import { SearchApplicationComponent } from "@/components/searchApplicationsComponent";

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
    "Dream job loading...",
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
    "Prepare stories using the STAR method (Situation, Task, Action, Result) for behavioral interview questions.",
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
          <Link href="/sign-up" size="xl">
            Get Started
          </Link>
          <Link href="/login" size="xl">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

interface Interview {
  id: number;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  type: string;
}

function loggedInUserDashboard(firstName: String) {

  return (
    <main className="p-6 space-y-6">
      {/* Search Applications */}
      <Card className="border rounded-lg shadow-sm col-span-3">
        <CardHeader>
          <CardTitle>Search Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchApplicationComponent></SearchApplicationComponent>
        </CardContent>
      </Card>
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

        {/* Quick Actions */}
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
              <ButtonStyledLink href={action.href} key={action.href}>
                {action.text}
              </ButtonStyledLink>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <UpcomingInterviewsDashboardComponent></UpcomingInterviewsDashboardComponent>

        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>Job Boards</CardHeader>
          <CardContent className="flex flex-row justify-between items-center">
            {(
              ["linkedin", "indeed", "monster", "glassdoor"] as JobBoards[]
            ).map((element) => (
              <JobBoardLogoDisplay
                jobBoardType={element}
                key={element}
              ></JobBoardLogoDisplay>
            ))}
          </CardContent>
        </Card>

        <RecentActivityDashboardCard></RecentActivityDashboardCard>

        {/* Insights & Analytics */}
        <Card className="border rounded-lg shadow-sm col-span-1">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                  <div>Insights & Analytics</div>
                  <Button>View All Analytics</Button>
                </div>
            </CardTitle>
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

  return isLoggedIn
    ? loggedInUserDashboard(currentUser.firstname)
    : unauthUserLandingPage();
}
