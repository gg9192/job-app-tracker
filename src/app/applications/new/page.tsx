"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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
import { SteppedForm, SteppedFormMotionDiv } from "@/components/steppedForm";
import CompensationInputBox from "@/components/compensationInputBox";
import FormField from "@/components/formfield";


import {
  applicationSchema,
  FormData,
  statusEnum,
} from "@/lib/validators/application";

export default function ApplicationFormPage() {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(applicationSchema),
    mode: "all",
  });

  const stateAbbreviations = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 0) valid = await trigger(["jobdescription","compensation", "compType"]);
    else if (step === 1)
      valid = await trigger([
        "city",
        "state",
        "status",
        "compensation",
        "compType",
      ]);
    else valid = true;
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
          <SteppedFormMotionDiv step={0}>
            <div>
              <FormField
                id="jobdesc"
                error={errors.jobdescription}
                label="Job Description"
                required={true}
              >
                <Textarea
                  id="jobdesc"
                  className="overflow-y-auto h-50 resize-none"
                  {...register("jobdescription")}
                />
              </FormField>
            </div>
            <div>
              <FormField error={errors.compensation} id="compensation" label="Compensation">
                <CompensationInputBox
                  register={register}
                  field="compensation"
                  control={control}
                  trigger={trigger}
                ></CompensationInputBox>
              </FormField>
            </div>
          </SteppedFormMotionDiv>
        )}

        {step === 1 && (
          <SteppedFormMotionDiv step={1}>
            <div>
              <FormField error={errors.city} label="City" id="city" required={true}>
                <Input {...register("city")} id="city"/>
              </FormField>
            </div>
            <div>
              <FormField error={errors.state} label="State" id="state" required={true}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full" id="state">
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
              <FormField error={errors.status} id="status" label="Status" required={true}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full" id="status">
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
          </SteppedFormMotionDiv>
        )}
      </SteppedForm>
    </>
  );
}
