    import { CalendarDays } from "lucide-react"
    import { Card } from "./ui/card"
    import { CardHeader } from "./ui/card"
    import { CardContent } from "./ui/card"
    import { Button } from "./ui/button";
    import { RecentActivityLink } from "./recentactivitylink";

    export function RecentActivityDashboardCard() {
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


        return (<Card className="col-span-1 border rounded-lg shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>Recent Activity</div>
                    {activities.length > 0 && <Button>Activity This Week</Button>}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        // @ts-ignore
                        <RecentActivityLink
                            jobtitle={activity.title}
                            activityType={activity.type}
                            time={activity.time}
                            company={activity.company}
                            key={activity.title + activity.time + activity.company}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                        <CalendarDays className="h-7 w-7 mb-4 text-gray-400" />
                        <p className="text-lg font-medium">
                            No recent activity... yet!
                        </p>
                        <p className="text-sm mt-2">
                            Submit applications or hear back from employers to see updates
                            here.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
        )
    }