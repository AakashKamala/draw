// "use client"

// import { useEffect, useState, useRef } from 'react';
// import { Draw } from '../core/draw'; 

// export default function Canvas({ roomId }: { roomId: string | undefined }) {
//     const [todraw, setTodraw] = useState("Rectangle");
//     const drawInstanceRef = useRef<Draw | null>(null);

//     useEffect(() => {
//         if (drawInstanceRef.current) {
//             drawInstanceRef.current.cleanup();
//         }

//         const draw = new Draw(todraw, roomId);
//         draw.initHandlers();
//         drawInstanceRef.current = draw;
        
//         return () => {
//             if (drawInstanceRef.current) {
//                 drawInstanceRef.current.cleanup();
//             }
//         };
//     }, [todraw]);

//     return (
//         <div>
//             <canvas id="canvas1"></canvas>
//             <div style={{ marginTop: '10px' }} className='fixed top-2'>
//                 <button onClick={() => setTodraw("Rectangle")} 
//                         style={{ backgroundColor: todraw === "Rectangle" ? '#bbb' : '#fff' }}>
//                     Rectangle
//                 </button>
//                 <button onClick={() => setTodraw("Triangle")} 
//                         style={{ backgroundColor: todraw === "Triangle" ? '#bbb' : '#fff' }}>
//                     Triangle
//                 </button>
//                 <button onClick={() => setTodraw("Line")} 
//                         style={{ backgroundColor: todraw === "Line" ? '#bbb' : '#fff' }}>
//                     Line
//                 </button>
//                 <button onClick={() => setTodraw("Circle")} 
//                         style={{ backgroundColor: todraw === "Circle" ? '#bbb' : '#fff' }}>
//                     Circle
//                 </button>
//             </div>
//         </div>
//     );
// }
























"use client"

import { useEffect, useState, useRef } from 'react';
import { Draw } from '../core/draw'; 

export default function Canvas({ roomId, socket }: { roomId: string | undefined, socket: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [todraw, setTodraw] = useState("Rectangle");
  const drawInstanceRef = useRef<Draw | null>(null);

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
      <canvas ref={canvasRef} id="canvas1"></canvas>
      <div style={{ marginTop: '10px' }} className='fixed top-2'>
        <button onClick={() => setTodraw("Rectangle")} 
                style={{ backgroundColor: todraw === "Rectangle" ? '#bbb' : '#fff' }}>
          Rectangle
        </button>
        <button onClick={() => setTodraw("Triangle")} 
                style={{ backgroundColor: todraw === "Triangle" ? '#bbb' : '#fff' }}>
          Triangle
        </button>
        <button onClick={() => setTodraw("Line")} 
                style={{ backgroundColor: todraw === "Line" ? '#bbb' : '#fff' }}>
          Line
        </button>
        <button onClick={() => setTodraw("Circle")} 
                style={{ backgroundColor: todraw === "Circle" ? '#bbb' : '#fff' }}>
          Circle
        </button>
      </div>
    </div>
  );
}
