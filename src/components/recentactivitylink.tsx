import { Badge } from "@/components/ui/badge";
import { palette } from "@/lib/theme/colors";

export function RecentActivityLink({
  jobtitle,
  activityType,
  time,
  company,
}: {
  jobtitle: string;
  activityType: "applied" | "interview";
  time: string;
  company: string;
}) {
  const getDisplayTypeText = () => {
    switch (activityType) {
      case "applied":
        return "Application Submitted";
      case "interview":
        return "Interview Scheduled";
      default:
        throw new Error("did not recieve a valid activityType");
    }
  };

  return (
    <div key={jobtitle + company} className="flex items-center gap-4">
      <div className="flex-1">
        <div
          className={`font-medium ${palette.lightText} ${palette.linkHover} transition hover:cursor-pointer`}
        >
          {jobtitle}
        </div>
        <div className="text-sm text-muted-foreground">{company}</div>
      </div>
      <div className="text-right">
        <Badge variant="secondary" className="w-40">
          {getDisplayTypeText()}
        </Badge>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
    </div>
  );
}
