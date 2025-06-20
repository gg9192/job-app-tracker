import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ButtonStyledLink from "@/components/buttonstyledlink";

vi.mock("next/link", () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

describe("ButtonStyledLink", () => {
  it("renders a link with button text", () => {
    render(<ButtonStyledLink href="/test">Click Me</ButtonStyledLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveTextContent("Click Me");
  });
});
