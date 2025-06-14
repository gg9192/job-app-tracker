"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { userSchema } from "@/lib/validators/user";
import { PasswordInput } from "@/components/passwordinput";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "@/components/link";
import { palette } from "@/lib/theme/colors";

export const clientUserSchema = userSchema
  .extend({
    password: z.string().min(1, "Password is required"),
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
    formState: { errors },
  } = useForm<ClientUserSchema>({
    resolver: zodResolver(clientUserSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ClientUserSchema) => {
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
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-5 pb-5">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Job Tracker Sign Up
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label
              htmlFor="firstname"
              className="mb-1 block text-sm font-medium"
            >
              First Name
            </Label>
            <Input
              id="firstname"
              placeholder="First name"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className={`text-sm ${palette.dangerText}`}>{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="lastname"
              className="mb-1 block text-sm font-medium"
            >
              Last Name
            </Label>
            <Input
              id="lastname"
              placeholder="Last name"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className={`text-sm ${palette.dangerText}`}>{errors.lastname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className={`text-sm ${palette.dangerText}`}>{errors.email.message}</p>
            )}
          </div>
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-center text-sm ">
          Already have an account?{" "}
          <Link href="/login">Log In</Link>
          
        </p>
      </Card>
    </div>
  );
}
