// 카메라 가져오기
const startCamera = async (
  videoRef: React.RefObject<HTMLVideoElement>,
  setIsCameraReady: React.Dispatch<React.SetStateAction<boolean>>,
  isFrontCamera: boolean // 기본값은 전 카메라
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: !isFrontCamera ? "user" : { exact: "environment" } },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraReady(true);

      // 비디오의 너비와 높이 가져오기
      const { videoWidth, videoHeight } = videoRef.current;

      // 비디오 화면이 꽉 차도록 조절하기
      const videoRatio = videoWidth / videoHeight;
      const windowRatio = window.innerWidth / window.innerHeight;
      if (videoRatio > windowRatio) {
        videoRef.current.style.width = "100%";
        videoRef.current.style.height = "auto";
      } else {
        videoRef.current.style.width = "auto";
        videoRef.current.style.height = "100%";
      }
      // 좌우 반전 설정
      videoRef.current.style.transform = isFrontCamera
        ? "scaleX(1)" // 전면 카메라일 경우 좌우 반전
        : "scaleX(-1)";
      // 1:1 비율 조절
      videoRef.current.style.objectFit = "cover";
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = "100%";
    }
  } catch (err) {
    alert("카메라 권한이 없습니다!");
    // startCamera(videoRef, setIsCameraReady, isFrontCamera);
  }
};

// 카메라 멈추기
const stopCamera = (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    const stream = videoRef.current.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }
};

// 카메라 사진찰영
const captureImage = async (videoRef: React.RefObject<HTMLVideoElement>) => {
  if (videoRef.current) {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext("2d");

    // 좌우 반전된 이미지를 원래대로 되돌리기 위해 좌우 반전된 캔버스에 그림
    if (videoRef.current.style.transform === "scaleX(-1)") {
      context?.translate(canvas.width, 0);
      context?.scale(-1, 1);
    }

    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
    // return new Promise<Blob>((resolve) => {
    //   canvas.toBlob((blob) => {
    //     resolve(blob!);
    //   }, "image/png");
    // });
  } else {
    throw new Error("Video element is not available.");
  }
};

export { startCamera, stopCamera, captureImage };
