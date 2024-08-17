import { cn } from "@/lib/utils";

const PageWrapper = ({
  className,
  children,
  id,
}: {
  className?: string;
  id?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      id={id}
      className={cn(
        "mx-auto w-full md:max-w-screen-lg px-2 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
