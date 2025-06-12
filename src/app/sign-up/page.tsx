"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { userSchema, UserSchema } from "@/lib/validators/user";

export default function SignUpPage() {
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<UserSchema>({
  resolver: zodResolver(userSchema),
});

  const onSubmit = (data: UserSchema) => {
    console.log(data);
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
            <Input
              id="firstname"
              placeholder="First name"
              {...register("firstname")}
            />
            {errors.firstname && (
              <p className="text-sm text-red-500">{errors.firstname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastname" className="mb-1 block text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastname"
              placeholder="Last name"
              {...register("lastname")}
            />
            {errors.lastname && (
              <p className="text-sm text-red-500">{errors.lastname.message}</p>
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
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
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
