import { CalendarDays, BriefcaseBusiness } from "lucide-react"; // Example icons, you might need to install 'lucide-react'
import { Link } from "./link";

export function DashboardUpcomingInterviewComponent({
  jobtitle,
  company,
  date,
  time,
  type,
}: {
  jobtitle: string;
  company: string;
  date: string;
  time: string;
  type: string;
}) {
  return (
    <div className="border-b last:border-b-0 pb-3 last:pb-0">
      <Link href="/">
        <h3 className="font-semibold text-base">
          {jobtitle} at {company}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground flex items-center mt-1">
        <CalendarDays className="h-4 w-4 mr-2" /> {date}, {time}
      </p>
      <p className="text-sm text-muted-foreground flex items-center">
        <BriefcaseBusiness className="h-4 w-4 mr-2" /> {type}
      </p>
    </div>
  );
}
