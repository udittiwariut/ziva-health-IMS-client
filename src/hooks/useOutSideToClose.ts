import React, { useEffect } from "react";

interface ModalProps {
  ref: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  close: () => void;
  isLocked?: boolean;
}

const useOutSideToClose = ({ ref, triggerRef, close, isLocked }: ModalProps) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((triggerRef?.current && triggerRef.current.contains(event.target as Node)) || isLocked) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        document.body.style.overflow = "unset";
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isLocked]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (keyCode !== 27 || isLocked) return;
      close();
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [ref, isLocked]);
};

export default useOutSideToClose;
