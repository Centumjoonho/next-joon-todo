"use client";

import React, { useState } from "react";

import { Todo, FocusedTodoType, CustomModalType } from "@/types";

import { Button } from "@nextui-org/button";
import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const CustomModal = ({
  currentModalData,
  onClose,
}: {
  currentModalData: FocusedTodoType;
  onClose: () => void;
}) => {
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
        <ModalHeader className="flex flex-col gap-1">
          {currentModalData.modalType}
        </ModalHeader>
        <ModalBody>
          <p>
            수정모달
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
