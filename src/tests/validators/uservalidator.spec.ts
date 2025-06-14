import { describe, it, expect } from "vitest";
import { userSchema } from "@/lib/validators/user";

describe("userSchema", () => {
  it("should pass with valid data", () => {
    const validData = {
      firstname: "Alex",
      lastname: "Guo",
      email: "alex@example.com",
      password: "Passw0rd!",
    };
    expect(() => userSchema.parse(validData)).not.toThrow();
  });

  it("should fail when firstname is empty", () => {
    const invalidData = {
      firstname: "",
      lastname: "Guo",
      email: "alex@example.com",
      password: "Passw0rd!",
    };
    expect(() => userSchema.parse(invalidData)).toThrow("First name is required");
  });

  it("should fail with invalid email", () => {
    const invalidData = {
      firstname: "Alex",
      lastname: "Guo",
      email: "alex-at-example.com",
      password: "Passw0rd!",
    };
    expect(() => userSchema.parse(invalidData)).toThrow("Invalid email address");
  });

  it("should fail with weak password", () => {
    const invalidData = {
      firstname: "Alex",
      lastname: "Guo",
      email: "alex@example.com",
      password: "password",
    };
    expect(() => userSchema.parse(invalidData)).toThrow();
  });
});
