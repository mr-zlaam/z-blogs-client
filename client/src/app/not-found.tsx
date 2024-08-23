import { Link } from "@/components/ui/link";
import {} from "react";
import { ImSad2 } from "react-icons/im";

function NotFound() {
  return (
    <>
      <section className="pattern_dark  text-4xl animate-page  gap-10 h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold flex items-center px-4">
          404 | Not Found
          <ImSad2 className="mx-4" />
        </h1>
        <p>
          <Link
            href="/home"
            className="text-3xl font-semibold link_dark after:bg-foreground/70"
            varient="expand-from-center"
          >
            Go Home
          </Link>
        </p>
      </section>
    </>
  );
}

export default NotFound;
