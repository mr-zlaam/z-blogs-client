"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URI } from "@/config";
import { useMessage } from "@/hooks/useMessage";
import { UserDataTypes } from "@/types";
import { updateSchema } from "@/validation/Schemas/dataSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

function UpdateForm({
  user,
  userId,
  token,
}: {
  user: { data: UserDataTypes };
  userId: string;
  token: string;
}) {
  const router = useRouter();
  const { email, fullName, role, username } = user.data;
  const { errorMessage, successMessage } = useMessage();
  const [updateUsername, setUpdateUsername] = useState(username || "username");
  const [updateFullName, setUpdateFullName] = useState(fullName || "fullName");
  const [updateEmail, setUpdateEmail] = useState(email || "email");
  const [updateRole, setUpdateRole] = useState(role || "role");

  const handleDataUpdateConfirm = async (e: FormEvent) => {
    e.preventDefault();
    //validation
    const formData = {
      username: updateUsername,
      fullName: updateFullName,
      email: updateEmail,
      role: updateRole.toLowerCase(),
    };

    // Validate the form data
    const validationResult = updateSchema.safeParse(formData);

    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        errorMessage(error.message);
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${BACKEND_URI}/auth/user/updateUser/${userId}`,
        {
          username: updateUsername,
          fullName: updateFullName,
          email: updateEmail,
          role: updateRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        successMessage(response.data.message || "user update successfully");
        setTimeout(() => {
          return router.push("/admin/users");
        }, 3000);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data.message);
      return errorMessage(
        (error.response.data.message.includes("username:") &&
          "This username is already in use.") ||
          (error.response.data.message.includes("email:") &&
            "This email is already in use.") ||
          "some thing went wrong while updating user Details"
      );
    }
  };
  return (
    <>
      <section className="">
        <form className=" max-w-sm border rounded-md mx-auto relative top-20 py-10 px-5">
          <h1 className="font-sans text-2xl font-bold text-center mb-8">
            Update User Details
          </h1>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-username" className="mb-1">
              username
            </Label>
            <Input
              value={updateUsername}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateUsername(e.target.value);
              }}
              id="update-username"
              type="text"
              placeholder="john_doe"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-fullname" className="mb-1">
              Full Name
            </Label>
            <Input
              value={updateFullName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateFullName(e.target.value);
              }}
              id="update-fullname"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-email" className="mb-1">
              Email
            </Label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateEmail(e.target.value);
              }}
              value={updateEmail}
              id="update-email"
              type="email"
              placeholder="john@example.com"
            />
          </div>
          <div className="flex flex-col my-3 gap-1 ">
            <Label htmlFor="update-role" className="mb-1">
              Role
            </Label>
            <Input
              value={updateRole.toLowerCase()}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUpdateRole(e.target.value);
              }}
              id="update-role"
              type="text"
              placeholder="john_doe"
            />
          </div>
          <div className="p-3">
            <Button onClick={handleDataUpdateConfirm} className="w-full">
              Update
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default UpdateForm;
