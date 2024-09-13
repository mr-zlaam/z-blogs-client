import { GotoTheRoute } from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";
import ButtonLoader from "@/_subComponents/buttonLoader/buttonLoader";
import { Suspense } from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Search from "./comp/Search";

function SearchPage() {
  return (
    <>
      <PageWrapper>
        <GotoTheRoute path="/home" />
        <Suspense fallback={<ButtonLoader />}>
          <Search />
        </Suspense>
      </PageWrapper>
    </>
  );
}

export default SearchPage;
