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
        peopleSize:null});  // for guide picture to show
    
    // mockup
    // useEffect(()=>{
    //     setUserSelection({frame:"frme123", peopleSize:2});
    // },[])

    const router = useRouter();
    const handleStart = () => {
        const missingSelection = Object.values(userSelection).some(value=>value===null);
        if (missingSelection) return

        router.push(`/take-picture?frame=${userSelection.frame}&size=${userSelection.peopleSize}`);
    }

    const [frameNum, setFrameNum] = useState(null); //How many frames of designs
    const handleFrameNumSelect = (choice)=>{
        setFrameNum(choice)

        // mock
        // setUserSelection(prev=>({...prev, frame:"tttrt"}));
    }

    return <>
        <PageLayout>
        <Header/>
        
        {/* choose how many frame */}
        {frameNum === null && (
            <FourChoiceGrid>
                <div className="flex flex-col justify-end items-center pb-4 text-[clamp(1.5rem,6vw,4rem)] border border-black rounded rounded-[3rem] bg-white"
                    onClick={()=>handleFrameNumSelect(2)}>2 Frames</div>
                <div className="flex flex-col justify-end items-center pb-4 text-[clamp(1.5rem,6vw,4rem)] border border-black rounded rounded-[3rem] bg-white"
                    onClick={()=>handleFrameNumSelect(3)}>3 Frames</div>
                <div className="flex flex-col justify-end items-center pb-4 text-[clamp(1.5rem,6vw,4rem)] border border-black rounded rounded-[3rem] bg-white"
                    onClick={()=>handleFrameNumSelect(4)}>4 Frames</div>
                <div className="flex flex-col justify-end items-center pb-4 text-[clamp(1.5rem,6vw,4rem)] border border-black rounded rounded-[3rem] bg-white"
                    onClick={()=>handleFrameNumSelect(6)}>6 Frames</div>
            </FourChoiceGrid>
            )}
        
        {/* choose the design */}
        {frameNum !== null && userSelection.frame === null && (
            <ChooseDesign frameNum={frameNum} setUserSelection={setUserSelection}/> // set the frame to match the database file name
        )}

        {/* choose how many people for guide picture */}
        {frameNum !== null && userSelection.frame !== null && userSelection.peopleSize === null && (
            <ChoosePeopleSize setUserSelection={setUserSelection} handleStart={handleStart}/>
        )}
    
        {/* the start button that change page when all setting done! */}
        {frameNum !== null && userSelection.frame !== null &&(
            <Button buttonType="primary" onClick={handleStart} >
                Start
            </Button>
        )}
        
        </PageLayout>
    </>
};