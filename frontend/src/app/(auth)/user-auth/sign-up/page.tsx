"use client";
import ButtonLoader from "@/_subComponents/buttonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URI } from "@/config";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import type { UserRegisterTypes } from "@/types";
import { registerSchema } from "@/validation/Schemas/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// ********************  Register Form

function RegisterForm() {
  const { errorMessage, successMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterTypes>({ resolver: zodResolver(registerSchema) });
  const handleRegisterSubmit = async (data: UserRegisterTypes) => {
    const { username, fullName, email, password } = data;
    try {
      startLoading();
      const response = await axios.post(
        `${BACKEND_URI}/auth/user/register`,
        {
          username,
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      stopLoading();
      console.log(response.data);
      if (response.data.success) {
        reset();
        successMessage(
          response.data.message || "User Registered successfully."
        );

        setTimeout(() => {
          return router.push("/user-auth/sign-in");
        }, 3000);
      }
    } catch (error: any) {
      stopLoading();
      console.log(error);

      return errorMessage(
        error?.response.data.message || "some thing went wrong"
      );
    }
  };
  return (
    <>
      <section className="relative top-20">
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="border rounded-lg shadow sm:w-full bg-background md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-foreground md:text-2xl">
                  Create an Account
                </h1>
                <div className="grid items-center w-full max-w-sm">
                  <Label className="mb-1" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    autoCapitalize="off"
                    {...register("username")}
                    type="text"
                    placeholder="john_doe"
                    id="username"
                  />
                  <p className="h-[15px]">
                    {errors.username && (
                      <span className="text-xs select-none text-red-500 h-[15px] text-balance ml-2">
                        {errors.username.message}
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid items-center w-full max-w-sm">
                  <Label className="mb-1" htmlFor="fullName">
                    Full Name
                  </Label>
                  <Input
                    {...register("fullName")}
                    type="text"
                    placeholder="John Doe"
                    id="fullName"
                  />
                  <p className="h-[15px]">
                    {errors.fullName && (
                      <span className="text-xs select-none text-red-500 h-[15px] text-balance ml-2">
                        {errors.fullName.message}
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid items-center w-full max-w-sm">
                  <Label className="mb-1" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="john@mail.com"
                    id="email"
                  />
                  <p className="h-[15px]">
                    {errors.email && (
                      <span className="text-xs select-none text-red-500 h-[15px] text-balance ml-2">
                        {errors.email.message}
                      </span>
                    )}
                  </p>
                </div>
                <div className="relative grid items-center w-full max-w-sm">
                  <Label className="mb-1" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    className="pr-14"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    id="password"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-6  cursor-pointer h-7 w-7 rounded-full bg-transparent duration-300 transition-all hover:bg-foreground/10 flex justify-center items-center"
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </span>
                  <p className="h-[15px]">
                    {errors.password && (
                      <span className="text-xs select-none text-red-500 h-[15px] text-balance ml-2">
                        {errors.password.message}
                      </span>
                    )}
                  </p>
                </div>
                <div className="relative grid items-center w-full max-w-sm">
                  <Label className="mb-1" htmlFor="confirm">
                    Confirm Password
                  </Label>
                  <Input
                    className="pr-14"
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    id="confirm"
                  />
                  <span
                    onClick={() => setConfirmShowPassword((prev) => !prev)}
                    className="absolute right-4 top-6  cursor-pointer h-7 w-7 rounded-full bg-transparent duration-300 transition-all hover:bg-foreground/10 flex justify-center items-center"
                  >
                    {showConfirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </span>
                  <p className="h-[15px]">
                    {errors.confirmPassword && (
                      <span className="text-xs select-none text-red-500 h-[15px] text-balance ml-2">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </p>
                </div>

                <Button
                  disabled={isLoading}
                  className={cn(
                    "text-white w-full bg-blue-500 duration-200 transition-all hover:bg-blue-700",
                    isLoading &&
                      "cursor-not-allowed bg-blue-800/50 hover:bg-blue-800/50"
                  )}
                >
                  {isLoading ? <ButtonLoader /> : <span>Register</span>}
                </Button>
                <p className="text-sm text-center ">
                  Already have an Account ?
                  <Link
                    href="/user-auth/sign-in"
                    className="text-blue-500 hover:underline"
                  >
                    <span>&nbsp; Login</span>
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

export default RegisterForm;
