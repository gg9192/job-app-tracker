"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/passwordinput";
import { toast } from "sonner";
import { Link } from "@/components/link";
import FormField from "@/components/formfield";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      if (res.status === 500) {
        toast.error("Something went wrong on our end!");
        return;
      }
      if (res.status === 401) {
        toast.error("Your credentials don't match an account in our system");
        return;
      }
    }

    toast.success("Login successfull!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold ">
          Job Tracker Login
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormField error={errors.email} label="Email" required={true}>
              <Input
                placeholder="you@example.com"
                {...register("email")}
              />
            </FormField>
          </div>
          <FormField error={errors.password} label="Password" required={true}>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </FormField>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don’t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </Card>
    </div>
  );
}
