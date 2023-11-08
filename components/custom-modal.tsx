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
} from "@nextui-org/react";

const CustomModal = ({
  currentModalData,
  onClose,
}: {
  currentModalData: FocusedTodoType;
  onClose: () => void;
}) => {
  //수정 로딩 상태
  const [isDone, setIsDone] = useState<Boolean>(
    currentModalData.focusedTodo?.is_done as boolean
  );
  //수정 할일 상태
  const [editedTodoValue, setEditedTodoValue] = useState<string>(
    `${currentModalData.focusedTodo?.title}`
  );

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          {currentModalData.modalType}
        </ModalHeader>
        <ModalBody>
          <p>
            상세모달
            {/* {currentModalData.focusedTodo?.title} */}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            닫기
          </Button>
          <Button color="primary" onPress={onClose}>
            액션
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
              {`   isDon : ${isDone}`}
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
          <div className="flex py-2 px-1 justify-between">
            <Switch
              defaultSelected={currentModalData.focusedTodo?.is_done}
              onValueChange={setIsDone}
              size="lg"
              color="warning"
            ></Switch>
            <p className="py-2">{`${
              currentModalData.focusedTodo &&
              new Date(currentModalData.focusedTodo.created_at).toLocaleString()
            }`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            닫기
          </Button>
          <Button color="primary" onPress={onClose}>
            수정
          </Button>
        </ModalFooter>
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">
          {currentModalData.modalType}
        </ModalHeader>
        <ModalBody>
          <p>
            삭제모달
            {/* {currentModalData.focusedTodo?.title} */}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            닫기
          </Button>
          <Button color="primary" onPress={onClose}>
            액션
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
