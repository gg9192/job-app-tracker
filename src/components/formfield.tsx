import { palette } from "@/lib/theme/colors";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  error?: FieldError;
  children: ReactNode;
  label: string;
  required?: boolean;
  id: string;
}

export default function FormField({
  id,
  error,
  children,
  label,
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label} {required && <span className={palette.dangerText}>*</span>}
      </Label>
      {children}
      <p
        className={`text-sm ${error ? palette.dangerText : "text-transparent"}`}
      >
        {error ? error.message : "\u00A0"}
      </p>
    </div>
  );
}
