import { BACKEND_URI } from "@/config";
import UseCookieGrabber from "@/hooks/useCookieGrabber";
import axios, { AxiosError } from "axios";
import { notFound, redirect } from "next/navigation";
import { Fragment } from "react";
import UpdateForm from "./_components/updateForm";

// Types
interface ParamType {
  updateUser: string;
}

// Function to fetch a single user
const fetchSingleUser = async (updateUser: string, token: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URI}/auth/getSingleUser/${updateUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Utility function to validate the user ID format
const isValidUserId = (userId: string): boolean => {
  // Example: Validate that the user ID is a 24-character alphanumeric string (like MongoDB ObjectID)
  const regex = /^[a-zA-Z0-9]{25}$/;
  return regex.test(userId);
};

// Main UpdateUser component
async function UpdateUser({ params }: { params: ParamType }) {
  const { updateUser } = params;

  // Step 1: Validate and sanitize the user ID
  if (!isValidUserId(updateUser)) {
    return redirect("/home"); // Redirect on error
  }

  let user;
  const token = UseCookieGrabber();

  try {
    user = await fetchSingleUser(updateUser, token?.value || "");
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    return redirect("/home"); // Redirect on error
  }
  if (typeof user?.data?.email === "undefined") return redirect("/home"); // Redirect if user not found
  return (
    <Fragment>
      <section>
        <UpdateForm
          user={user}
          userId={updateUser}
          token={token?.value || ""}
        />
      </section>
    </Fragment>
  );
}

export default UpdateUser;
