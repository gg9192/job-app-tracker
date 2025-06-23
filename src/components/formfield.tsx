import { palette } from "@/lib/theme/colors";
import { Label } from "@radix-ui/react-label";
import { ReactNode, isValidElement, cloneElement, useId } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps {
  error?: FieldError;
  children: ReactNode;
  label: string;
  required?: boolean;
}

export default function FormField({ error, children, label, required=false }: FormFieldProps) {
  const id = useId();

  const childWithId = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, { id })
    : children;

  return (
    <div>
      <Label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label} {required && <span className={palette.dangerText}>*</span>}
      </Label>
      {childWithId}
      <p className={`text-sm ${error ? "text-red-500" : "text-transparent"}`}>
        {error ? error.message : "\u00A0"}
      </p>
    </div>
  );
}
