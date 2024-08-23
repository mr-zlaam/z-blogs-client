"use client";
import { useInView } from "react-intersection-observer";

import PageLoader from "@/_subComponents/pageLoader/PageLoader";

function LoadMore() {
  return (
    <>
      <PageLoader />
    </>
  );
}

export default LoadMore;
