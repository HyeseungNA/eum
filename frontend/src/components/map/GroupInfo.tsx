"use client";

import { detailGroup } from "@/services/groupApi";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GroupCodeModal from "../modals/GroupCodeModal";
import { useRouter } from "next/navigation";

interface Props {
  groupId: number;
}
const GroupInfo = ({ groupId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDetailGroup = async () => {
    const response = await detailGroup(groupId);
    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["initial-groupInfo"],
    queryFn: getDetailGroup,
  });

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      (window as any).Android.copyToClipboard(text);
      setIsOpen(true);
    } catch {
      console.log("error");
    }
  };
  const router = useRouter();
  const goToGallery = async (groupId: number) => {
    await router.push(`/groupgallery/${groupId}`);
  };

  return (
    <section className="h-[25%] flex ">
      {data && (
        <div className="flex justify-center items-center w-[90%] h-[80%] m-auto shadow-xl rounded-lg bg-white">
          <div className="w-[30%] h-[80%] flex">
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.image}`}
              className="w-[80%] m-auto border rounded-xl"
            />
          </div>
          <div className="w-[70%] h-[80%] flex flex-col justify-center">
            <div className="flex justify-between items-center">
              <div className="py-2 text-lg">{data.name}</div>
              <div
                className="p-2 text-sm "
                onClick={() => goToGallery(groupId)}
              >
                갤러리
              </div>
            </div>
            <div className="text-xs">{data.description}</div>
            <div className="flex justify-end p-2">
              <div
                className="p-2 text-xs rounded-md bg-brand-red"
                onClick={() => handleCopyClipBoard(data.groupCode)}
              >
                그룹 코드
              </div>
            </div>
          </div>
        </div>
      )}
      {data && <GroupCodeModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default GroupInfo;
