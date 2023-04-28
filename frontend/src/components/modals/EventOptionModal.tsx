"use client";

import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import { destination } from "@/redux/map/mapSlice";
import { useAppDispatch } from "@/redux/hooks";

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    width: "85vw",
    background: "#F8F9F3",
  },
};

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeCenter: {
    lat: number;
    lng: number;
  };
};

const EventOptionModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const moveEvent = (path: string) => {
    dispatch(destination(path));
    router.push("/addeventcamera");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      ariaHideApp={false}
      style={customStyles}
    >
      <section className="relative flex flex-col px-2 py-3">
        <img
          src="/modal/closeBTN.png"
          alt="닫기버튼"
          className="absolute left-[95%] top-[0%]"
          onClick={() => setIsOpen(false)}
        />
        <div>등록할 이벤트를 선택해 주세요.</div>
        <div
          className="shadow-xl rounded-lg h-[6vh] my-4 flex items-center px-3 py-2 text-sm bg-brand-red"
          onClick={() => moveEvent("aging")}
        >
          <span>함께 찍기(에이징/디에이징)</span>
        </div>
        <div
          className="shadow-xl rounded-lg h-[6vh] my-4 flex items-center px-3 py-2 text-sm bg-brand-red"
          onClick={() => moveEvent("pose")}
        >
          <span>동작 따라 찍기</span>
        </div>
      </section>
    </Modal>
  );
};

export default EventOptionModal;
