"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/components/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const statusEnum = z.enum([
  "APPLIED",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
]);

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
    formState: { errors },
    trigger,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  const nextStep = async () => {
    let valid = false;
    console.log('here')
    if (step === 0) {
      valid = await trigger(["jobdescription", "applicationdate", "status"]);
    } else if (step === 1) {
      valid = await trigger(["city", "state"]);
    } else if (step === 2) {
      valid = await trigger(["hourlyrate", "yearlysalary"]);
    }
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const progressPercent = ((step + 1) / 3) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          New Job Application
        </h1>

        <Progress value={progressPercent} className={`h-2 mb-6`} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {step === 0 && (
            <>
              <div>
                <Label htmlFor="jobdescription">Job Description</Label>
                <Textarea id="jobdescription" {...register("jobdescription")} />
                {errors.jobdescription && (
                  <p className="text-sm text-red-500">
                    {errors.jobdescription.message}
                  </p>
                )}
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
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register("state")} />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label htmlFor="hourlyrate">Hourly Rate</Label>
                <Input
                  id="hourlyrate"
                  type="number"
                  step="0.01"
                  {...register("hourlyrate")}
                />
                {errors.hourlyrate && (
                  <p className="text-sm text-red-500">
                    {errors.hourlyrate.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="yearlysalary">Yearly Salary</Label>
                <Input
                  id="yearlysalary"
                  type="number"
                  step="0.01"
                  {...register("yearlysalary")}
                />
                {errors.yearlysalary && (
                  <p className="text-sm text-red-500">
                    {errors.yearlysalary.message}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="flex justify-between">
              <Button onClick={prevStep} type="button" disabled={step === 0}>
                Back
              </Button>
            {step < 2 && (
              <Button onClick={nextStep} type="button">
                Next
              </Button>
            )}
            {step === 2 && (
              <Button type="submit" className="ml-auto">
                Submit Application
              </Button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/">Go back to dashboard</Link>
        </p>
      </Card>
    </div>
  );
}
