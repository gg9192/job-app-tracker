import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/logout/route";
import * as userService from "@/services/userService";

const mockGet = vi.fn();

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: mockGet,
  })),
}));

vi.mock("@/services/userService", () => ({
  logout: vi.fn(),
}));

describe("POST logout handler", () => {
  beforeEach(() => {
    mockGet.mockReset();
    userService.logout.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("logs out successfully and clears session cookie", async () => {
    mockGet.mockReturnValue({ value: "session-token" });
    (userService.logout as any).mockResolvedValue(undefined);

    const response = await POST(new Request("http://localhost"));

    expect(userService.logout).toHaveBeenCalledWith("session-token");
    expect(response.status).toBe(200);
    expect(response.headers.get("Set-Cookie")).toContain("Max-Age=0");
  });

  it("handles errors gracefully", async () => {
    mockGet.mockReturnValue({ value: "session-token" });
    (userService.logout as any).mockRejectedValue(new Error("fail"));

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const response = await POST(new Request("http://localhost"));

    expect(consoleSpy).toHaveBeenCalledWith(
      "Caught an error trying to log out",
      expect.any(Error)
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Set-Cookie")).toBeNull();

    consoleSpy.mockRestore();
  });
});
