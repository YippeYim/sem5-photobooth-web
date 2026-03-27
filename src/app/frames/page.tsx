"use client";

import { useRouter } from "next/navigation";

export default function FramesPage() {
  const router = useRouter();

  const frames = [
    { src: "/frames/green/frame2.jpg", count: 2 },
    { src: "/frames/green/frame3.png", count: 3 },
    { src: "/frames/green/frame4.png", count: 4 },
    { src: "/frames/green/frame6.png", count: 6 },
  ];

  const selectFrame = (frame: string, count: number) => {
    localStorage.setItem("frame", frame);
    localStorage.setItem("frameCount", String(count));

    router.push("/camera");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center mb-6">Choose Frame</h1>

      <div className="grid grid-cols-2 gap-4">
        {frames.map((f, i) => (
          <img
            key={i}
            src={f.src}
            onClick={() => selectFrame(f.src, f.count)}
            className="cursor-pointer rounded-xl shadow hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}