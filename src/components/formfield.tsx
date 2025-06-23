import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  error?: FieldError;
  children: ReactNode;
}

export default function FormField({ error, children }: FormFieldProps) {
  return (
    <div>
      {children}
      <p className={`text-sm ${error ? "text-red-500" : "text-transparent"}`}>
        {error ? error.message : "\u00A0"}
      </p>
    </div>
  );
}
