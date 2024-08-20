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
  coverImage: string;
  coverImageOwner: string;
  createdAt: Date;
  blogTitle: string;
}
function SinglePost({
  article,
  author,
  blogTitle,
  createdAt,
  coverImage,
  coverImageOwner,
}: SinglePostProps) {
  return (
    <>
      <div className="my-5">hello</div>
    </>
  );
}

export default SinglePost;
