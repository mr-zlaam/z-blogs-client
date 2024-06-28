"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlogDataTypes } from "@/types";
import { Search } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import parser from "html-react-parser";
import { VERSION } from "@/constants";
function RenderAllPosts({ allPosts }: { allPosts: BlogDataTypes[] }) {
  const [searchItem, setSearchItem] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = allPosts.filter((post) => {
      return post?.blogTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(filteredItems);
  };

  return (
    <>
      <div className="h-14 w-full border border-foreground flex my-5 items-center px-4 gap-3 rounded-md">
        <Search size={30} />
        <input
          value={searchItem}
          placeholder="Search in posts..."
          type="text"
          onChange={handleInputChange}
          className="border-none outline-none bg-transparent h-full w-full px-5 font-semibold text-lg"
        />
      </div>
      {filteredPosts.length === 0 && (
        <div className="h-[400px] w-full flex justify-center items-center font-bold text-3xl flex-col md:flex-row">
          No Post Found!~
        </div>
      )}
      <section className="flex flex-col gap-4  w-full py-5">
        {filteredPosts?.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="my-2 md:h-[400px] h-[500px] flex gap-4 rounded-md shadow-lg overflow-hidden flex-col md:flex-row ">
                <div className="flex-1 flex w-full lg:max-w-[500px] overflow-hidden">
                  <Image
                    src={post.blogThumbnail || "/logo/Zlaam.jpg"}
                    alt={post.blogAuthor}
                    width={800}
                    height={800}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col max-w-[400px]   justify-center gap-4 px-4">
                  <h1 className="md:text-3xl font-bold my-2 mx-3 text-xl">
                    {post.blogTitle}
                  </h1>
                  <Link
                    href={`/${VERSION}/${post.blogSlug || "/home"}`}
                    className="inline-block max-w-[300px] mx-5"
                  >
                    <Button className="w-full">Go to Post</Button>
                  </Link>
                  <div className="flex  items-center my-4 gap-3 px-4">
                    <Image
                      src={"/logo/Zlaam.jpg"}
                      alt="Zlaam"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-start">
                      <h1 className="text-lg font-semibold ">
                        {post.blogAuthor}
                      </h1>
                      <p className="text-sm text-left">
                        Published on:{" "}
                        {moment(post.createdAt).format("MMMM Do, YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Fragment>
          );
        })}
      </section>
    </>
  );
}

export default RenderAllPosts;
