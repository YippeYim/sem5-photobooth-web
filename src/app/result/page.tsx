"use client";

import { useEffect, useState } from "react";
import { createPhotoStrip } from "../../lib/capture";
import { saveAs } from "file-saver";

export default function ResultPage() {
  const [finalImg, setFinalImg] = useState("");

  useEffect(() => {
    const photos = JSON.parse(localStorage.getItem("photos") || "[]");
    const frame = localStorage.getItem("frame");

    if (!photos.length || !frame) return;

    // 👉 map path ตามที่คุณใช้จริง
    const framePathMap: Record<string, string> = {
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

    createPhotoStrip(photos, framePath).then(setFinalImg);
  }, []);

  const download = () => {
    saveAs(finalImg, "stickisnap.png");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl">Result</h1>

      {finalImg && (
        <img src={finalImg} className="rounded-xl shadow-lg w-[300px]" />
      )}

      <button
        onClick={download}
        className="bg-pink-300 px-6 py-2 rounded-full"
      >
        Download
      </button>
    </div>
  );
}