"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Loader from "@/_subComponents/buttonLoader/buttonLoader";
import { axios } from "@/axios";
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
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import { FormSchema } from "@/validation/Schemas/dataSchema";
import { useRouter } from "next/navigation";
// validation schema

export function OTPinput({ token }: { token: string }) {
  const { errorMessage, successMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
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
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        stopLoading();
        successMessage("OTP verified successfully", "bottom-right", 3000);
        const token = response?.data?.data?.accessToken;
        const setToken = await fetch("/api/verifyUser", {
          method: "POST",
          body: JSON.stringify({
            token,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        console.log(setToken);
        form.reset();
        if (typeof window !== "undefined") window.location.reload();
        return router.push("/home");
      } else if (response.status === 400) {
        return errorMessage("Invalid OTP");
      }
    } catch (error: any) {
      console.log(error);
      stopLoading();
      errorMessage(
        error?.response?.data.message ||
          "Something went wrong while sending otp",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 "
        autoFocus
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verify Your Account with OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="caret-blink border-solid "
                      index={0}
                      autoFocus
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid  border-l-0"
                      index={1}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid  border-l-0"
                      index={2}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid  border-l-0"
                      index={3}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid  border-l-0"
                      index={4}
                    />
                    <InputOTPSlot
                      className="caret-blink border-solid  border-l-0"
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
          </Button>
        </div>
      </form>
    </Form>
  );
}
