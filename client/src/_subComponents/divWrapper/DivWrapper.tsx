import { cn } from "@/lib/utils";
import { AllHTMLAttributes, ButtonHTMLAttributes } from "react";
interface SmallWrapperTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactElement;
}
const DivWrapper = ({ className, children, ...rest }: SmallWrapperTypes) => {
  return (
    <button
      className={cn(
        "mx-2 bg-transparent border-none h-[45px] w-[45px] rounded-full cursor-pointer flex items-center justify-center duration-300 transition-all hover:bg-foreground/15 ",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default DivWrapper;
