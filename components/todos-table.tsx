"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Todo } from "@/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  // 입력 된 할일
  const [newTodoInput, setNewTodoInput] = useState("");
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  // 입력 된 값 전송 핸들러
  const addATodoHandler = async () => {
    if (!todoAddEnable) {
      return;
    }
    // 버튼색 복원
    setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 1000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: "POST",
      body: JSON.stringify({
        title: newTodoInput,
      }),
      cache: "no-store",
    });
    setNewTodoInput("");

    router.refresh();
    //console.log(`할일 추가 완료 : ${newTodoInput}`);
    // 로딩 스탑
    setIsLoading(false);
  };

  const DisabledTodoAddButton = () => {
    return (
      <>
        <Popover placement="right">
          <PopoverTrigger>
            <Button radius="full" className="h-14">
              추가
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-lg text-center">😈</div>
              <div className="text-tiny mt-3">입력해 바보야</div>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  };
  const TodoRow = (aTodo: Todo) => (
    <TableRow key={aTodo.id}>
      <TableCell>{aTodo.id.slice(0, 4)}</TableCell>
      <TableCell>{aTodo.title}</TableCell>
      <TableCell>{aTodo.is_done ? "✅" : "⌛"}</TableCell>
      <TableCell>{`${aTodo.created_at}`}</TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="새로운 할일"
          value={newTodoInput}
          onValueChange={(changedInput) => {
            setNewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            radius="full"
            className="h-14"
            color="warning"
            onPress={async () => {
              await addATodoHandler();
            }}
          >
            추가
          </Button>
        ) : (
          DisabledTodoAddButton()
        )}
      </div>
      <div className="h-5">
        {isLoading && <Spinner size="sm" color="warning" />}
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>할 일</TableColumn>
          <TableColumn>완료 여부</TableColumn>
          <TableColumn>등록 시간</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다"}>
          {todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}
        </TableBody>
      </Table>
    </div>
  );
};
