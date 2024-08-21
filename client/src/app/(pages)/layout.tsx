import { SECRET } from "@/config";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { PayLoadType } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { verify } from "jsonwebtoken";
import {} from "react";
import Header from "../_components/header/Header";
import PageHeader from "../_components/pageHeader/PageHeader";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
const getUserInformationFromToken = () => {
  const objToken = useCookieGrabber();
  if (!objToken?.value) {
    return;
  }
  try {
    const user = verify(objToken.value, SECRET) as PayLoadType;
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};
function PageLayout({ children }: { children: React.ReactNode }) {
  const user = getUserInformationFromToken() as PayLoadType;
  return (
    <>
      <PageWrapper className="sticky top-0 left-0 w-full  mb-4 backdrop-blur-md z-[50]">
        <Header user={user} />
        <Separator className="bg-foreground/10 h-[0.5px]" />
        <PageHeader />
        <Separator className="bg-foreground/10 h-[0.5px]" />
      </PageWrapper>
      <PageWrapper className="py-3  overflow-x-hidden">{children}</PageWrapper>
    </>
  );
}

export default PageLayout;
