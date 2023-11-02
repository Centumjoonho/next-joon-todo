import { NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

// 단일 할일 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // 서버 사이드에서 사용할 수 있는 Hook
  const searchParams = request.nextUrl.searchParams;
  // 클라이언트 사이드에서 사용할 수 있는 Hook
  // const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const response = {
    message: "단일 할일 가져오기 성공 ! ",
    data: {
      id: params.slug,
      title: "오늘도 빡코딩 !",
      is_done: false,
      query: query,
    },
  };

  return NextResponse.json(response, { status: 200 });
}

// 단일 할일 삭제 id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // 서버 사이드에서 사용할 수 있는 Hook
  const searchParams = request.nextUrl.searchParams;
  // 클라이언트 사이드에서 사용할 수 있는 Hook
  // const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const response = {
    message: "단일 할일 삭제 성공 ! ",
    data: {
      id: params.slug,
      title: "오늘도 빡코딩 !",
      is_done: false,
    },
  };

  return NextResponse.json(response, { status: 200 });
}

// 단일 할일 수정 id
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { title, is_done } = await request.json();

  const editedTodo = {
    id: params.slug,
    title: title,
    is_done: is_done,
  };

  const response = {
    message: "단일 할일 수정 성공 ! ",
    data: editedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}
