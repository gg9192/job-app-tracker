import { UseFormRegister, Control, Controller, UseFormTrigger } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { DollarSign } from "lucide-react";
import { palette } from "@/lib/theme/colors";

export default function CompensationInputBox({
  register,
  control,
  field,
  trigger
}: {
  register: UseFormRegister<any>;
  control: Control<any>;
  field: string;
  trigger: UseFormTrigger<any>
}) {
  return (
    <div className="flex w-full rounded-md border border-input overflow-hidden">
      <div className="flex items-center px-3 text-muted-foreground">
        <DollarSign className={`w-4 h-4 ${palette.accentStroke}`} />
      </div>
      <Input
        type="number"
        step="0.01"
        id={field}
        {...register(field)}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
      />
      <Controller
        control={control}
        name="compType"
        render={({ field }) => (
          <Select onValueChange={(event) => {
            field.onChange(event)
            trigger("compensation")
          }} value={field.value ?? ""}>
            <SelectTrigger className="border-0 rounded-none focus:ring-0 focus:ring-offset-0 w-[140px] cursor-pointer">
              <SelectValue placeholder="Pay type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
