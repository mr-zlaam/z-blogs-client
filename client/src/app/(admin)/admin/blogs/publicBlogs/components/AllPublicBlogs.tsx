"use client";
import PageLoader from "@/_subComponents/pageLoader/PageLoader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { fetchDashboardPublicBlogs } from "@/helper/fetch/fetchData";
import { useLoading } from "@/hooks/useLoading";
import { BlogTypes } from "@/types";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function AllPublicBlogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publicBlogs, setPublicBlogs] = useState<BlogTypes | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const { isLoading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    if (currentPage) {
      router.push(`/admin/blogs/publicBlogs?page=${currentPage}`, {
        scroll: false,
      }); // Update the URL and prevent scroll
    }
    let isMounted = true;
    const fetchData = async () => {
      try {
        startLoading();
        const blogs: BlogTypes = await fetchDashboardPublicBlogs(currentPage);
        stopLoading();
        if (blogs.success) return setPublicBlogs(blogs);
        else return router.push("/home");
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };
    fetchData();
    return () => {
      isMounted = false; // Clean-up to prevent setting state after unmount
    };
  }, [router, stopLoading, startLoading, currentPage]);
  const publicBlogsList = publicBlogs?.data;
  return (
    <>
      {!isLoading && publicBlogsList?.blogs.length === 0 && (
        <div className="min-h-[70vh] flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center">
            No Public Post Found !
          </h1>
        </div>
      )}
      {!isLoading && publicBlogs && publicBlogs.success && publicBlogsList &&
          publicBlogsList.blogs.length > 0
        ? (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Last 10 Public Blogs</CardTitle>
                    <CardDescription>
                      Manage All the Publicly available Blogs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="">
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell ">
                            <span className="font-medium">Post No.</span>
                          </TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Created At
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Overview
                          </TableHead>
                          <TableHead>
                            <span className="font-medium">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="b">
                        {!isLoading && publicBlogsList?.blogs.map(
                          (publicBlog, index: number) => {
                            return (
                              <Fragment key={publicBlog?.blogId ?? Date.now()}>
                                <TableRow className="">
                                  <TableCell className="hidden sm:table-cell">
                                    <span className="font-medium">
                                      {index + 1}
                                    </span>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {publicBlog?.blogTitle}
                                  </TableCell>

                                  <TableCell className="hidden md:table-cell">
                                    {moment(publicBlog.createdAt).format(
                                      "MMMM Do YYYY, h:mm:ss a",
                                    )}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    <span className="text-sm max-w-[200px] font-normal block mx-2 text-foreground/70 pr-4 text-start">
                                      <span className="line-clamp-2 overflow-hidden text-ellipsis">
                                        {publicBlog?.blogOverView}
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4 bg-t" />
                                          <span className="sr-only">
                                            Toggle menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                          Actions
                                        </DropdownMenuLabel>
                                        <Link
                                          href={`updateBlog/${publicBlog.blogSlug}`}
                                        >
                                          <DropdownMenuItem>
                                            edit
                                          </DropdownMenuItem>
                                        </Link>
                                        <Link
                                          href={`deleteBlog/${publicBlog.blogSlug}`}
                                        >
                                          <DropdownMenuItem>
                                            Delete
                                          </DropdownMenuItem>
                                        </Link>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            );
                          },
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="flex justify-start items-center">
              {publicBlogs?.metaData?.pagination?.hasPreviousPage && (
                <button
                  className="px-4 py-2 bg-foreground rounded duration-200 active:scale-90 transition-transform text-background font-bold border-none cursor-pointer "
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Prev
                </button>
              )}
            </div>

            <div className="flex justify-end items-center">
              {publicBlogs?.metaData?.pagination?.hasNextPage && (
                <button
                  className="px-4 py-2 bg-foreground rounded duration-200 active:scale-90 transition-transform text-background font-bold border-none cursor-pointer "
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </main>
        )
        : isLoading && (
          <div className="flex justify-center items-center h-[60vh]">
            <PageLoader />
          </div>
        )}
    </>
  );
}
