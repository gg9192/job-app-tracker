import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/link";
import ButtonStyledLink from "@/components/buttonstyledlink";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

function loggedInUserDashboard() {
  return (
    <main className="p-6 space-y-6">
      {/* Top Section: Interviews and Quick Actions */}
      <section className="grid gap-6 lg:grid-cols-3">
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
              { href: "/resumes/upload", text: "Upload New Resume" },
              { href: "/experience/add", text: "Add Experience" },
            ].map((action) => (
              <ButtonStyledLink href={action.href} key={action.href}>{action.text}</ButtonStyledLink>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Search Applications */}
      <Card className="border rounded-lg shadow-sm">
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
              <svg className="w-100 h-100" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Resumes */}
      <Card className="border rounded-lg shadow-sm">
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
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>Insights & Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>You have applied to 14 jobs this month.</p>
          <p>2 interviews scheduled</p>
          <p>5 applications waiting for response</p>
        </CardContent>
      </Card>
    </main>
  );
}


export default async function LandingPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  const currentUser = await getLoggedInUser(session);
  const isLoggedIn = currentUser !== null;

  return isLoggedIn ? loggedInUserDashboard() : unauthUserLandingPage();
}
