import React, { useRef } from "react";
import useOutSideToClose from "../hooks/useOutSideToClose";

const CardDetailModal = ({ handleCloseModal }) => {
  const modalRef = useRef<HTMLElement | null>(null);

  useOutSideToClose({ ref: modalRef, close: handleCloseModal, isLocked: loading });
  return (
    <div className="absolute top-0 h-[100dvh] w-[100dvw] flex items-center justify-center overflow-hidden bg-black/50">
      <div
        ref={modalRef}
        className="w-[400px] lg:w-[700px] min-h-[200px]  bg-white border-2 py-1 lg:py-4 z-10 rounded-xl overflow-hidden border-b-7"
      ></div>
    </div>
  );
};

export default CardDetailModal;
