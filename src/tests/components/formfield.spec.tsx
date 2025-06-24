import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormField from "@/components/formfield";
import { FieldError } from "react-hook-form";

describe("FormField", () => {
  it("renders label and children", () => {
    render(
      <FormField id="test" label="Test Label">
        <input id="test" />
      </FormField>
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("shows required asterisk if required is true", () => {
    render(
      <FormField id="test" label="Test Label" required>
        <input id="test" />
      </FormField>
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays error message if error is provided", () => {
    const error: FieldError = { message: "Error message", type: "required" };
    render(
      <FormField id="test" label="Test Label" error={error}>
        <input id="test" />
      </FormField>
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  it("displays a non-breaking space if no error", () => {
    render(
      <FormField id="test" label="Test Label">
        <input id="test" />
      </FormField>
    );
    const p = screen.getByText((content, element) => {
      return (
        element?.tagName === "P" &&
        element.classList.contains("text-transparent") &&
        content.trim() === ""
      );
    });
    expect(p).toBeInTheDocument();
  });
});
