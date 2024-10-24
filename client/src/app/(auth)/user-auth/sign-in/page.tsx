"use client";
import ButtonLoader from "@/_subComponents/buttonLoader/buttonLoader";
import DivWrapper from "@/_subComponents/divWrapper/DivWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URI } from "@/config";
import { expirationDate, IS_NOT_DEV_ENV } from "@/constants";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import type { UserLoginTypes } from "@/types";
import { loginSchema } from "@/validation/Schemas/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { errorMessage, successMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const cookie = useCookies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginTypes>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const handleLoginSubmit = async (data: UserLoginTypes) => {
    const { usernameORmail, password } = data;
    try {
      startLoading();
      const response = await axios.post(
        `${BACKEND_URI}/auth/login`,
        {
          email: usernameORmail.toLowerCase().trim(),
          username: usernameORmail.toLowerCase().trim(),
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          withCredentials: true,
        },
      );
      cookie.set("actoken", "", {
        sameSite: "Strict",
        expires: 7 * 24 * 60 * 60 * 1000,
      });
      if (response.status === 200) {
        const accessToken = response?.data?.data?.accessToken as string;

        if (!accessToken) return;
        cookie.set("accessToken", accessToken, {
          expires: expirationDate, // 7 days
          sameSite: "Strict",
          secure: IS_NOT_DEV_ENV,
        });
        successMessage(response.data.message || "Login Successful");
        reset();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return router.push("/home");
      }
      stopLoading();
    } catch (err) {
      const error = err as any;
      console.log(error);
      stopLoading();
      const message = error.response.data.message || "Invalid credentials";
      if (error instanceof Error || error.response.status === 403) {
        return errorMessage(message || "something went wrong while login");
      }
      return error;
    }
  };

  return (
    <>
      <section className="relative top-24">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="sm:w-full bg-background rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-solid">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-foreground md:text-2xl">
                  Sign in
                </h1>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Username or Email</Label>
                  <Input
                    {...register("usernameORmail")}
                    type="text"
                    id="email"
                    placeholder="username or email"
                    className="border-solid lowercase"
                  />
                  {errors.usernameORmail && (
                    <p className="text-xs select-none text-red-500  text-balance ml-2">
                      {errors.usernameORmail.message}
                    </p>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="pr-14 border-solid"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    autoComplete="on"
                  />
                  <DivWrapper
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-6  cursor-pointer h-7 w-7"
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </DivWrapper>
                  {errors.password && (
                    <p className="text-xs select-none text-red-500  text-balance ml-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  disabled={isLoading}
                  className={cn(
                    "text-white w-full bg-blue-500 duration-200 transition-all hover:bg-blue-700",
                    isLoading &&
                    "cursor-not-allowed bg-blue-800/50 hover:bg-blue-800/50",
                  )}
                >
                  {isLoading ? <ButtonLoader /> : <span>Sign in</span>}
                </Button>
                <p className="text-center text-sm ">
                  Don&apos;t have an Account ?
                  <Link
                    href="/user-auth/sign-up"
                    className="text-blue-500 hover:underline"
                  >
                    &nbsp; Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
