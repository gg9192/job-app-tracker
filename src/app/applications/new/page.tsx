"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Link } from "@/components/link";
import { SteppedForm } from "@/components/steppedForm";
import CompensationInputBox from "@/components/compensationInputBox";
import FormField from "@/components/formfield";

const statusEnum = z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED", "WITHDRAWN"]);

const compTypeEnum = z.enum(["hourly", "yearly"]);

const schema = z.object({
  jobdescription: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: statusEnum.optional(),
  compensation: z.string().optional(),
  compType: compTypeEnum.optional(),
  resume: z.custom<File>().optional(),
}).superRefine((data, ctx) => {
  if (!data.jobdescription || data.jobdescription.trim() === "") {
    ctx.addIssue({ path: ["jobdescription"], message: "Job description is required", code: "custom" });
  }
  if (!data.city || data.city.trim() === "") {
    ctx.addIssue({ path: ["city"], message: "City is required", code: "custom" });
  }
  if (!data.state || data.state.trim() === "") {
    ctx.addIssue({ path: ["state"], message: "State is required", code: "custom" });
  }
  if (!data.status || data.status.trim() === "") {
    ctx.addIssue({ path: ["status"], message: "Status is required", code: "custom" });
  }
  if (data.compensation !== "" && data.compType === undefined) {
    ctx.addIssue({ path: ["compensation"], message: "Please select a compensation type", code: "custom" });
  }
  const match = data.compensation?.match(/^\d+(\.\d{2})?$/);
  const isValid = data.compensation === "" || match !== null
  if (!isValid) {
    ctx.addIssue({ path: ["compensation"], message: "Please enter a valid amount", code: "custom" });
  }
});

type FormData = z.infer<typeof schema>;

export default function ApplicationFormPage() {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 0) valid = await trigger(["jobdescription"]);
    else if (step === 1) valid = await trigger(["city", "state", "status", "compensation", "compType"]);
    else valid = true
    if (valid) setStep((s) => s + 1);
  };

  const stepsCount = 2;

  return (
    <>
      <SteppedForm
        steps={stepsCount}
        currentStep={step}
        onBack={() => setStep((s) => Math.max(s - 1, 0))}
        onNext={nextStep}
        onSubmit={onSubmit}
        title="New Job Application"
        footer={
          <p className="text-center text-sm">
            <Link href="/">Go back to dashboard</Link>
          </p>
        }
      >
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
            className="space-y-5 w-full"
            style={{ position: "absolute", inset: 0 }}
          >
            <div>

              <FormField
                error={errors.jobdescription}>
                <Label htmlFor="jobdescription">Job Description</Label>
                <Textarea id="jobdescription" className="overflow-y-auto h-50 resize-none" {...register("jobdescription")} />
              </FormField>
              <Label htmlFor="resume" className="mt-4">Upload Your Resume</Label>
              <Input id="resume" type="file"/>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
            className="space-y-5 w-full"
            style={{ position: "absolute", inset: 0 }}
          >
            <div>
              <Label htmlFor="city">City</Label>
              <FormField
                error={errors.city}
              >
                <Input id="city" {...register("city")} />
              </FormField>
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <FormField
                error={errors.state}
              >
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateAbbreviations.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <FormField
                error={errors.status}
              >
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusEnum.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>
            <div>
              <Label htmlFor="compensation">Compensation</Label>
              <FormField
                error={errors.compensation}
              >
                <CompensationInputBox register={register} field="compensation" control={control}></CompensationInputBox>
              </FormField>
            </div>
          </motion.div>
        )}
      </SteppedForm>
    </>
  );
}
