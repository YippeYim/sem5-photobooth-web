"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getMaxShotFromFileName, getUrlFromFileName } from "../../lib/utils";
import { useSearchParams } from "next/navigation";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { GuidePicture } from "../components/guide-picture/GuidePicture";
import { Result } from "../components/Result";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);
  const [maxShots, setMaxShots] = useState(3);

  const searchParams = useSearchParams();
  
  // If your URL is localhost:3000/select?type=3-slot
  // ✅ โหลดจำนวน frame
  const [frameUrl , setFrameUrl] = useState("");
  const [peopleCount, setPeopleCount] = useState(null);
  useEffect(() => {
    const frameName = searchParams.get("frame");
    const count = getMaxShotFromFileName(frameName);
    setMaxShots(count);
    

    const frameUrl = getUrlFromFileName(frameName, "frame-bucket", `${count}-slot` , "png");
    setFrameUrl(frameUrl);
    console.log(frameUrl);

    const people = searchParams.get("size");
    setPeopleCount(people);
  
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
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    if (images.length === maxShots) {
      // localStorage.setItem("photos", JSON.stringify(images));
      // router.push("/result");
      setIsDone(true);
    }
  }, [images]);


  return (<>
    <Header/>
    <div className="grid grid-cols-4 max-w-full">
      <div className="content-start justify-items-center">
        {frameUrl !== "" && (
          <img className="grow-1 shick-1 max-h-2/3" src={frameUrl}/>
        )}
      </div>

      <div className="col-span-2 flex flex-col items-center p-6 gap-4">
        <h1 className="text-2xl">Take Photo ({images.length}/{maxShots})</h1>

        <video
          ref={videoRef}
          autoPlay
          className="rounded-xl"
        />

        {!isDone && (<button className="rounded-full py-1 px-4 
                  border-4 cursor-pointer" onClick={capture}>Capture</button>
        )}

        {isDone && (<>
          <Result imgUrl={images}></Result>
        
        </>)}

        {/* preview */}
        <div className="flex gap-2">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-16 rounded" />
          ))}
        </div>
      </div>

      <div className="content-start justify-items-center">
          <GuidePicture peopleCount={peopleCount} images={images}/>
      </div>
    </div>
  </>
  );
}