"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import DivWrapper from "../divWrapper/DivWrapper";

function SearchAcrossTheSite() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DivWrapper title="Search">
          <GoSearch size={20} />
        </DivWrapper>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded shadow-md shadow-foreground/30">
        <DialogHeader>
          <DialogDescription>
            <div className="relative h-fit border-[2px] border-black w-full">
              <Input
                type="text"
                className="w-[90%] border-solid h-full font-semibold sm:text-lg p-4 outline-none shadow-md shadow-foreground/20 pr-14 bg-transparent"
                placeholder="Search"
                autoFocus
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                className="bg-transparent border-none cursor-pointer absolute top-2 right-7 lg:right-10"
                onClick={handleSearch}
              >
                <DivWrapper className="h-[35px] w-[35px]">
                  <GoSearch size={25} />
                </DivWrapper>
              </button>
            </div>
          </DialogDescription>
          <DialogFooter>
            <p className="w-full text-center font-normal text-xs py-3 select-none">
              Search Posts across the site
            </p>
          </DialogFooter>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchAcrossTheSite;
