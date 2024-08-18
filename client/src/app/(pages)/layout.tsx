import {} from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Header from "../_components/header/Header";
import { Separator } from "@radix-ui/react-separator";
import PageHeader from "../_components/pageHeader/pageHeader";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageWrapper className="sticky top-0 left-0 w-full bg-background mb-4">
        <Header />
        <Separator className="bg-black/10 h-[0.5px]" />
        <PageHeader />
        <Separator className="bg-black/10 h-[0.5px]" />
      </PageWrapper>
      <PageWrapper className="py-3">{children}</PageWrapper>
    </>
  );
}

export default PageLayout;
