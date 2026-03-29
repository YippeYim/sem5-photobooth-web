import { useState } from 'react';

export default function ImageRoller({ images, setSelectedIndex}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
    setSelectedIndex(nextIndex); 
  };

  const goRight = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedIndex(nextIndex); 
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto gap-6 mt-10">
      
      <div className="flex flex-row items-center justify-center w-full gap-8">
        
        {/* ปุ่มลูกศรซ้าย */}
        <button 
          onClick={goLeft}
          className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 z-30 text-[#044ACF] font-bold text-xl"
        >
          ←
        </button>

        {/* 1. กรอบรูปสีขาวเล็กๆ แบบสติกเกอร์ (ไม่มีเทปกาวแล้วค่ะ) */}
        <div className="relative w-[45%] sm:w-1/3 lg:w-1/4 bg-white p-1 shadow-2xl border border-gray-100">
          
          {/* ลบเทปกาวทั้งสองอันออกเรียบร้อยค่ะ */}

          {/* 2. Viewport (พื้นที่สำหรับโชว์รูป) */}
          <div className="overflow-hidden w-full h-full relative">
            
            {/* 3. The Rolling Track (รางเลื่อน) */}
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div key={i} className="w-full h-full flex-shrink-0 bg-white">
                  <img 
                    src={src} 
                    className="w-full h-full object-contain" 
                    alt={`Slide ${i}`} 
                  />
                </div>
              ))}
            </div>
            
          </div>
        </div>

        {/* ปุ่มลูกศรขวา */}
        <button 
          onClick={goRight}
          className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 z-30 text-[#044ACF] font-bold text-xl"
        >
          →
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-3 w-3 rounded-full transition-all ${currentIndex === i ? 'bg-[#FE9EC7] w-8' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}