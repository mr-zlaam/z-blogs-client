import { Lock, MoreHorizontal } from "lucide-react";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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
import { BACKEND_URI } from "@/config";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { UserDataTypes } from "@/types";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { Fragment } from "react";

const fetchUsers = async (token: string) => {
  try {
    const res = await axios.get(`${BACKEND_URI}/auth/getAllUsers`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data?.success) {
      return res.data;
    }
  } catch (err: any) {
    console.log(err);
    return err.response.data.statusCode || 403;
  }
};

export default async function UserDashBoard() {
  const token = useCookieGrabber();
  if (!token) {
    return redirect("/home");
  }
  let users;
  try {
    users = await fetchUsers(token?.value || "");
  } catch (error: any) {
    console.log(error.message);
    return redirect("/home");
  }
  if (users === 403) {
    return redirect("/home");
  }
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage All the user of on your site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell ">
                      <span className="font-medium">No.</span>
                    </TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="hidden md:table-cell">Full Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      is Verified
                    </TableHead>
                    <TableHead>
                      <span className="font-medium">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="">
                  {!users?.data.users || users.data?.users === undefined
                    ? "No Data found"
                    : users?.data?.users.map(
                      (userData: UserDataTypes, index: number) => {
                        return (
                          <Fragment key={userData.uid}>
                            <TableRow className="cursor-default ">
                              <TableCell className="hidden sm:table-cell">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-medium">
                                {userData.username}
                              </TableCell>
                              <TableCell className="hidden md:inline-block">{userData.fullName}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {userData.role}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {userData.email}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {moment(userData.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a",
                                )}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {userData.isVerfied
                                  ? <span>Verified &#10004;</span>
                                  : <span>Not Verified &#10005;</span>}
                              </TableCell>
                              <TableCell>
                                {userData.username === "zlaam"
                                  ? (
                                    <span className="flex items-center gap-2 cursor-not-allowed text-red-500 select-none">
                                      <Lock size={15} />
                                      Not Allowed
                                    </span>
                                  )
                                  : (
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          className="bg-transparent hover:bg-transparent"
                                        >
                                          <MoreHorizontal className="h-4 w-4 text-foreground" />
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
                                          href={`users/updateUser/${userData.uid}`}
                                        >
                                          <DropdownMenuItem>
                                            edit
                                          </DropdownMenuItem>
                                        </Link>
                                        <Link
                                          href={`users/deleteUser/${userData.uid}-${userData.username}`}
                                        >
                                          <DropdownMenuItem>
                                            Delete
                                          </DropdownMenuItem>
                                        </Link>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  )}
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
    </main>
  );
}
