"use client"

import { useEffect, useState, useRef } from 'react';
import { Bg } from "@/contexts/ThemeContext";
import { Draw } from '../core/draw'; 
// import ChangeTheme from './Themes';
import { useTheme } from '@/contexts/ThemeContext';
import { ChangeDarkTheme, ChangeLightTheme } from './Themes';
import RIcon from '@/icons/RectangleIcon';
import TIcon from '@/icons/TriangleIcon';
import LIcon from '@/icons/LineIcon';
import CIcon from '@/icons/CircleIcon';
import LightIcon from '@/icons/LightIcon';
import DarkIcon from '@/icons/DarkIcon';
import ToggleOpenIcon from '@/icons/ToggleOpen';
import ToggleCloseIcon from '@/icons/ToggleClose';

export default function Canvas({ roomId, socket }: { roomId: string | undefined, socket: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [todraw, setTodraw] = useState("Rectangle");
  const drawInstanceRef = useRef<Draw | null>(null);

  const [theme, setTheme] = useState("dark")

  const [menu, setMenu] = useState(true)

  const { bgColor, setBgColor } = useTheme();

//   useEffect(()=>{
//     const bgColorTheme = `bg-${bgColor}`
//   },[bgColor])

  useEffect(() => {
    // console.log("roomcan",roomId)
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Ensure canvas dimensions are set here (if needed)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Initialize your Draw instance with the freshly acquired context.
        if (drawInstanceRef.current) {
          drawInstanceRef.current.cleanup();
        }
        const draw = new Draw(todraw, roomId, "red", ctx, canvas.width, canvas.height, socket );
        draw.initHandlers();
        draw.initializeShapes()
        drawInstanceRef.current = draw;
      } else {
        console.error("Failed to get 2D context");
      }
    }
    return () => {
      drawInstanceRef.current?.cleanup();
    };
  }, [todraw, roomId]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas1" style={{ backgroundColor: bgColor }}></canvas>



      <div className='flex'>


      <div
        style={{
            position: 'fixed',
            top: 10,
            left: 0,
            width: '100%', // Ensure the parent container spans the full width
            display: 'flex',
            justifyContent: 'center', // Center the child horizontally
            zIndex: 1000,
        }}
        >
        <div
            style={{
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme == "dark" ? "#232329" : "#ffffff",
            border: "1px solid gray",
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderRadius: '5px',
            }}
        >
            <button
            onClick={() => setTodraw("Rectangle")}
            style={{
                backgroundColor: todraw === "Rectangle" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
                <RIcon />
            </button>
            <button
            onClick={() => setTodraw("Triangle")}
            style={{
                backgroundColor: todraw === "Triangle" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
                <TIcon />
            </button>
            <button
            onClick={() => setTodraw("Line")}
            style={{
                backgroundColor: todraw === "Line" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
                <LIcon />
            </button>
            <button
            onClick={() => setTodraw("Circle")}
            style={{
                backgroundColor: todraw === "Circle" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
                <CIcon />
            </button>
        </div>
        </div>





        <div
            style={{
                position: 'fixed', // Fix the position
                top: '10px',       // Distance from the top
                right: '10px',     // Distance from the right
                zIndex: 1000,      // Ensure it appears above other elements
                display: 'flex',   // Align buttons horizontally
                gap: '10px',
                backgroundColor: theme == "dark" ? "#232329" : "#ffffff",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingTop: "5px",
                paddingBottom: "5px",
                borderRadius: "5px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
        >
            <button
            onClick={() => {setTheme("light")
                setBgColor(Bg.five)
            }}
            style={{
                backgroundColor: theme === "light" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
            <LightIcon />
            </button>
            <button
            onClick={() => {setTheme("dark")
                setBgColor(Bg.ten)
            }
            }
            style={{
                backgroundColor: theme === "dark" ? '#403E6A' : '',
                margin: '0 5px',
                padding: '10px',
                borderRadius: '5px',
                cursor: "pointer"
            }}
            className='hover:bg-[#bbb]'
            >
            <DarkIcon />
            </button>
        </div>



        </div>





        <div>
        <button
            onClick={() => {
                setMenu((menu) => !menu);
            }}
            style={{
                position: 'fixed',
                top: '5px', // Adjust to avoid overlap with the first button row
                left: '10px',
                zIndex: 2000,
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                background: 'none', // Remove background
                borderRadius: '5px', // Remove border
                padding: 0, // Optional: Remove padding if needed
                cursor: 'pointer', // Optional: Add pointer cursor for better UX
                backgroundColor: theme == "dark" ? "#232329" : "#ffffff",
            }}
            >
            {menu ? <ToggleOpenIcon /> : <ToggleCloseIcon />}
            </button>
        </div>



      <div style={{ marginTop: '10px' }} className="fixed top-20">
        {menu == true ? <div>
            {theme === "light" ? <ChangeLightTheme /> : <ChangeDarkTheme />}
            </div>:""}
      </div>
    </div>
  );
}