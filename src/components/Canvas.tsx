"use client"

import { useEffect, useState, useRef } from 'react';
import { Draw } from '../core/draw'; 

export default function DrawingApp() {
    const [todraw, setTodraw] = useState("Rectangle");
    const drawInstanceRef = useRef<Draw | null>(null);

    useEffect(() => {
        if (drawInstanceRef.current) {
            drawInstanceRef.current.cleanup();
        }

        const draw = new Draw(todraw);
        draw.initHandlers();
        drawInstanceRef.current = draw;
        
        return () => {
            if (drawInstanceRef.current) {
                drawInstanceRef.current.cleanup();
            }
        };
    }, [todraw]);

    return (
        <div>
            <canvas id="canvas1"></canvas>
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