"use client";

import React, { useState } from "react";

import { Todo, FocusedTodoType, CustomModalType } from "@/types";
import { Input } from "@nextui-org/input";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
  CircularProgress,
} from "@nextui-org/react";

const CustomModal = ({
  currentModalData,
  onClose,
  onEdit,
  onDelete,
}: {
  currentModalData: FocusedTodoType;
  onClose: () => void;
  onEdit: (id: string, title: string, is_done: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  //수정 상태
  const [isDone, setIsDone] = useState(
    currentModalData.focusedTodo?.is_done as boolean
  );
  //로딩상태
  const [isLoading, setIsLoading] = useState(false);
  //수정 할일 상태
  const [editedTodoValue, setEditedTodoValue] = useState<string>(
    `${currentModalData.focusedTodo?.title}`
  );

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">상세 내용</ModalHeader>
        <ModalBody>
          <p>
            <span className=" font-bold">
              I D : {currentModalData.focusedTodo?.id}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              내 용 : {currentModalData.focusedTodo?.title}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              진 행 :{" "}
              {currentModalData.focusedTodo?.is_done ? "완료" : "미완료"}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              작성일자 :{" "}
              {`${
                currentModalData.focusedTodo &&
                new Date(
                  currentModalData.focusedTodo.created_at
                ).toLocaleString()
              } `}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </>
    );
  };
  const EditModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 수정</ModalHeader>
        <ModalBody>
          <p>
            <span className=" font-bold">
              {currentModalData.focusedTodo?.id}
            </span>
          </p>

          <Input
            autoFocus
            isRequired
            label="할일 내용"
            placeholder="내용을 입력하세요"
            variant="bordered"
            value={editedTodoValue}
            onValueChange={setEditedTodoValue}
          />
          <div className="flex py-2 px-1 space-x-4">
            <Switch
              isSelected={isDone as boolean}
              size="lg"
              color="warning"
              onValueChange={setIsDone}
            ></Switch>
            <p className="flex py-1 space-x-4">{`${
              isDone ? "완료" : "미완료"
            }`}</p>
            <p className="flex py-1 space-x-1">
              {`${
                currentModalData.focusedTodo &&
                new Date(
                  currentModalData.focusedTodo.created_at
                ).toLocaleString()
              } `}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            닫기
          </Button>
          <Button
            color="warning"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onEdit(
                currentModalData.focusedTodo?.id as string,
                editedTodoValue,
                isDone
              );
            }}
          >
            {isLoading ? (
              <CircularProgress
                size="sm"
                color="warning"
                aria-label="Loading..."
              />
            ) : (
              "수정"
            )}
          </Button>
        </ModalFooter>
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">할일 삭제</ModalHeader>
        <ModalBody>
          <p>
            <span className=" font-bold">
              I D : {currentModalData.focusedTodo?.id}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              내 용 : {currentModalData.focusedTodo?.title}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              진 행 :{" "}
              {currentModalData.focusedTodo?.is_done ? "완료" : "미완료"}
            </span>
          </p>
          <p>
            <span className=" font-bold">
              작성일자 :{" "}
              {`${
                currentModalData.focusedTodo &&
                new Date(
                  currentModalData.focusedTodo.created_at
                ).toLocaleString()
              } `}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" variant="light" onPress={onClose}>
            닫기
          </Button>
          <Button
            color="danger"
            variant="light"
            onPress={() => {
              setIsLoading(true);
              onDelete(currentModalData.focusedTodo?.id as string);
            }}
          >
            {isLoading ? (
              <CircularProgress
                size="sm"
                color="danger"
                aria-label="Loading..."
              />
            ) : (
              "삭제"
            )}
          </Button>
        </ModalFooter>
      </>
    );
  };
  const switchModal = () => {
    if (currentModalData.modalType === "detail") {
      return <DetailModal />;
    } else if (currentModalData.modalType === "edit") {
      return <EditModal />;
    } else if (currentModalData.modalType === "delete") {
      return <DeleteModal />;
    }
  };

  return <>{switchModal()}</>;
};

export default CustomModal;
