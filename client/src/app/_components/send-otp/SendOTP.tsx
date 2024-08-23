"use client";
import { axios } from "@/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessage } from "@/hooks/useMessage";
import { useRouter } from "next/navigation";

function SendOTP({ email, token }: { email: string; token: string }) {
  const { errorMessage, successMessage } = useMessage();
  const handleSendOTP = async () => {
    const router = useRouter();
    try {
      const res = await axios.post(
        "/auth/sendOTP",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",

            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        successMessage("OTP sent successfully");
        return router.push("/verification/verify-account");
      }
    } catch (error: any) {
      console.log(error);
      errorMessage("Something went wrong while sending otp");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <span className="flex items-center text-red-500 text-sm cursor-pointer">
            Verify Account
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to verify your account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-normal ">
              You'll recieve 6 digit otp on your email you used for registration
              which will expire in 30 minutes please verify your account using
              that otp
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendOTP}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SendOTP;
