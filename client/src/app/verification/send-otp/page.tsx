import {} from "react";
import SendOTP from "./comp/SendOTP";
import PageWrapper from "@/app/_components/pageWrapper/PageWrapper";

function SendOTPpage() {
  return (
    <>
      <h1 className="text-xl text-center relative top-[300px]">
        Verify Your Account
      </h1>
      <PageWrapper className="h-screen flex  justify-center flex-col ">
        <SendOTP />
      </PageWrapper>
    </>
  );
}

export default SendOTPpage;
