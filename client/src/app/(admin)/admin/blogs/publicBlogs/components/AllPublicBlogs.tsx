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
import { fetchAllPublicBlogs } from "@/helper/fetch/fetchBLogs";
import { BlogTypes } from "@/types";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Fragment } from "react";

export default async function AllPublicBlogs() {
  const publicBlogs: BlogTypes = await fetchAllPublicBlogs();
  console.log(publicBlogs);
  const publicBlogsList = publicBlogs?.data;

  return (
    <>
      {publicBlogsList?.blogs.length === 0 && (
        <div className="min-h-[70vh] flex justify-center items-center">
          <h1 className="text-3xl font-bold text-center">
            No Public Post Found !
          </h1>
        </div>
      )}
      {publicBlogs.success ? (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Public Blogs</CardTitle>
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
                      {publicBlogsList?.blogs.map(
                        (publicBlog, index: number) => {
                          return (
                            <Fragment key={publicBlog.blogId}>
                              <TableRow className="">
                                <TableCell className="hidden sm:table-cell">
                                  <span className="font-medium">
                                    {index + 1}
                                  </span>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {publicBlog.blogTitle}
                                </TableCell>

                                <TableCell>
                                  {publicBlog.author.fullName} <br />
                                  <span className="text-sm text-gray-500">
                                    @{publicBlog.author.username}
                                  </span>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {moment(publicBlog.createdAt).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {moment(publicBlog.updatedAt).format(
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
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            </Fragment>
                          );
                        }
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
            No Public Post Found !
          </h1>
        </div>
      )}
    </>
  );
}
