import { NextRequest, NextResponse } from "next/server";
import dummyTodos from "@/data/dummy.json";
import { fetchTodos, addTodos } from "@/data/firestore";

/// 모든 할일 가져오기
export async function GET(request: NextRequest) {
  const fetchedTodos = await fetchTodos();

  const response = {
    message: "할일 모두 가져오기",
    data: fetchedTodos,
  };

  return NextResponse.json(response, { status: 200 });
}
// 할일 추가하기
// NextRequest 문서 확인 필 !
export async function POST(request: NextRequest) {
  //   const data = await request.json();

  const { title } = await request.json();

  const addedTodo = await addTodos({ title });

  const response = {
    message: " 할일 추가 성공",
    data: addedTodo,
  };

  return Response.json(response, { status: 201 });
}
