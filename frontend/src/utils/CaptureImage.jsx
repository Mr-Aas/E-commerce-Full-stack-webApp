import { useEffect, useRef, useState } from "react";

export default function CaptureImage({ onCapture }) {
  const videoRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;

      setPreview(URL.createObjectURL(blob)); // ✅ safe
      onCapture(blob);

      stopCamera(); // 🔥 stop camera after capture
    }, "image/jpeg");
  };

  const retake = () => {
    setPreview(null);
    onCapture(null);

    startCamera(); // 🔥 restart camera
  };

  return (
    <div className="space-y-2">
      {!preview ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-48 bg-black rounded-xl"
          />
          <button
            type="button"
            onClick={captureImage}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Capture Image
          </button>
        </>
      ) : (
        <>
          <img
            src={preview}
            className="w-full h-[160px] object-cover rounded"
          />
          <button
            type="button"
            onClick={retake}
            className="bg-red-500 text-white p-2 rounded"
          >
            Retake
          </button>
        </>
      )}
    </div>
  );
}