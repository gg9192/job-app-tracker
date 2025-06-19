"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "./ui/badge";
import { useState } from "react";
import { palette } from "@/lib/theme/colors";

export function SearchApplicationComponent() {
    const [selectedTags, setSelectedTags] = useState(["FAANG", "DEVOPS", "Full Stack", "Front End", "MLE"])

    const tags = ["FAANG", "DEVOPS", "Full Stack", "Front End", "MLE"]

    return (<><div className="flex flex-column">
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
        <div className="mt-5 flex">
            {selectedTags.map((tag) => (<Badge className="mr-3">{tag}
                <button className={`${palette.linkHover} hover: cursor-pointer`}
                onClick={() => {
                    setSelectedTags((oldState) => {
                        const newstate = oldState.filter((element) => (element !== tag))
                        return newstate
                    })
                }}
                
                
                
                >x</button>
                </Badge>))}
            <Popover>
                <PopoverTrigger  asChild>
                    <Button>Add Tag</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <h1 className="text-white">hello world</h1>
                    <h1 className="text-white">hello world</h1>
                    <h1 className="text-white">hello world</h1>

                </PopoverContent>
            </Popover>
        </div>
    </>)
}