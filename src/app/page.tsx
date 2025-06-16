import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";
import { PageButton } from "@/components/pageButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PageButton href="/sign-up">Get Started</PageButton>
          <PageButton href="/login">Login</PageButton>
        </div>
      </section>
    </main>
  );
}

function loggedInUserDashboard() {
  return (
    <main className="p-6 space-y-6">
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have no upcoming interviews.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <a
              href="/applications/new"
              className="block text-center px-6 py-2 border border-gray-800 text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Add New Application
            </a>
            <a
              href="/resumes/upload"
              className="block text-center px-6 py-2 border border-gray-800 text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Upload New Resume
            </a>
            <a
              href="/experience/add"
              className="block text-center px-6 py-2 border border-gray-800 text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Add Experience
            </a>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Search Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Search by company, position, or keyword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-lime-400"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Resumes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>resume_v3.pdf - Uploaded 2 days ago</li>
            <li>resume_startup_focused.pdf - Uploaded last week</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Insights & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
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
