'use client'
import { useRouter } from "next/navigation"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"

import { ChooseDesign } from "../components/frame/ChooseDesign"
import { ChoosePeopleSize } from "../components/frame/ChoosePeopleSize"
import { PageLayout } from "../components/PageLayout"
import { Header } from "../components/Header"
import { FourChoiceGrid } from "../components/frame/FourChoiceGrid"

export default function SettingPage(){

    const [userSelection, setUserSelection] = useState({
        frame:null, // name of frame in database
        peopleSize:null // for guide picture to show
    });  
    
    const router = useRouter();
    
    // เราจะแก้ฟังก์ชันนี้ให้รับค่า count เข้ามาตรงๆ เลย
    const handleStart = (selectedCount) => {
        // อัปเดต state ก่อน (เผื่ออยากใช้ที่อื่น)
        setUserSelection(prev => ({...prev, peopleSize: selectedCount}));
        
        // พาไปหน้าต่อไปเลย โดยใช้ selectedCount ที่เพิ่งเลือกมา
        if (userSelection.frame !== null) {
             router.push(`/take-picture?frame=${userSelection.frame}&size=${selectedCount}`);
        }
    }

    const [frameNum, setFrameNum] = useState(null); //How many frames of designs
    const handleFrameNumSelect = (choice)=>{
        setFrameNum(choice)
    }

    return (
        <PageLayout>
        <Header/>
        
        {/* จัดทุกอย่างให้อยู่ตรงกลางจอ */}
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-8 mt-4">

        {/* choose how many frame */}
            {frameNum === null && (
                <FourChoiceGrid>
                    {/* กล่อง 2 Frames */}
                    <div className="flex flex-col items-center p-4 min-h-[300px] rounded-none cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-md group"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(254, 158, 199, 0.15) 100%)',
                            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), inset 5px 5px 15px rgba(254, 158, 199, 0.2)',
                            backdropFilter: 'blur(3px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        onClick={() => handleFrameNumSelect(2)}>
                        <span className="text-2xl font-bold mb-4 mt-2 text-[#FE9EC7]">2 Frames</span>
                        <div className="w-full flex-1 flex flex-row items-center justify-center gap-2 p-1 overflow-hidden">
                            <img src="/frames/2-frames/Food.png" alt="2 Frames 1" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/2-frames/Green.png" alt="2 Frames 2" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/2-frames/Sea.png" alt="2 Frames 3" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                        </div>
                    </div>
                    
                    {/* กล่อง 3 Frames */}
                    <div className="flex flex-col items-center p-4 min-h-[300px] rounded-none cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-md group"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(254, 158, 199, 0.15) 100%)',
                            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), inset 5px 5px 15px rgba(254, 158, 199, 0.2)',
                            backdropFilter: 'blur(3px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        onClick={() => handleFrameNumSelect(3)}>
                        <span className="text-2xl font-bold mb-4 mt-2 text-[#FE9EC7]">3 Frames</span>
                        <div className="w-full flex-1 flex flex-row items-center justify-center gap-2 p-1 overflow-hidden">
                            <img src="/frames/3-frames/Food.png" alt="3 Frames 1" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/3-frames/Green.png" alt="3 Frames 2" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/3-frames/Sea.png" alt="3 Frames 3" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                        </div>
                    </div>
                    
                    {/* กล่อง 4 Frames */}
                    <div className="flex flex-col items-center p-4 min-h-[300px] rounded-none cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-md group"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(254, 158, 199, 0.15) 100%)',
                            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), inset 5px 5px 15px rgba(254, 158, 199, 0.2)',
                            backdropFilter: 'blur(3px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        onClick={() => handleFrameNumSelect(4)}>
                        <span className="text-2xl font-bold mb-4 mt-2 text-[#FE9EC7]">4 Frames</span>
                        <div className="w-full flex-1 flex flex-row items-center justify-center gap-2 p-1 overflow-hidden">
                            <img src="/frames/4-frames/Food.png" alt="4 Frames 1" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/4-frames/Green.png" alt="4 Frames 2" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/4-frames/Sea.png" alt="4 Frames 3" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                        </div>
                    </div>
                    
                    {/* กล่อง 6 Frames */}
                    <div className="flex flex-col items-center p-4 min-h-[300px] rounded-none cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-md group"
                        style={{
                            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 60%, rgba(254, 158, 199, 0.15) 100%)',
                            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.5), inset 5px 5px 15px rgba(254, 158, 199, 0.2)',
                            backdropFilter: 'blur(3px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        onClick={() => handleFrameNumSelect(6)}>
                        <span className="text-2xl font-bold mb-4 mt-2 text-[#FE9EC7]">6 Frames</span>
                        <div className="w-full flex-1 flex flex-row items-center justify-center gap-2 p-1 overflow-hidden">
                            <img src="/frames/6-frames/Food.png" alt="6 Frames 1" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/6-frames/Green.png" alt="6 Frames 2" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                            <img src="/frames/6-frames/Sea.png" alt="6 Frames 3" className="w-[30%] h-auto max-h-48 object-contain drop-shadow-sm" />
                        </div>
                    </div>
                </FourChoiceGrid>
            )}
            
            {/* choose the design */}
            {frameNum !== null && userSelection.frame === null && (
                <ChooseDesign frameNum={frameNum} setUserSelection={setUserSelection}/> 
            )}

            {/* choose how many people for guide picture */}
            {/* สังเกตว่าเราส่ง handleStart เข้าไปด้วย */}
            {frameNum !== null && userSelection.frame !== null && userSelection.peopleSize === null && (
                <ChoosePeopleSize setUserSelection={setUserSelection} handleStart={handleStart}/>
            )}

            {/* ลบปุ่ม Start ด้านล่างสุดออกไปแล้วค่ะ! */}
        </div>
        </PageLayout>
    )
}