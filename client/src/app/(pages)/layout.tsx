import {} from "react";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}

export default PageLayout;
