"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { palette } from "@/lib/theme/colors";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";

export function SearchApplicationComponent() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [open, setOpen] = useState(false);

  const tags = ["FAANG", "DEVOPS", "Full Stack", "Front End", "MLE"];

  return (
    <>
      <div className="flex flex-column">
        <Input
          type="text"
          placeholder="Search by company, position, or keyword"
          className="h-10"
        />
        <Button className="ml-4 h-10 w-10">
          <svg
            className="w-100 h-100"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-2 gap-y-3">
        {selectedTags.map((tag) => (
          <Badge className="mr-3" key={tag}>
            {tag}
            <button
              className={`${palette.linkHover} hover: cursor-pointer text-lg`}
              onClick={() => {
                setSelectedTags((oldState) => {
                  const newstate = oldState.filter(
                    (element) => element !== tag,
                  );
                  return newstate;
                });
              }}
            >
              x
            </button>
          </Badge>
        ))}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              Add a Tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command data-testid="command">
              <CommandInput placeholder="Search tag..." />
              <CommandList>
                <CommandEmpty>No tag found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={(tag) => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags((oldState: any) => {
                            const newState = oldState.filter(
                              (el: any) => el !== tag,
                            );
                            return newState;
                          });
                        } else {
                          setSelectedTags((oldState: any) => {
                            const newState = [...oldState, tag];
                            return newState;
                          });
                        }
                        setOpen(false);
                      }}
                      className="hover:cursor-pointer"
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <CheckIcon
                          className={`h-4 w-4 text-muted-foreground ${palette.lightStroke}`}
                        />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
