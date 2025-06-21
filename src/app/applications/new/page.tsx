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

const statusEnum = z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED", "WITHDRAWN"]);

const schema = z.object({
  jobdescription: z.string().min(1, "Job description is required"),
  status: statusEnum,
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  compensation: z.coerce.number().min(0, "Compensation must be >= 0"),
  resume: z
    .custom<File>()
    .optional()
    .refine(
      (file) => file === undefined || file instanceof File,
      "Resume must be a file"
    ),
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
    else if (step === 1) valid = await trigger(["city", "state", "status", "compensation"]);
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
              <Label htmlFor="jobdescription">Job Description</Label>
              <Textarea id="jobdescription" className="overflow-y-auto h-80 resize-none" {...register("jobdescription")} />
              {errors.jobdescription && <p className="text-sm text-red-500">{errors.jobdescription.message}</p>}
            </div>
            <p className="text-center text-sm">
              <Link href="/">Go back to dashboard</Link>
            </p>
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
              <Input id="city" {...register("city")} />
              {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="state">State</Label>
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
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
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
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>
            <div>
              <Label htmlFor="compensation">Compensation</Label>
              <CompensationInputBox register={register} field="compensation" ></CompensationInputBox>
              {errors.compensation && <p className="text-sm text-red-500">{errors.compensation.message}</p>}
            </div>
            <p className="text-center text-sm">
              <Link href="/">Go back to dashboard</Link>
            </p>
          </motion.div>
        )}


      </SteppedForm>


    </>
  );
}
