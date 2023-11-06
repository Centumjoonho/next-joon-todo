import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";
import { fetchATodo, deleteATodo, editATodo } from "@/data/firestore";

// 단일 할일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // 서버 사이드에서 사용할 수 있는 Hook
  //const searchParams = request.nextUrl.searchParams;
  //const query = searchParams.get("query");
  // 클라이언트 사이드에서 사용할 수 있는 Hook
  // const searchParams = useSearchParams();

  const fetchedATodo = await fetchATodo(params.slug);

  if (fetchedATodo === null) {
    return new Response("Not Data", { status: 204 });
  }

  const response = {
    message: "단일 할일 가져오기 성공 ! ",
    data: fetchedATodo,
  };

  return NextResponse.json(response, { status: 200 });
}

// 단일 할일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const deletedTodo = await deleteATodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "단일 할일 삭제 성공 ! ",
    data: deletedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}

// 단일 할일 수정 id
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editedATodo = await editATodo(params.slug, { title, is_done });

  if (editedATodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: "단일 할일 수정 성공 ! ",
    data: editedATodo,
  };

  return NextResponse.json(response, { status: 200 });
}
