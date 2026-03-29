"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMaxShotFromFileName, getUrlFromFileName } from "../../lib/utils";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { GuidePicture } from "../components/guide-picture/GuidePicture";
import { PageLayout } from "../components/PageLayout";

function CameraContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [images, setImages] = useState<string[]>([]);
  const [maxShots, setMaxShots] = useState(3);
  const [frameUrl, setFrameUrl] = useState("");
  const [peopleCount, setPeopleCount] = useState<string | null>(null);

  useEffect(() => {
    const frameName = searchParams.get("frame");
    if (frameName) {
      const count = getMaxShotFromFileName(frameName);
      setMaxShots(count);
      const url = getUrlFromFileName(frameName, "frame-bucket", `${count}-slot`, "png");
      setFrameUrl(url);
    }
    const people = searchParams.get("size");
    setPeopleCount(people);
  }, [searchParams]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const capture = () => {
    if (!videoRef.current || images.length >= maxShots) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(videoRef.current, 0, 0);

    // 🌟 เปลี่ยนเป็น jpeg ตรงนี้ด้วยค่ะ เพื่อให้หน้า Result โหลดไวๆ 🌟
    const data = canvas.toDataURL("image/jpeg", 0.8);
    const newImages = [...images, data];
    setImages(newImages);

    if (newImages.length === maxShots) {
      localStorage.setItem("photos", JSON.stringify(newImages));

      const frameName = searchParams.get("frame");
      if (frameName) {
        localStorage.setItem("frame", frameName);
      }

      router.push("/result");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <h1 className="text-xl mb-8 text-gray-400">Take Photo ({images.length}/{maxShots})</h1>

      {/* 🌟 โซนด้านบน: ให้มีแค่ เฟรมซ้าย - กล้อง - ไกด์ขวา จะได้อยู่กึ่งกลางกันเป๊ะๆ 🌟 */}
      <div className="flex flex-row items-center justify-center w-full max-w-7xl mx-auto gap-20 px-4">
        
        {/* ฝั่งซ้าย: เฟรม */}
        <div className="flex-1 flex justify-end"> 
          {frameUrl && (
            <img 
              className="max-h-[480px] object-contain bg-white p-1.5 shadow-xl border border-gray-100" 
              src={frameUrl} 
              alt="Frame" 
            />
          )}
        </div>

        {/* ตรงกลาง: เอามาแค่กล้องเพียวๆ เลยค่ะ */}
        <div className="flex-none">
          <video ref={videoRef} autoPlay className="rounded-2xl w-[600px] shadow-lg border-4 border-white object-cover" />
        </div>

        {/* ฝั่งขวา: ไกด์ท่าทาง */}
        <div className="flex-1 flex justify-start">
          <div className="flex flex-col items-center justify-center w-[250px] min-h-[250px] bg-white shadow-md border border-gray-100 p-4 rounded-xl">
             {peopleCount && frameUrl && <GuidePicture peopleCount={peopleCount} images={images} />}
          </div>
        </div>

      </div>

      {/* 🌟 โซนด้านล่าง: ย้ายปุ่ม Capture และรูปพรีวิวมาไว้ตรงนี้แทน 🌟 */}
      <div className="flex flex-col items-center gap-5 mt-8">
        <Button buttonType="primary" onClick={capture}>Capture</Button>
        
        <div className="flex gap-3 h-16">
            {images.map((img, i) => (
            <img key={i} src={img} className="h-full rounded-md shadow-sm border border-gray-100" alt="Preview" />
          ))}
        </div>
      </div>

    </div>
  );
}

export default function CameraPage() {
  return (
    <PageLayout>
      <Header />
      <Suspense fallback={<div>Loading Camera...</div>}>
        <CameraContent />
      </Suspense>
    </PageLayout>
  );
}