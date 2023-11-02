import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = {
    message: "호호호",
    data: "오늘도 빡코딩",
  };

  return NextResponse.json(response, { status: 200 });
}
