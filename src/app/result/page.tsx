"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPhotoStrip } from "../../lib/capture"; 
import { saveAs } from "file-saver";

import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { Button } from "../components/Button";

export default function ResultPage() {
  const [finalImg, setFinalImg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const photos = JSON.parse(localStorage.getItem("photos") || "[]");
    const frame = localStorage.getItem("frame");

    if (!photos.length || !frame) {
      return;
    }

    const framePathMap: Record<string, string> = {
      "2sea": "/frames/2-frames/Sea.png",
      "2green": "/frames/2-frames/Green.png",
      "2food": "/frames/2-frames/Food.png",
      "3sea": "/frames/3-frames/Sea.png",
      "3green": "/frames/3-frames/Green.png",
      "3food": "/frames/3-frames/Food.png",
      "4sea": "/frames/4-frames/Sea.png",
      "4green": "/frames/4-frames/Green.png",
      "4food": "/frames/4-frames/Food.png",
      "6sea": "/frames/6-frames/Sea.png",
      "6green": "/frames/6-frames/Green.png",
      "6food": "/frames/6-frames/Food.png",
      "2-sea": "/frames/2-frames/Sea.png",
      "2-green": "/frames/2-frames/Green.png",
      "2-food": "/frames/2-frames/Food.png",
      "3-sea": "/frames/3-frames/Sea.png",
      "3-green": "/frames/3-frames/Green.png",
      "3-food": "/frames/3-frames/Food.png",
      "4-sea": "/frames/4-frames/Sea.png",
      "4-green": "/frames/4-frames/Green.png",
      "4-food": "/frames/4-frames/Food.png",
      "6-sea": "/frames/6-frames/Sea.png",
      "6-green": "/frames/6-frames/Green.png",
      "6-food": "/frames/6-frames/Food.png",
    };

    const framePath = framePathMap[frame];

    if (framePath) {
      createPhotoStrip(photos, framePath).then(setFinalImg);
    }
  }, []);

  const download = () => {
    if (finalImg) {
      saveAs(finalImg, "stickisnap.png"); 
    }
  };

  return (
    <PageLayout>
      <Header />
      <div className="flex flex-col items-center justify-center w-full mt-16 gap-8">
        
        <div className="relative group">
          {finalImg ? (
            <img 
              src={finalImg} 
              className="w-[350px] bg-white p-1.5 shadow-xl border border-gray-200 transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-2xl cursor-pointer" 
              alt="Final Photo Strip"
            />
          ) : (
            <div className="w-[300px] h-[500px] bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
              Wait a minute...
            </div>
          )}
        </div>

        <div className="flex gap-4 mb-20 pt-6">
  <Button buttonType="primary" onClick={download}>
    Download Image
  </Button>
  {/* 🌟 เปลี่ยนจาก secondary เป็น primary ตรงนี้ค่ะ 🌟 */}
  <Button buttonType="primary" onClick={() => router.push("/")}>
    Take New Photo
  </Button>
</div>
      </div>
    </PageLayout>
  );
}