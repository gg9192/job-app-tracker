import { UseFormRegister } from "react-hook-form";
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
  field,
}: {
  register: UseFormRegister<any>;
  field: string;
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
      <Select>
        <SelectTrigger className="border-0 rounded-none focus:ring-0 focus:ring-offset-0 w-[140px] cursor-pointer">
          <SelectValue placeholder="Wage type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hourly">Hourly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
