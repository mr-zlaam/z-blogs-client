"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {} from "react";

function SendOTP() {
  return (
    <form className="sm:w-[70%] mx-auto">
      <Input
        required
        type="email"
        placeholder="Email"
        className="border-solid  mx-auto "
      />
      <div className="flex justify-end p-5">
        <Button className=" ">Send Otp</Button>
      </div>
    </form>
  );
}

export default SendOTP;
