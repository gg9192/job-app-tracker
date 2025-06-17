import { Card } from "@/components/ui/card"

type TodayAtAGlanceCardType = "folowup" | "prep" | "interview" | "deadline"

export function TodayAtAGlanceCard({type}: {type: TodayAtAGlanceCardType}) {
    return (<Card variant="primary">{type}</Card>)
}