import {} from "react";
import { OTPinput } from "./comp/VerifyAccount";

function VerifyAccountPage() {
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <OTPinput />
      </section>
    </>
  );
}

export default VerifyAccountPage;
