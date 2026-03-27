"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [maxShots, setMaxShots] = useState(3);

  // ✅ โหลดจำนวน frame
  useEffect(() => {
    const count = Number(localStorage.getItem("frameCount")) || 3;
    setMaxShots(count);
  }, []);

  // ✅ เปิดกล้อง
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  // ✅ ถ่ายรูป
  const capture = () => {
    if (!videoRef.current) return;
    if (images.length >= maxShots) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(videoRef.current, 0, 0);

    const data = canvas.toDataURL("image/png");
    setImages((prev) => [...prev, data]);
  };

  // ✅ ครบแล้วไป result
  useEffect(() => {
    if (images.length === maxShots) {
      localStorage.setItem("photos", JSON.stringify(images));
      router.push("/result");
    }
  }, [images]);

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h1 className="text-2xl">Take Photo ({images.length}/{maxShots})</h1>

      <video
        ref={videoRef}
        autoPlay
        className="w-[300px] rounded-xl"
      />

      <button
        onClick={capture}
        className="bg-pink-300 px-6 py-2 rounded-full"
      >
        Capture
      </button>

      {/* preview */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <img key={i} src={img} className="w-16 rounded" />
        ))}
      </div>
    </div>
  );
}