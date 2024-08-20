import {} from "react";
export interface SlugTypes {
  slug: string;
}
async function ReadMorePage({ params }: { params: SlugTypes }) {
  const { slug } = params;
  return (
    <>
      <section>ReadMorePage</section>
      <p>{slug}</p>
    </>
  );
}

export default ReadMorePage;
