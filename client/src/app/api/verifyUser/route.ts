import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { expirationDate, IS_NOT_DEV_ENV } from "@/constants";

interface BodyProps {
  token: string;
}
export async function POST(req: NextRequest) {
  const body: BodyProps = await req.json();
  const { token } = body;
  if (!token)
    return NextResponse.json({ success: false, message: "Token not found" });
  console.log(token);
  const cookie = cookies();
  cookie.delete("accessToken");
  cookie.set("accessToken", token, {
    httpOnly: true,
    sameSite: "strict",
    expires: expirationDate,
    secure: IS_NOT_DEV_ENV,
  });
  return NextResponse.json({
    success: true,
    message: "Token Set successfully",
  });
}
