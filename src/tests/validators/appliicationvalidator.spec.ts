import { describe, it, expect } from "vitest";
import { applicationSchema } from "@/lib/validators/application";

describe("applicationSchema", () => {
  it("fails with missing required fields", () => {
    const result = applicationSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.flatten().fieldErrors;
      expect(issues.jobdescription).toContain("Job description is required");
      expect(issues.city).toContain("City is required");
      expect(issues.state).toContain("State is required");
      expect(issues.status).toContain("Status is required");
    }
  });

  it("fails if compensation is not a number", () => {
    const result = applicationSchema.safeParse({
      jobdescription: "desc",
      city: "city",
      state: "state",
      status: "APPLIED",
      compensation: "abc",
      compType: "yearly"
    });
    expect(result.success).toBe(false);
  });

  it("fails if compType is missing when compensation is filled", () => {
    const result = applicationSchema.safeParse({
      jobdescription: "desc",
      city: "city",
      state: "state",
      status: "OFFER",
      compensation: "1000"
    });
    expect(result.success).toBe(false);
  });

  it("passes with all valid fields", () => {
    const result = applicationSchema.safeParse({
      jobdescription: "desc",
      city: "city",
      state: "state",
      status: "REJECTED",
      compensation: "1000.00",
      compType: "hourly"
    });
    expect(result.success).toBe(true);
  });

  it("passes if compensation is empty and compType is undefined", () => {
    const result = applicationSchema.safeParse({
      jobdescription: "desc",
      city: "city",
      state: "state",
      status: "WITHDRAWN",
      compensation: "",
    });
    expect(result.success).toBe(true);
  });
});
