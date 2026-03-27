import { useStorage } from "../../hooks/useStorage";
import ImageRoller from "./ImageRoller";
import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { Button } from "../Button";
import { getFileNameFromUrl } from "../../../lib/utils";

export function ChooseDesign({frameNum ,setUserSelection}) {
    const [ selectedIndex, setSelectedIndex] = useState(0);
    
    // load the design picture and make the select section then set the selection to file name
    //
    // don't forget using ()=>setUserSelection(prev=>({...prev, frame:"filename"}))
    //


    // mock the frame
    const [images, setImages] = useState([]);
    const { getAllImageUrlFromFolder} = useStorage();
    
    useEffect(()=>{
    const fetchFrames = async () => {
      try {
        const urls = await getAllImageUrlFromFolder(`${frameNum}-slot`, "frame-bucket");
        setImages(urls);
      } catch (error) {
        console.error("Failed to fetch frames:", error);
      }
    };

    fetchFrames();
    },[])
    
    const handleClick = ()=>{
        const filename = getFileNameFromUrl(images[selectedIndex]);
        setUserSelection(prev=>({...prev, frame: filename}));
        // console.log(images[selectedIndex])
    }
    
    return <>
        <ImageRoller images={images} setSelectedIndex={setSelectedIndex}/>
        <Button onClick={handleClick}>Select</Button>
    </>
}