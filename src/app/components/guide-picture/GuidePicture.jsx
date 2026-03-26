import { useEffect, useState } from "react"
import { useStorage } from "@/app/hooks/useStorage";
import Image from "next/image";
import { usePicture } from "../take-picture/usePicture";
import { Button } from "../Button";

export function GuidePicture() {
    const [ peopleCount , setPeopleCount ] = useState(1);
    const { getAllImageUrlFromFolder } = useStorage();
    
    const [ urls , setUrl] = useState([]);
    const [ localPhoto , setLocalPicture ] = useState({file:null});
    const { downloadPicture, sharePicture, createTestFile} = usePicture();

    const handleClick = async () => {
        const image = await getAllImageUrlFromFolder(peopleCount+'-people');
        setUrl(image);
        // console.log(image);
    }

    // Fix 1: Wrap the test file creation in a useEffect so it only runs ONCE
    useEffect(() => {
        const initTestFile = async () => {
            const file = await createTestFile();
            setLocalPicture({ file });
        };
        initTestFile();
    }, []); // Empty array means "only run on page load"

    return <>
    <ul className="">
    <li><button onClick={()=>setPeopleCount(1)}>1 person</button></li>
    <li><button onClick={()=>setPeopleCount(2)}>2 person</button></li>
    <li><button onClick={()=>setPeopleCount(3)}>3 person</button></li>
    <li><button onClick={()=>setPeopleCount(4)}>4 person</button></li>
    <li><button onClick={handleClick}>load image</button></li>

    <Button buttonType="primary" onClick={()=>sharePicture(urls[0], localPhoto.file)}>Click to Share</Button>
    <Button buttonType="primary" onClick={()=>downloadPicture(urls[0])}>Click to download</Button>


    </ul>
        {urls[0] === "" ? null : (
              <Image 
                src={urls[0]} 
                alt="pic" 
                width={500} 
                height={500} // Next.js Image requires height if not using 'fill'
              />
        )}
    </>
}