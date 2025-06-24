// tests/pages/applicationFormPage.spec.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import ApplicationFormPage from "@/app/applications/new/page";
import userEvent from "@testing-library/user-event";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ApplicationFormPage", () => {
  it("steps through all stages and submits", async () => {
    render(<ApplicationFormPage />);
    const nextButton = screen.getByRole("button", { name: /next/i });

    // Step 0: fill out job description
    const jobDescInput = screen.getByLabelText("Job Description *");
    await userEvent.type(jobDescInput, "Software Engineer at Google");

    
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByLabelText("City *")).toBeInTheDocument();
    });

    // Step 1: fill out location and status
    const cityInput = screen.getByLabelText("City *");
    await userEvent.type(cityInput, "New York");

    const stateTrigger = screen.getByLabelText("State *");
    fireEvent.click(stateTrigger);
    const nyOption = await screen.findByRole("option", { name: "NY" });
    fireEvent.click(nyOption);

    const statusTrigger = screen.getByLabelText("State *");
    fireEvent.click(statusTrigger);
    const appliedOption = await screen.findByText("APPLIED");
    fireEvent.click(appliedOption);

    const submitButton = screen.getByText("Submit")
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Go back to dashboard")).toBeInTheDocument();
    });
  });
});
