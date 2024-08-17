import { cn } from "@/lib/utils";
import { AllHTMLAttributes } from "react";
interface SmallWrapperTypes extends AllHTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactElement;
}
const DivWrapper = ({ className, children, ...rest }: SmallWrapperTypes) => {
  return (
    <div
      className={cn(
        "mx-4 h-[45px] w-[45px] rounded-full cursor-pointer flex items-center justify-center duration-300 transition-all hover:bg-foreground/15 ",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DivWrapper;
