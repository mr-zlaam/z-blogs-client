import {} from "react";
import { OTPinput } from "./comp/VerifyAccount";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { verify } from "jsonwebtoken";
import { PayLoadType } from "@/types";
import { SECRET } from "@/config";
import { redirect } from "next/navigation";

function VerifyAccountPage() {
  const token = useCookieGrabber();
  if (!token) redirect("/home");
  let user;
  try {
    user = verify(token?.value, SECRET) as PayLoadType;
  } catch (error: any) {
    console.log(error, "from otp main page");
    return redirect("/home");
  }
  if (!user) return redirect("/home");
  if (user.isVerfied) {
    return redirect("/home");
  }
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <OTPinput token={token.value || ""} />
      </section>
    </>
  );
}

export default VerifyAccountPage;
