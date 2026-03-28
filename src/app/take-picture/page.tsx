"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMaxShotFromFileName, getUrlFromFileName } from "../../lib/utils";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { GuidePicture } from "../components/guide-picture/GuidePicture";

// 1. Move the logic into a separate inner component
function CameraContent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [images, setImages] = useState<string[]>([]);
  const [maxShots, setMaxShots] = useState(3);
  const [frameUrl, setFrameUrl] = useState("");
  const [peopleCount, setPeopleCount] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  // Load URL Params
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

  // Setup Camera
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
    
    // Cleanup function to stop camera when leaving page
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
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

    const data = canvas.toDataURL("image/png");
    setImages((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (images.length === maxShots && maxShots > 0) {
      setIsDone(true);
      // Optional: auto-navigate or save to store here
    }
  }, [images, maxShots]);

  return (
    <div className="grid grid-cols-4 max-w-full">
      <div className="content-start justify-items-center">
        {frameUrl !== "" && (
          <img className="grow-1 shick-1 max-h-2/3" src={frameUrl} alt="Frame" />
        )}
      </div>

      <div className="col-span-2 flex flex-col items-center p-6 gap-4">
        <h1 className="text-2xl">Take Photo ({images.length}/{maxShots})</h1>

        <video ref={videoRef} autoPlay className="rounded-xl" />

        {!isDone && (
          <button 
            className="rounded-full py-1 px-4 border-4 cursor-pointer hover:bg-gray-100 transition-colors" 
            onClick={capture}
          >
            Capture
          </button>
        )}

        {/* preview */}
        <div className="flex gap-2">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-16 rounded" alt={`Captured ${i}`} />
          ))}
        </div>
      </div>

      <div className="content-start justify-items-center">
        <GuidePicture peopleCount={peopleCount} images={images} />
      </div>
    </div>
  );
}

// 2. The default export wraps the content in Suspense
export default function CameraPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="flex justify-center p-10">Loading Camera...</div>}>
        <CameraContent />
      </Suspense>
    </>
  );
}