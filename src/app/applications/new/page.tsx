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

const statusEnum = z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED", "WITHDRAWN"]);

const schema = z.object({
  jobdescription: z.string().min(1, "Job description is required"),
  status: statusEnum,
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  hourlyrate: z.coerce.number().nonnegative("Hourly rate must be >= 0"),
  yearlysalary: z.coerce.number().nonnegative("Yearly salary must be >= 0"),
  resumeID: z.coerce.number().optional(),
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 0) valid = await trigger(["jobdescription", "status"]);
    else if (step === 1) valid = await trigger(["city", "state"]);
    else if (step === 2) valid = await trigger(["hourlyrate", "yearlysalary"]);
    if (valid) setStep((s) => s + 1);
  };

  const canGoNext = true;
  const stepsCount = 3;

  return (
    <>
      <SteppedForm
        steps={stepsCount}
        currentStep={step}
        onBack={() => setStep((s) => Math.max(s - 1, 0))}
        onNext={nextStep}
        onSubmit={onSubmit}
        canGoNext={canGoNext}
        isLastStep={step === stepsCount - 1}
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
              <Textarea id="jobdescription" {...register("jobdescription")} />
              {errors.jobdescription && <p className="text-sm text-red-500">{errors.jobdescription.message}</p>}
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
              <Input id="state" {...register("state")} />
              {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
            className="space-y-5 w-full"
            style={{ position: "absolute", inset: 0 }}
          >
            <div>
              <Label htmlFor="hourlyrate">Hourly Rate</Label>
              <Input type="number" step="0.01" id="hourlyrate" {...register("hourlyrate")} />
              {errors.hourlyrate && <p className="text-sm text-red-500">{errors.hourlyrate.message}</p>}
            </div>
            <div>
              <Label htmlFor="yearlysalary">Yearly Salary</Label>
              <Input type="number" step="0.01" id="yearlysalary" {...register("yearlysalary")} />
              {errors.yearlysalary && <p className="text-sm text-red-500">{errors.yearlysalary.message}</p>}
            </div>
          </motion.div>
        )}
      </SteppedForm>

      <p className="mt-6 text-center text-sm">
        <Link href="/">Go back to dashboard</Link>
      </p>
    </>
  );
}
