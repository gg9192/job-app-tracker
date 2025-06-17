"use client";

import { Button, buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import Link from "next/link";

type ButtonProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

export default function ButtonStyledLink({
  children,
  href,
  ...props
}: ButtonProps) {
  return (
    <Link href={href}>
      <Button className="w-100">{children}</Button>
    </Link>
  );
}
