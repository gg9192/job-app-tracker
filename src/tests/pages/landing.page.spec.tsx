import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLoggedInUser } from "@/services/userService";
import { cookies } from "next/headers";

vi.mock("@/services/userService", () => ({
  getLoggedInUser: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

describe("landing page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when user is not logged in", () => {
    beforeEach(async () => {
      (cookies as any).mockReturnValue({
        get: vi.fn().mockReturnValue(undefined),
      });
      (getLoggedInUser as any).mockResolvedValue(null);

      render(await LandingPage());
    });

    it("renders the main heading", () => {
      expect(
        screen.getByText("Organize Your Job Hunt with Confidence")
      ).toBeInTheDocument();
    });

    it("renders the description text", () => {
      expect(
        screen.getByText(
          /our job tracker helps you stay on top of every application, interview, and offer/i
        )
      ).toBeInTheDocument();
    });

    it('renders the "Get Started" button', () => {
      expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
        "href",
        "/sign-up"
      );
    });

    it('renders the "Login" button', () => {
      expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
        "href",
        "/login"
      );
    });
  });

  describe("when user is logged in", () => {
    beforeEach(async () => {
      (cookies as any).mockReturnValue({
        get: vi.fn().mockReturnValue({ value: "session-token" }),
      });
      (getLoggedInUser as any).mockResolvedValue({
        firstname: "Alex",
      });

      render(await LandingPage());
    });

    it("renders the dashboard greeting", () => {
      expect(
        screen.getAllByText((_, el) => el?.textContent === 'Welcome back Alex!').length
      ).toBeGreaterThan(0);
    });

    it("renders the Search Applications section", () => {
      expect(screen.getByText("Search Applications")).toBeInTheDocument();
    });

    it("renders the Quick Actions section", () => {
      expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    });
  });
});
