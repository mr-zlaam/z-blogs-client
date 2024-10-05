import {} from "react";
import Delete from "./components/deleteModal";
import useCookieGrabber from "@/hooks/useCookieGrabber";
interface ParamType {
  deleteUser: string;
}
function DeleteUser({ params }: { params: ParamType }) {
  const token = useCookieGrabber();
  return (
    <>
      <Delete id={params.deleteUser} token={token?.value || ""} />
    </>
  );
}

export default DeleteUser;
