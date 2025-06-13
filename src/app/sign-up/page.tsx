"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { userSchema } from "@/lib/validators/user"; 
import { PasswordInput } from "@/components/passwordinput";
import { z } from "zod";

export const clientUserSchema = userSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type ClientUserSchema = z.infer<typeof clientUserSchema>;


export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientUserSchema>({ // Changed to ClientUserSchema
    resolver: zodResolver(clientUserSchema), // Changed to clientUserSchema
  });

  const onSubmit = (data: ClientUserSchema) => { // Changed to ClientUserSchema
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Job Tracker Sign Up
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="firstname" className="mb-1 block text-sm font-medium">
              First Name
            </Label>
            <Input id="firstname" placeholder="First name" {...register("firstname")} />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastname" className="mb-1 block text-sm font-medium">
              Last Name
            </Label>
            <Input id="lastname" placeholder="Last name" {...register("lastname")} />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </Label>
            <Input id="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
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
            {...register("confirmPassword")} // Added confirmPassword
            error={errors.confirmPassword?.message} // Added error handling for confirmPassword
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-indigo-600 hover:underline">
            Sign In
          </a>
        </p>
      </Card>
    </div>
  );
}