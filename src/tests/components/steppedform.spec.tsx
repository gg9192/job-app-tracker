import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SteppedForm } from "@/components/steppedForm";

describe("SteppedForm", () => {
  it("renders title and buttons correctly", () => {
    const onBack = vi.fn();
    const onNext = vi.fn();
    const onSubmit = vi.fn();

    render(
      <SteppedForm
        steps={3}
        currentStep={0}
        onBack={onBack}
        onNext={onNext}
        onSubmit={onSubmit}
        title="Test Form"
      >
        <div>Step Content</div>
      </SteppedForm>
    );

    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeDisabled();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onNext when Next button is clicked", () => {
    const onBack = vi.fn();
    const onNext = vi.fn();
    const onSubmit = vi.fn();

    render(
      <SteppedForm
        steps={3}
        currentStep={1}
        onBack={onBack}
        onNext={onNext}
        onSubmit={onSubmit}
        title="Test Form"
      >
        <div>Step Content</div>
      </SteppedForm>
    );

    fireEvent.click(screen.getByText("Next"));
    expect(onNext).toHaveBeenCalled();
  });

  it("shows Submit button on last step and calls onSubmit", () => {
    const onBack = vi.fn();
    const onNext = vi.fn();
    const onSubmit = vi.fn();

    render(
      <SteppedForm
        steps={3}
        currentStep={2}
        onBack={onBack}
        onNext={onNext}
        onSubmit={onSubmit}
        title="Test Form"
      >
        <div>Final Step</div>
      </SteppedForm>
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
