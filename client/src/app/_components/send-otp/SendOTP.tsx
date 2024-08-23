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
import {} from "react";

function SendOTP() {
  const handleSendOTP = async () => {};
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
            <AlertDialogAction>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SendOTP;
