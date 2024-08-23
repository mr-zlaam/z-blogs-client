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
  try {
    const user = verify(token?.value, SECRET) as PayLoadType;
    if (!user) redirect("/home");
    if (user.isVerfied) redirect("/home");
  } catch (error: any) {
    console.log(error.message);
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
