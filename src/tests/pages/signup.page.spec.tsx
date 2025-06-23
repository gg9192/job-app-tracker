import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "@/app/sign-up/page";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Add this import

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/lib/validators/user", async () => {
  const z = await import("zod");
  return {
    userSchema: z.object({
      firstname: z.string().min(1),
      lastname: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    }),
  };
});

global.fetch = vi.fn();

const pushMock = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  vi.mocked(useRouter).mockReturnValue({
    push: pushMock,
    prefetch: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  });
});


describe("SignUpPage", () => {
  it("renders step 0 fields", () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it("navigates to step 1 with valid input", async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Guo" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "alex@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => expect(screen.getAllByLabelText(/Password/i).length).greaterThan(0));
  });

  it("submits form and calls fetch", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({ ok: true, status: 200 })
    ) as any);

    render(<SignUpPage />);

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Alex" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Guo" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "alex@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() =>
      expect(screen.getByLabelText("Password")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "testpass123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "testpass123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/signup"),
        expect.objectContaining({
          method: "POST",
        })
      )
    );

    expect(toast.success).toHaveBeenCalledWith("Your account was created.");
    expect(pushMock).toHaveBeenCalledWith("/login"); // Changed from 'push' to 'pushMock'
  });
});