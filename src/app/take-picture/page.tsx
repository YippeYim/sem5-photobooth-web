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

  // แก้ไขเฉพาะฟังก์ชัน capture ในหน้า take-picture นะคะ
const capture = () => {
  if (!videoRef.current || images.length >= maxShots) return;

  const canvas = document.createElement("canvas");
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(videoRef.current, 0, 0);

  const data = canvas.toDataURL("image/png");
  const newImages = [...images, data];
  setImages(newImages);

  // 🌟 เมื่อถ่ายครบแล้ว บันทึกข้อมูลให้ตรงกับที่หน้า Result เรียกใช้
  if (newImages.length === maxShots) {
    // 1. เปลี่ยนจาก sessionStorage เป็น localStorage
    // 2. เปลี่ยนชื่อ key จาก "captured_images" เป็น "photos"
    localStorage.setItem("photos", JSON.stringify(newImages));

    // 3. บันทึกชื่อเฟรมจาก URL Parameter ลงไปด้วย หน้า Result จะได้รู้ว่าต้องใช้เฟรมไหน
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

      {/* 🌟 ปรับแก้อันนี้: ใช้ gap-10 และ max-w-7xl เพื่อให้จัดเรียงได้สมดุลขึ้น */}
      <div className="flex flex-row items-start justify-center w-full max-w-7xl mx-auto gap-20 px-4">
        
        {/* ฝั่งซ้าย: เฟรมลอยๆ (ลบ pr-4 ออกแล้ว เพื่อให้ระยะห่างซ้าย-ขวาเท่ากัน) */}
        <div className="flex-1 flex justify-end"> 
          {frameUrl && (
            <img 
              className="max-h-[480px] object-contain bg-white p-1.5 shadow-xl border border-gray-100" 
              src={frameUrl} 
              alt="Frame" 
            />
          )}
        </div>

        {/* ตรงกลาง: กล้อง (เปลี่ยนจาก flex-[2] เป็น flex-none เพื่อให้มันไม่ไปเบียดสัดส่วนชาวบ้าน) */}
        <div className="flex-none flex flex-col items-center gap-5">
          <video ref={videoRef} autoPlay className="rounded-2xl w-[600px] shadow-lg border-4 border-white object-cover" />
          <Button buttonType="primary" onClick={capture}>Capture</Button>
          
          <div className="flex gap-3 h-16">
             {images.map((img, i) => (
              <img key={i} src={img} className="h-full rounded-md shadow-sm border border-gray-100" alt="Preview" />
            ))}
          </div>
        </div>

        {/* ฝั่งขวา: ไกด์ท่าทาง */}
        <div className="flex-1 flex justify-start">
          <div className="flex flex-col items-center justify-center w-[250px] min-h-[250px] bg-gray-50 shadow-md border border-gray-100 p-4">
             {peopleCount && frameUrl && <GuidePicture peopleCount={peopleCount} images={images} />}
          </div>
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