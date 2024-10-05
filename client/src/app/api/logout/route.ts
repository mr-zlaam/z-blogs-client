import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  return NextResponse.json({
    success: true,
    status: 200,
    message: "user logged out successfully",
  });
}
