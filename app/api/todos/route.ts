import { NextRequest, NextResponse } from "next/server";
import dummyTodos from "@/data/dummy.json";

/// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  const response = {
    message: "할일 모두 가져오기",
    data: dummyTodos,
  };

  return NextResponse.json(response, { status: 200 });
}

// NextRequest 문서 확인 필 !
export async function POST(request: NextRequest) {
  //   const data = await request.json();

  const { title } = await request.json();

  const newTodo = {
    id: "10",
    title: title,
    is_done: false,
  };

  const response = {
    message: " 할일 추가 성공",
    data: newTodo,
  };

  return Response.json(response, { status: 201 });
}
