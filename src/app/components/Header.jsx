import { Ms_Madi } from "next/font/google";

// ตั้งค่าฟอนต์ Ms Madi
const msMadi = Ms_Madi({ 
  subsets: ["latin"], 
  weight: "400" // ฟอนต์ Ms Madi จะมีแค่ความหนาระดับ 400 (ปกติ) นะคะ
});

export function Header(){
  return (
    <h1 className={`${msMadi.className} text-6xl text-center mt-20 text-gray-800`}>
      StickiSnap Booth
    </h1>
  );
}