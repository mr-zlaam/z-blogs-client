import {} from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Header from "../_components/header/Header";
import { Separator } from "@radix-ui/react-separator";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageWrapper className="sticky top-0 left-0 w-full bg-background mb-4">
        <Header />
        <Separator />
      </PageWrapper>
      <PageWrapper className="py-3">{children}</PageWrapper>
    </>
  );
}

export default PageLayout;
