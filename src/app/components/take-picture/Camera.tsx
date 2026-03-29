"use client";

import { useEffect, useRef } from "react";
// นำเข้า Button component มาใช้ (เช็ค path ให้ตรงกับโฟลเดอร์ของคุณด้วยนะคะ)
import { Button } from "../Button"; 

export default function Camera({
  onCapture,
}: {
  onCapture: (img: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();
  }, []);

  const capture = () => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    // 🌟 เปลี่ยนจาก image/png เป็น image/jpeg และใส่คุณภาพ 0.8 (80%) ตรงนี้ค่ะ 🌟
    // ไฟล์จะเบาลงเยอะมาก ทำให้หน้า Result โหลดรูปมาต่อกันได้ไวขึ้นสุดๆ!
    const img = canvas.toDataURL("image/jpeg", 0.8);
    onCapture(img);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <video ref={videoRef} autoPlay className="rounded-2xl w-[450px] shadow-lg border-4 border-white" />
      
      {/* เปลี่ยนมาใช้ Button เหมือนหน้าแรก */}
      <Button buttonType="primary" onClick={capture}>
        Capture
      </Button>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}