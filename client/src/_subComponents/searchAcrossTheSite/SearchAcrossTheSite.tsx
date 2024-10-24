"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

  const handleSearch = (e?: React.FormEvent) => {
    e && e.preventDefault();

    if (searchTerm.trim()) {
      return router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return handleSearch();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex hover:bg-foreground/20 transition-background justify-center items-center  h-[40px] w-[40px] rounded-full bg-transparent border-none cursor-pointer duration-300">
          <GoSearch size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px]  sm:max-w-[450px] ">
        <DialogHeader>
          <DialogDescription>
            <span className="block relative h-fit border-[2px]  border-black w-full">
              <input
                required
                type="text"
                className="sm:w-[90%] w-full  ring-0 focus-within:shadow-lg focus-within:shadow-foreground/50 rounded duration-300 transition-shadow  h-full font-semibold sm:text-lg p-4 outline-none shadow-sm shadow-foreground/5 pr-14 bg-transparent border-solid "
                placeholder="Search"
                autoFocus
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <DivWrapper
                onClick={handleSearch}
                className="h-[35px] w-[35px] mx-4 bg-transparent border-none cursor-pointer absolute top-2 right-0 sm:right-7 lg:right-10"
              >
                <GoSearch size={25} />
              </DivWrapper>
            </span>
          </DialogDescription>
          <DialogTitle className="text-xs my-2 text-center w-full justify-center items-center h-10  flex  font-normal">
            Search articles across the site
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SearchAcrossTheSite;
