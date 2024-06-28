import axios, { AxiosError } from "axios";
import {} from "react";
import UpdateForm from "./_components/updateForm";
import { useMessage } from "@/hooks/useMessage";
import useCookieGrabber from "@/hooks/useCookieGrabber";
import { BACKEND_URI } from "@/config";
//@types
interface ParamType {
  updateUser: string;
}
const fetchSingleUser = async (updateUser: string, token: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URI}/auth/user/getSingleUser/${updateUser}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
async function UpdateUser({ params }: { params: ParamType }) {
  const { updateUser } = params;
  const { errorMessage } = useMessage();
  let user;
  let error = null;
  const token = useCookieGrabber();

  try {
    user = await fetchSingleUser(updateUser, token?.value || "");
  } catch (err) {
    error = err as AxiosError;
    return errorMessage(error.message);
  }
  return (
    <>
      <section>
        <UpdateForm
          user={user}
          userId={updateUser}
          token={token?.value || "string"}
        />
      </section>
    </>
  );
}

export default UpdateUser;
