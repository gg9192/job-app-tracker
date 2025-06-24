import { z } from "zod";

export const statusEnum = z.enum([
  "APPLIED",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
]);

const compTypeEnum = z.enum(["hourly", "yearly"]);

export const applicationSchema = z
  .object({
    jobdescription: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    status: statusEnum.optional(),
    compensation: z.string().optional(),
    compType: compTypeEnum.optional(),
    resume: z.custom<File>().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.jobdescription || data.jobdescription.trim() === "") {
      ctx.addIssue({
        path: ["jobdescription"],
        message: "Job description is required",
        code: "custom",
      });
    }
    if (!data.city || data.city.trim() === "") {
      ctx.addIssue({
        path: ["city"],
        message: "City is required",
        code: "custom",
      });
    }
    if (!data.state || data.state.trim() === "") {
      ctx.addIssue({
        path: ["state"],
        message: "State is required",
        code: "custom",
      });
    }
    if (!data.status || data.status.trim() === "") {
      ctx.addIssue({
        path: ["status"],
        message: "Status is required",
        code: "custom",
      });
    }
    if (data.compensation !== "" && data.compType === undefined) {
      ctx.addIssue({
        path: ["compensation"],
        message: "Please select a compensation type",
        code: "custom",
      });
    }
    const match = data.compensation?.match(/^\d+(\.\d{2})?$/);
    const isValid = data.compensation === "" || match !== null;
    if (!isValid) {
      ctx.addIssue({
        path: ["compensation"],
        message: "Please enter a valid amount",
        code: "custom",
      });
    }
  });

export type FormData = z.infer<typeof applicationSchema>;
