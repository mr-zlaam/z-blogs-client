import { Metadata } from "next";
import Link from "next/link";
import {} from "react";

function NotFound() {
  return (
    <>
      <section className="h-[80dvh] flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold my-10">404 | Not Found</h1>
        <p>
          <Link
            href="/home"
            className="text-3xl font-semibold  my-10 text-blue-400 hover:underline"
          >
            Go Home
          </Link>
        </p>
      </section>
    </>
  );
}

export default NotFound;
export const metadata: Metadata = {
  title: "Not Found ~ ",
  description: "Page not found",
};
