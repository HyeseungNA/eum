import React from "react";
import EnterButton from "./EnterButton";
import MakeButton from "./MakeButton";

export default function groupnav() {
  return (
    <div className="bg-brand-red h-[30vh]">
      <div className="flex flex-row pt-[7vh] pl-[10vw] text-white text-2xl ">
        <p className="font-brand-gmarketsans">최유경</p>
        <p className="font-brand-gmarketsans font-light">님과 이어진 모임</p>
      </div>
      <div className="flex flex-row pt-[1vh] pl-[10vw]">
        <MakeButton />
        <EnterButton />
      </div>
    </div>
  );
}
