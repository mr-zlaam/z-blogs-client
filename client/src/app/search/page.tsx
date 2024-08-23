import {} from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Search from "./comp/Search";
import BackToPreviousRoute from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";

function SearchPage() {
  return (
    <>
      <PageWrapper>
        <BackToPreviousRoute />
        <Search />
      </PageWrapper>
    </>
  );
}

export default SearchPage;
