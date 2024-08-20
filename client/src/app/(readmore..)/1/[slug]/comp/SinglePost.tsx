/* <div
          dangerouslySetInnerHTML={{
            __html: article.length === 0 ? "Write something...." : article,
          }}
        ></div> */

import { AuthorType } from "@/types";
import {} from "react";
interface SinglePostProps {
  article: string;
  author: AuthorType;
  blogThumbnail: string;
  blogThumbnailAuthor: string;
  createdAt: Date;
  blogTitle: string;
}
function SinglePost({ article }: SinglePostProps) {
  return (
    <>
      <article></article>
    </>
  );
}

export default SinglePost;
