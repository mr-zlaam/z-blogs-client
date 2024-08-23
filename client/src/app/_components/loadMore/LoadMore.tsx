"use client";
import { useInView } from "react-intersection-observer";

import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import {} from "react";

function LoadMore() {
  return (
    <>
      <PageLoader />
    </>
  );
}

export default LoadMore;
