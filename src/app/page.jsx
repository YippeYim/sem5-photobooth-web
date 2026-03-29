'use client'
import { useEffect, useState } from "react";
import { Button } from "../app/components/Button";
import { useRouter } from "next/navigation";
import { useStorage } from "./hooks/useStorage";

import { Header } from "./components/Header";
import { PageLayout } from "./components/PageLayout";

export default function Home() {
  const { getAllImageUrlFromFolder } = useStorage();
  const [frameUrls, setFrameUrls] = useState([]);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const urls = await getAllImageUrlFromFolder("3-slot", "frame-bucket");
        setFrameUrls(urls);
      } catch (error) {
        console.error("Failed to fetch frames:", error);
      }
    };
    fetchFrames();
  }, []);
  
  const router = useRouter();
  const handleClick = () => {
    router.push("/photo-setting");
  };

return (
    <PageLayout>
      {/* 🌟 ลบ style พื้นหลังออกให้หมด ปล่อยให้ PageLayout โชว์พื้นหลังออริจินัลของแอป 🌟 */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        <Header />
        
        <div className="flex flex-row justify-center items-center w-full max-w-4xl mx-auto p-16 md:p-20 gap-8 md:gap-12">
          
          {frameUrls.length >= 3 ? (
            <>
              {/* 📸 กรอบที่ 1 (เอียงซ้าย) */}
              <div className="relative w-1/3 -rotate-3 hover:rotate-0 hover:z-20 transition-all duration-300 hover:-translate-y-4 cursor-pointer group">
                <div className="absolute -top-3 -left-4 w-18 h-6 bg-pink-300/80 -rotate-[15deg] z-10 shadow-sm rounded-sm"></div>
                <div className="absolute -bottom-3 -right-2 w-16 h-6 bg-yellow-300/80 -rotate-[5deg] z-10 shadow-sm rounded-sm"></div>
                <img src={frameUrls[0]} className="w-full h-auto shadow-xl border-8 border-white bg-white group-hover:shadow-2xl transition-shadow" alt="Frame 1" />
              </div>

              {/* 📸 กรอบที่ 2 (ตรงกลาง เอียงนิดๆ) */}
              <div className="relative w-1/3 rotate-2 hover:rotate-0 hover:z-20 transition-all duration-300 hover:-translate-y-4 cursor-pointer group mt-8">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-blue-300/80 rotate-[5deg] z-10 shadow-sm rounded-sm"></div>
                <img src={frameUrls[1]} className="w-full h-auto shadow-xl border-8 border-[#fcfcfc] bg-white group-hover:shadow-2xl transition-shadow" alt="Frame 2" />
              </div>

              {/* 📸 กรอบที่ 3 (เอียงขวา) */}
              <div className="relative w-1/3 rotate-6 hover:rotate-0 hover:z-20 transition-all duration-300 hover:-translate-y-4 cursor-pointer group">
                <div className="absolute -top-3 -right-4 w-16 h-6 bg-green-300/80 rotate-[20deg] z-10 shadow-sm rounded-sm"></div>
                <div className="absolute -bottom-4 -left-2 w-18 h-6 bg-purple-300/80 rotate-[10deg] z-10 shadow-sm rounded-sm"></div>
                <img src={frameUrls[2]} className="w-full h-auto shadow-xl border-8 border-white bg-white group-hover:shadow-2xl transition-shadow" alt="Frame 3" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-400 animate-pulse font-medium bg-white/50 p-8 rounded-3xl">
              <span className="text-4xl mb-4">🪄</span>
              Loading...
            </div>
          )}

        </div>

        <div className="flex w-full justify-center pb-20 mt-4">
          <Button onClick={handleClick} buttonType="primary">Start Photobooth</Button>
        </div>
      </div>
    </PageLayout>
  );
}