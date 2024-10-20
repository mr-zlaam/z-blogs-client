import {} from "react";

function PageLoader() {
  return (
    <>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto">
        </div>
        <p className="text-zinc-600 dark:text-zinc-400"></p>
      </div>
    </>
  );
}

export default PageLoader;
