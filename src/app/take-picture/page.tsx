"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
      
      <h1 className="text-5xl mb-8 text-pink-400">
        StickiSnap Booth
      </h1>

      <div className="w-[400px] h-[250px] bg-gray-200 rounded-xl flex items-center justify-center">
        Camera Preview
      </div>

      <button
        onClick={() => router.push("/members")}
        className="mt-6 bg-pink-300 px-6 py-2 rounded-full"
      >
        Ready
      </button>
    </div>
  );
}