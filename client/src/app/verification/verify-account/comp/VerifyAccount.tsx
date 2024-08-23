"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { axios } from "@/axios";
import { FormSchema } from "@/validation/Schemas/dataSchema";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import Loader from "@/_subComponents/buttonLoader/buttonLoader";
import { cn } from "@/lib/utils";
import { useState } from "react";
// validation schema

export function OTPinput() {
  const { errorMessage, successMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isResendOTPModalOpened, setIsResendOTPModalOpened] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Send OTP
    try {
      startLoading();
      const response = await axios.post(
        "/auth/verifyUser",
        {
          otp: data.pin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        stopLoading();
        form.reset();
        return successMessage("OTP verified successfully");
      } else if (response.status === 400) {
        return errorMessage("Invalid OTP");
      }
    } catch (error: any) {
      console.log(error);
      stopLoading();
      errorMessage(
        error?.response?.data.message ||
          "Something went wrong while sending otp"
      );
      if (error instanceof Error) {
        stopLoading();
        console.log(error.message);
      } else {
        return error;
      }
    } finally {
      stopLoading();
    }
  }
  const hello = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={0}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={1}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={2}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={3}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={4}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(isLoading && "cursor-not-allowed")}
          >
            {isLoading ? <Loader /> : <span>Verify OTP</span>}
          </Button>{" "}
        </div>
      </form>
    </Form>
  );
}
