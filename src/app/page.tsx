import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/link";
import ButtonStyledLink from "@/components/buttonstyledlink";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JobBoardLogoDisplay } from "@/components/jobboardlogodisplay";
import { JobBoards } from "@/components/jobboardlogodisplay";
import { Badge } from "@/components/ui/badge";


function getRandomPhrase(): string {
  const phrases = [
    "Let’s get that bread.",
    "Job hunt mode: activated.",
    "Another day, another application.",
    "You're one click away from your next opportunity.",
    "May the offers be ever in your favor.",
    "Applying is a full-time job.",
    "Keep calm and tailor your resume.",
    "Rejection is redirection.",
    "You're doing better than you think.",
    "Stay sharp, stay hired.",
    "Coffee. Resume. Apply. Repeat.",
    "Your future employer is out there.",
    "Hit send like you mean it.",
    "The grind never looked this good.",
    "Work smarter, apply faster.",
    "Dream job loading..."
  ];

  return phrases[Math.floor(Math.random() * phrases.length)];
}

function getRandomJobHuntCompliment(): string {
  const compliments = [
    "You're making great strides in your job search!",
    "Your persistence is really paying off!",
    "Each step you're taking is getting you closer!",
    "You're handling this job hunt like a pro!",
    "Impressive momentum, keep it going!",
    "You're doing all the right things. It's only a matter of time!",
    "Your preparation and effort are showing!",
    "The way you’re tackling your job search is inspiring!"
  ];
  const index = Math.floor(Math.random() * compliments.length);
  return compliments[index];
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

function loggedInUserDashboard(firstName: String) {

  const activities = [
    {
      id: 1,
      company: "TechCorp",
      title: "Frontend Developer",
      type: "Application Submitted",
      time: "2 hours ago",
    },
    {
      id: 2,
      company: "Innova Inc.",
      title: "UI/UX Designer",
      type: "Interview Scheduled",
      time: "Yesterday",
      logo: "https://logo.clearbit.com/innovainc.com",
    },
  ];


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
          <CardContent>{getRandomPhrase()}</CardContent>
        </Card>

        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>Job Boards</CardHeader>
          <CardContent className="flex flex-row justify-between">
            {(["linkedin", "indeed", "monster", "glassdoor"] as JobBoards[]).map((element) => (<JobBoardLogoDisplay jobBoardType={element} key={element}></JobBoardLogoDisplay>))}
          </CardContent>
        </Card>

        <Card className="col-span-1 border rounded-lg shadow-sm">
          <CardHeader>Recent Activity</CardHeader>
          <CardContent className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                
                <div className="flex-1">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.company}</div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{activity.type}</Badge>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
          
        </Card>

        {/* Interviews and Quick Actions */}
        <Card className="col-span-2 border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have no upcoming interviews.</p>
          </CardContent>
        </Card>

        <Card className="border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col">
            {[
              { href: "/applications/new", text: "Add New Application" },
              { href: "/resumes/upload", text: "View My Applications" },
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
