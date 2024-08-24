import BackToPreviousRoute from "@/_subComponents/backToPreviousRoute/BackToPreviousRoute";
import {} from "react";
import PageWrapper from "../_components/pageWrapper/PageWrapper";
import Search from "./comp/Search";

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
