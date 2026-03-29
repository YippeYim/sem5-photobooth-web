"use client";

import { useState } from "react";
import { Button } from "../Button";

export function ChoosePeopleSize({setUserSelection, handleStart}) {
  // เปลี่ยนชื่อ state กลับมาเป็น count ตามโค้ดเดิมของคุณค่ะ
  const [count, setCount] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center w-full py-12 gap-8">
      
      <h1 className="text-4xl font-bold text-[#044ACF] drop-shadow-sm">
        How many members?
      </h1>

      {/* กลุ่มปุ่มเลือกจำนวนคน 1, 2, 3 แทนการใช้ + / - */}
      <div className="flex flex-row gap-6 sm:gap-10 mt-6">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setCount(num)}
            className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] text-4xl font-bold transition-all duration-300 
              ${count === num 
                ? 'bg-[#FE9EC7] text-white border-4 border-white scale-110 shadow-xl' // สถานะตอนถูกเลือก (สีชมพู เด้งขึ้น)
                : 'bg-white text-[#044ACF] border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-[#FE9EC7]' // สถานะปกติ (สีขาว)
              }`}
          >
            {num}
          </button>
        ))}
      </div>
      
      <div className="mt-20">
        {/* ใช้คอมโพเนนต์ Button เดิมของคุณ และเรียก handleStart เหมือนเดิมเป๊ะค่ะ */}
        <Button 
            buttonType="primary" 
            onClick={() => handleStart(count)}
        >
            Select
        </Button>
      </div>

    </div>
  );
}