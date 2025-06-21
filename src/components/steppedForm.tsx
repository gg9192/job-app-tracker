"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SteppedForm({
  steps,
  currentStep,
  onBack,
  onNext,
  onSubmit,
  title,
  children,
  footer,
}: {
  steps: number;
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const progressPercent = (currentStep / steps) * 100;
  const isLastStep = currentStep === steps - 1

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold">{title}</h1>

        <Progress value={progressPercent} className="h-2 mb-6" />

        <form className="space-y-5 relative overflow-hidden flex flex-col" style={{ minHeight: 400 }}>
          <div className="relative flex-grow">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <Button onClick={onBack} type="button" disabled={currentStep === 0}>
              Back
            </Button>
            {footer}
            {!isLastStep ? (
              <Button onClick={onNext} type="button">
                Next
              </Button>
            ) : (<Button type="button" onClick={onSubmit}>
              Submit
            </Button>)}

          </div>
        </form>
      </Card>
    </div>
  );
}
