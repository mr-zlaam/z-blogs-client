import BackToPreviousRoute, {
  GotoTheRoute,
} from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";
import { Suspense } from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Search from "./comp/Search";
import ButtonLoader from "@/_subComponents/buttonLoader/buttonLoader";

function SearchPage() {
  return (
    <>
      <PageWrapper>
        <BackToPreviousRoute />
        <Suspense fallback={<ButtonLoader />}>
          <Search />
        </Suspense>
      </PageWrapper>
    </>
  );
}

export default SearchPage;
