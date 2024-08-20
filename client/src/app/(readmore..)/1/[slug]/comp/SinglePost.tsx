/* <div
          dangerouslySetInnerHTML={{
            __html: article.length === 0 ? "Write something...." : article,
          }}
        ></div> */

import {} from "react";

function SinglePost({ article }: { article: string }) {
  return (
    <>
      <article></article>
    </>
  );
}

export default SinglePost;
