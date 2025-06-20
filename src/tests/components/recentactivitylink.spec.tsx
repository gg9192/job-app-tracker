import { render, screen } from "@testing-library/react";
import { RecentActivityLink } from "@/components/recentactivitylink";
import { vi } from "vitest";

// Mock the Badge component from the UI library to avoid rendering issues
vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe("RecentActivityLink", () => {
  it("should render the component with correct job title, company, and time", () => {
    const props = {
      jobtitle: "Software Engineer",
      activityType: "applied",
      time: "2025-06-20",
      company: "TechCorp",
    };

    render(<RecentActivityLink {...props} />);

    // Check if job title, company, and time are rendered correctly
    expect(screen.getByText(props.jobtitle)).toBeInTheDocument();
    expect(screen.getByText(props.company)).toBeInTheDocument();
    expect(screen.getByText(props.time)).toBeInTheDocument();
  });

  it("should display 'Application Submitted' for applied activity type", () => {
    const props = {
      jobtitle: "Software Engineer",
      activityType: "applied",
      time: "2025-06-20",
      company: "TechCorp",
    };

    render(<RecentActivityLink {...props} />);

    // Check if the correct display type text is shown
    expect(screen.getByText("Application Submitted")).toBeInTheDocument();
  });

  it("should display 'Interview Scheduled' for interview activity type", () => {
    const props = {
      jobtitle: "Software Engineer",
      activityType: "interview",
      time: "2025-06-20",
      company: "TechCorp",
    };

    render(<RecentActivityLink {...props} />);

    // Check if the correct display type text is shown
    expect(screen.getByText("Interview Scheduled")).toBeInTheDocument();
  });

  it("should throw an error when activityType is invalid", () => {
    const props = {
      jobtitle: "Software Engineer",
      activityType: "invalid" as "applied" | "interview",  // TypeScript will not allow this, but it's to simulate the error
      time: "2025-06-20",
      company: "TechCorp",
    };

    // This test will fail because the component will throw an error for invalid activityType
    expect(() => render(<RecentActivityLink {...props} />)).toThrowError(
      "did not recieve a valid activityType"
    );
  });
});
