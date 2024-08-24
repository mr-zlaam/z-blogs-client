import { MoreHorizontal } from "lucide-react";

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
import moment from "moment";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SECRET } from "@/config";
import { fetchPrivateBlogs } from "@/helper/fetch/fetchBLogs";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { BlogTypes, PayLoadType } from "@/types";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function PrivateBlogsPage() {
  const token = useCookieGrabber();
  if (!token) return redirect("/home");
  // verify token
  let user;
  try {
    user = verify(token?.value, SECRET) as PayLoadType;
  } catch (error: any) {
    console.log(error.message);
  }
  if (user?.role !== "ADMIN") return redirect("/home");
  const draftPrivateBlogs: BlogTypes = await fetchPrivateBlogs(
    token?.value || ""
  );
  console.log(draftPrivateBlogs);
  return (
    <>
      {draftPrivateBlogs?.success ? (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Private Blogs</CardTitle>
                  <CardDescription>
                    Modified your private blogs and share it with public
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

                        <TableHead>Author</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created At
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Updated At
                        </TableHead>
                        <TableHead>
                          <span className="font-medium">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="b">
                      {draftPrivateBlogs?.data?.blogs.length === 0 ? (
                        <div>No Data Found</div>
                      ) : (
                        draftPrivateBlogs?.data?.blogs.map(
                          (privateBlog, index: number) => {
                            return (
                              <Fragment key={privateBlog.blogId}>
                                <TableRow className="">
                                  <TableCell className="hidden sm:table-cell">
                                    <span className="font-medium">
                                      {index + 1}
                                    </span>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {privateBlog.blogTitle}
                                  </TableCell>

                                  <TableCell>
                                    {privateBlog.author.fullName}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {moment(privateBlog.createdAt).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {moment(privateBlog.updatedAt).format(
                                      "MMMM Do YYYY, h:mm:ss a"
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
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
                                          href={`updateBlog/${privateBlog.blogSlug}`}
                                        >
                                          <DropdownMenuItem>
                                            edit
                                          </DropdownMenuItem>
                                        </Link>
                                        <Link
                                          href={`deleteBlog/${privateBlog.blogSlug}`}
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
                          }
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      ) : (
        <div className="min-h-[70vh] flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center">
            No Private Post Found !~
          </h1>
        </div>
      )}
    </>
  );
}
