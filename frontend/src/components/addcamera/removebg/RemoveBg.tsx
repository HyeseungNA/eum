"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/navigation";

const RemoveBg = () => {
  const [originImageUrl, setOriginImageUrl] = useState<
    string | undefined | null
  >(undefined);
  const [removebgImageUrl, setRemovebgImageUrl] = useState<
    string | undefined | null
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    // localstorage에 있는 값 받아오기
    const originImageURL = localStorage.getItem("Imagepath");
    setOriginImageUrl(originImageURL);
    // localStorage.removeItem("Imagepath");
  }, []);

  // 누끼따주세요 POST 요청 보내기
  const removebgclick = async () => {
    if (!originImageUrl) {
      return;
    }

    const formData = new FormData();
    const blob = await (await fetch(originImageUrl)).blob();
    formData.append("image", blob, "image.png");
    const response = await axios.post(
      "https://www.ailabapi.com/api/cutout/general/universal-background-removal",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "ailabapi-api-key": process.env.NEXT_PUBLIC_AILAB_API_KEY,
        },
      }
    );
    console.log(response.data);
    setRemovebgImageUrl(response.data.data.image_url);
  };

  // 에이징 페이지로 이동
  const goAging = () => {
    router.push(`/addcamera/removeBg/aging`);
  };

  return (
    <>
      <div>
        {originImageUrl ? (
          <Image
            src={originImageUrl}
            alt="originimage"
            width={300}
            height={300}
          />
        ) : (
          <div>사진을 다시 찍어주세요</div>
        )}
      </div>
      <button type="button" onClick={removebgclick}>
        누끼지우기
      </button>
      <div>
        {removebgImageUrl ? (
          <Image
            src={removebgImageUrl}
            alt="removebgimage"
            width={300}
            height={300}
          />
        ) : (
          <div>사진이 맘에 드시면 누끼 따기 버튼을 눌러 주세요</div>
        )}
      </div>
      <button type="button" onClick={goAging}>
        에이징 필터로
      </button>
    </>
  );
};

export default RemoveBg;
