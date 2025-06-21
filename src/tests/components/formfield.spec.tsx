import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FormField from "@/components/formfield";

describe("FormField", () => {
  it("renders children correctly", () => {
    render(
      <FormField>
        <input type="text" placeholder="Name" />
      </FormField>
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    render(
      <FormField error={{ message: "Required", type: "required" }}>
        <input type="text" />
      </FormField>
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("Required")).toHaveClass("text-red-500");
  });
  
});
