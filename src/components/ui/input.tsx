import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { palette } from "@/lib/theme/colors";
import { Button } from "./button";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("No file chosen");

  if (type === "file") {
    return (
      <div className="flex mt-2">
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose File
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFileName(file.name);
          }}
          className="hidden"
          {...props}
        />
        <div className="text-gray-400 py-2 px-3 rounded-md shadow-inner flex-grow ml-2 flex items-center overflow-hidden">
          <span className="truncate text-md">{fileName}</span>
        </div>
      </div>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        `focus:outline-none focus:ring ${palette.accentInputRing}`,
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
