import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DashboardUpcomingInterviewComponent } from "@/components/dashboardupcominginterviewLineItem";

vi.mock("lucide-react", () => ({
  CalendarDays: () => <svg data-testid="calendar-icon" />,
  BriefcaseBusiness: () => <svg data-testid="briefcase-icon" />,
}));

vi.mock("@/components/link", () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("DashboardUpcomingInterviewComponent", () => {
  it("renders job info", () => {
    render(
      <DashboardUpcomingInterviewComponent
        jobtitle="Software Engineer"
        company="TechCorp"
        date="2025-07-01"
        time="10:00 AM"
        type="Phone Interview"
      />
    );

    expect(screen.getByText("Software Engineer at TechCorp")).toBeInTheDocument();
    expect(screen.getByText("2025-07-01, 10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Phone Interview")).toBeInTheDocument();
    expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
  });
});
