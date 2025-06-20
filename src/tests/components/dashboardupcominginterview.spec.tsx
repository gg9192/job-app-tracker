// UpcomingInterviewsDashboardComponent.spec.tsx
import { render, screen } from "@testing-library/react";
import UpcomingInterviewsDashboardComponent from "@/components/dashboardupcominginterviews";
import { describe, it, expect, vi } from "vitest";

// mock the nested child component
vi.mock("@/components/dashboardupcominginterviewLineItem", () => ({
  DashboardUpcomingInterviewComponent: ({ jobtitle }: any) => <div>{jobtitle}</div>,
}));

describe("UpcomingInterviewsDashboardComponent", () => {
  it("renders the correct number of upcoming interviews (max 2)", () => {
    render(<UpcomingInterviewsDashboardComponent />);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Product Manager")).toBeInTheDocument();
  });

  it('renders the "All Up Coming Interviews" button when there are more than 2 interviews', () => {
    render(<UpcomingInterviewsDashboardComponent />);
    expect(screen.getByText("All Up Coming Interviews")).toBeInTheDocument();
  });

  it("does not render the empty state message", () => {
    render(<UpcomingInterviewsDashboardComponent />);
    expect(
      screen.queryByText("No upcoming interviews... yet!")
    ).not.toBeInTheDocument();
  });
});
