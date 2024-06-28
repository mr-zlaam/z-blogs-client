import {} from "react";

function ButtonLoader() {
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-3 h-3 rounded-full bg-foreground animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-foreground animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-3 h-3 rounded-full bg-foreground animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </>
  );
}

export default ButtonLoader;
