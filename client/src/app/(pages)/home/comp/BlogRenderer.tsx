import { Link } from "@/components/ui/link";
import { Separator } from "@/components/ui/separator";
import { BlogDataTypes } from "@/types";
import moment from "moment";
import { getPlaiceholder } from "plaiceholder";
import BlogDescription from "./BlogDescription";
import BlurImage from "../../../../_subComponents/blurImage/BlurImage";
import { SITE_VERSION } from "@/constants";
interface blogPostProps {
  post: BlogDataTypes;
}

async function BlogRenderer({ post }: blogPostProps) {
  if (!post) return null;
  const buffer = await fetch(post?.blogThumbnail).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <section className="px-2 ">
      <div className="relative  md:h-fit py-3 h-[300px] rounded-md flex justify-start  items-start w-full ">
        <Link href={`/${SITE_VERSION}/${post.blogSlug}`}>
          <BlurImage
            src={post.blogThumbnail}
            alt={post.blogTitle}
            base64={base64}
            width={500}
            height={200}
            className="rounded w-auto"
          />
        </Link>
        <div>
          <h1 className="mx-4 my-2 text-xl">
            <Link
              href={`/${SITE_VERSION}/${post.blogSlug}`}
              className="text-foreground"
            >
              {post.blogTitle}
            </Link>
          </h1>
          <span className="text-sm  mx-4 mb-4 text-green-600">
            Published : {moment(post.createdAt).format("MMMM Do, YYYY")}
          </span>
          <div className="w-full mx-4 line-clamp-4 select-none">
            <BlogDescription
              blogDescription={post.blogOverView}
              blogSlug={post.blogSlug}
            />
          </div>
          <Link
            href={`/${SITE_VERSION}/${post.blogSlug}`}
            className="my-2 mx-4 after:bg-blue-400 text-sm hover:underline"
          >
            Read More...
          </Link>
        </div>
      </div>
      <Separator />
    </section>
  );
}

export default BlogRenderer;
