"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userSchema } from "@/lib/validators/user";
import { PasswordInput } from "@/components/passwordinput";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Link } from "@/components/link";
import FormField from "@/components/formfield";
import { SteppedForm } from "@/components/steppedForm";

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
    if (step === 0) {valid = await trigger(["firstname", "lastname", "email"])}
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
              label="First Name"
              error={errors.firstname}
              required={true}
            >
              <Input
                placeholder="First name"
                {...register("firstname")}
              />
            </FormField>
          </div>
          <div>
            <FormField
              label="Last Name"
              error={errors.lastname}
              required={true}
            >
              <Input
                placeholder="Last name"
                {...register("lastname")}
              />
            </FormField>
          </div>
          <div>
            <FormField
              label="Email"
              error={errors.email}
              required={true}
            >
              <Input
                placeholder="you@example.com"
                {...register("email")}
              />
            </FormField>
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
            <FormField
            label="Password"
            error={errors.password}
          >
            <PasswordInput
              placeholder="••••••••"
              {...register("password")}
            />
          </FormField>
          </div>
          <div>
            <FormField
            label="Confirm Password"
            error={errors.confirmPassword}
          >

            <PasswordInput
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
          </FormField>
          </div>
          <div>
            <FormField
              label="Upload Resume"
            >
              <Input type="file"/>
            </FormField>
            
          </div>
        </motion.div>
      )}
    </SteppedForm>
  );
}
