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
import { Todo, FocusedTodoType, CustomModalType } from "@/types";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import CustomModal from "../components/custom-modal";
import { VerticalDotsIcon } from "../components/icons";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);
  // 입력 된 할일
  const [newTodoInput, setNewTodoInput] = useState("");
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 띄우는 모달 상태
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: "detail" as CustomModalType,
  });

  const router = useRouter();

  const notify = (msg: string) => toast.success(msg);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    // 로딩 스탑
    setIsLoading(false);
    notify("일정이 추가 되었습니다.");
  };

  // ID로 할 일 삭제 핸들러
  const deleteATodoHandler = async (id: string) => {
    // 버튼색 복원
    // setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 1000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    router.refresh();
    // 로딩 스탑
    setIsLoading(false);
    notify("일정이 삭제 되었습니다.");
  };

  // 입력 된 값 전송 핸들러
  const editATodoHandler = async (
    id: string,
    editedTitle: string,
    editedIsDone: boolean
  ) => {
    // 버튼색 복원
    // setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise((f) => setTimeout(f, 1000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/${id}`, {
      method: "POST",
      body: JSON.stringify({
        title: editedTitle,
        is_done: editedIsDone,
      }),
      cache: "no-store",
    });

    router.refresh();
    // 로딩 스탑
    setIsLoading(false);
    notify("일정이 수정 되었습니다.");
  };
  const ModalComponent = () => {
    return (
      <div>
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <CustomModal
                currentModalData={currentModalData}
                onClose={onClose}
                onEdit={async (id, title, isDone) => {
                  await editATodoHandler(id, title, isDone);
                  onClose();
                }}
                onDelete={async (id) => {
                  await deleteATodoHandler(id);
                  onClose();
                }}
              />
            )}
          </ModalContent>
        </Modal>
      </div>
    );
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
  const checkIsDone = (isDone: boolean) =>
    isDone ? "line-through text-red-500/50" : "";
  const TodoRow = (aTodo: Todo) => (
    <TableRow key={aTodo.id}>
      <TableCell
        className={checkIsDone(aTodo.is_done as boolean) + " font-bold"}
      >
        {aTodo.id.slice(0, 4)}
      </TableCell>
      <TableCell
        className={checkIsDone(aTodo.is_done as boolean) + " font-bold"}
      >
        {aTodo.title}
      </TableCell>
      <TableCell>{aTodo.is_done ? "✅" : "⌛"}</TableCell>
      <TableCell
        className={checkIsDone(aTodo.is_done as boolean) + " font-bold"}
      >{`${aTodo.created_at}`}</TableCell>
      <TableCell>
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown className="bg-background border-1 border-default-200">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light">
                <VerticalDotsIcon className="text-default-400" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                console.log(`A todo id :  ${aTodo.id} key :  ${key}`);
                setCurrentModalData({
                  focusedTodo: aTodo,
                  modalType: key as CustomModalType,
                });
                onOpen();
              }}
            >
              <DropdownItem key="detail">상세보기</DropdownItem>
              <DropdownItem key="edit">수정</DropdownItem>
              <DropdownItem key="delete">삭제</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col space-y-2">
      {ModalComponent()}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
          <TableColumn>액션</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"보여줄 데이터가 없습니다"}>
          {todos && todos.map((aTodo: Todo) => TodoRow(aTodo))}
        </TableBody>
      </Table>
    </div>
  );
};
