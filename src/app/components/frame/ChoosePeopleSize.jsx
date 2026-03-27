"use client";

import { useState } from "react";
import { Button } from "../Button";

export function ChoosePeopleSize({setUserSelection}) {
  const [count, setCount] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <h1 className="text-3xl mb-6">How many members?</h1>

      <div className="flex items-center gap-6 text-4xl">
        <button onClick={() => setCount(Math.max(1, count - 1))}>{"<"}</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>{">"}</button>
      </div>
      
      <Button onClick={()=>setUserSelection(prev=>({...prev, peopleSize:count}))}>Select</Button>

    </div>
  );
}