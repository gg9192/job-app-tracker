"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validators/user";
import { PasswordInput } from "@/components/passwordinput";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Link } from "@/components/link";
import FormField from "@/components/formfield";
import { SteppedForm, SteppedFormMotionDiv } from "@/components/steppedForm";

const clientUserSchema = userSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ClientUserSchema = z.infer<typeof clientUserSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ClientUserSchema>({
    resolver: zodResolver(clientUserSchema),
  });

  const router = useRouter();
  const [step, setStep] = useState(0);

  const onSubmit = handleSubmit(async (data: ClientUserSchema) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      if (res.status === 409) {
        toast.error("That email is already in use!");
        return;
      }
      if (res.status === 500) {
        toast.error("Something went wrong on our end!");
        return;
      }
    }
    toast.success("Your account was created.");
    router.push("/login");
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 0) {
      valid = await trigger(["firstname", "lastname", "email"]);
    }
    if (step === stepsCount - 1) valid = false;
    if (valid) setStep((s) => s + 1);
  };

  const stepsCount = 2;

  return (
    <SteppedForm
      steps={stepsCount}
      currentStep={step}
      onBack={() => setStep((s) => Math.max(s - 1, 0))}
      onNext={nextStep}
      onSubmit={onSubmit}
      title="Sign Up"
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
              id="firstname"
              label="First Name"
              error={errors.firstname}
              required={true}
            >
              <Input
                id="firstname"
                placeholder="First name"
                {...register("firstname")}
              />
            </FormField>
          </div>
          <div>
            <FormField
              id="lastname"
              label="Last Name"
              error={errors.lastname}
              required={true}
            >
              <Input
                id="lastname"
                placeholder="Last name"
                {...register("lastname")}
              />
            </FormField>
          </div>
          <div>
            <FormField
              id="email"
              label="Email"
              error={errors.email}
              required={true}
            >
              <Input
                id="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </FormField>
          </div>
        </SteppedFormMotionDiv>
      )}

      {step === 1 && (
        <SteppedFormMotionDiv step={1}>
          <div>
            <FormField label="Password" error={errors.password} id="password">
              <PasswordInput
                placeholder="••••••••"
                id="password"
                {...register("password")}
              />
            </FormField>
          </div>
          <div>
            <FormField
              label="Confirm Password"
              error={errors.confirmPassword}
              id="passwordconfirm"
            >
              <PasswordInput
                id="passwordconfirm"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
            </FormField>
          </div>
          <div>
            <FormField label="Upload Resume" id="resume">
              <Input type="file" id="resume" />
            </FormField>
          </div>
        </SteppedFormMotionDiv>
      )}
    </SteppedForm>
  );
}
