"use client";

import { useEffect, useState } from "react";
import { createPhotoStrip } from "../../lib/capture";
import { saveAs } from "file-saver";

export default function ResultPage() {
  const [finalImg, setFinalImg] = useState<string>("");

  useEffect(() => {
    async function generate() {
      const photos = JSON.parse(localStorage.getItem("photos") || "[]");
      const frame = localStorage.getItem("frame") || "";

      if (!photos.length || !frame) return;

      const result = await createPhotoStrip(photos, frame);
      setFinalImg(result);
    }

    generate();
  }, []);

  const download = () => {
    if (!finalImg) return;
    saveAs(finalImg, "stickisnap.png");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-3xl">Result</h1>

      {finalImg && (
        <img src={finalImg} className="w-[300px] rounded-xl shadow-lg" />
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