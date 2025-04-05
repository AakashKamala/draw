import { useTheme } from "@/contexts/ThemeContext";
import { Bg } from "@/contexts/ThemeContext";

import React from "react";

export function ChangeLightTheme() {
  const { setBgColor, bgColor, setStrokeColor, strokeColor } = useTheme();

  const DefaultButtonStyles= "w-6 h-6 rounded mx-2 border-1 border-gray-200 cursor-pointer"

  return (
    <div className="bg-[#FFFFFF] text-black">
      <div>
        <h2>Choose Background Color</h2>
        <button style={{
            backgroundColor: Bg.one
        }} className={DefaultButtonStyles}
          onClick={() => {
            setBgColor(Bg.one);
          }}
        >
        </button>
        <button style={{
            backgroundColor: Bg.two
        }} className={DefaultButtonStyles}
          onClick={() => {
            setBgColor(Bg.two);
          }}
        >
        </button>
        <button style={{
            backgroundColor: Bg.three
        }} className={DefaultButtonStyles}
          onClick={() => {
            setBgColor(Bg.three);
          }}
        >
        </button>
        <button style={{
            backgroundColor: Bg.four
        }} className={DefaultButtonStyles}
          onClick={() => {
            setBgColor(Bg.four);
          }}
        >
        </button>
        <button style={{
            backgroundColor: Bg.five
        }} className={DefaultButtonStyles}
          onClick={() => {
            setBgColor(Bg.five);
          }}
        >
        </button>

      </div>
      
      <div>
        <h2>Choose Stroke Color</h2>
        {/* <button onClick={() => setStrokeColor("red")}>stroke-red</button>
        <button onClick={() => setStrokeColor("black")}>stroke-black</button>
        <button onClick={() => setStrokeColor("green")}>stroke-green</button> */}
      </div>
    </div>
  );
}


export function ChangeDarkTheme() {
    const { setBgColor, bgColor, setStrokeColor, strokeColor } = useTheme();

    const DefaultButtonStyles= "w-6 h-6 rounded mx-2 border-1 border-gray-700 cursor-pointer"
  
    return (
      <div className="bg-[#232329] text-white">
        <div>
          <h2>Choose Background Color</h2>
          <button style={{
              backgroundColor: Bg.six
          }} className={DefaultButtonStyles}
            onClick={() => {
              setBgColor(Bg.six);
            }}
          >
          </button>
          <button style={{
              backgroundColor: Bg.seven
          }} className={DefaultButtonStyles}
            onClick={() => {
              setBgColor(Bg.seven);
            }}
          >
          </button>
          <button style={{
              backgroundColor: Bg.eight
          }} className={DefaultButtonStyles}
            onClick={() => {
              setBgColor(Bg.eight);
            }}
          >
          </button>
          <button style={{
              backgroundColor: Bg.nine
          }} className={DefaultButtonStyles}
            onClick={() => {
              setBgColor(Bg.nine);
            }}
          >
          </button>
          <button style={{
              backgroundColor: Bg.ten
          }} className={DefaultButtonStyles}
            onClick={() => {
              setBgColor(Bg.ten);
            }}
          >
          </button>
  
        </div>
        
        <div>
          <h2>Choose Stroke Color</h2>
          {/* <button onClick={() => setStrokeColor("red")}>stroke-red</button>
          <button onClick={() => setStrokeColor("black")}>stroke-black</button>
          <button onClick={() => setStrokeColor("green")}>stroke-green</button> */}
        </div>
      </div>
    );
  }