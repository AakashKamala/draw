"use client"

import Canvas from "@/components/Canvas";
import { WS_URL } from "@/config/config";
import { use, useEffect, useState } from "react";

export default function({ params }: { params: Promise<{ roomId: string }> }) {

    const { roomId } = use(params);

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        console.log("roomroom", roomId)
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWVkNDhiNWUxMjY0YjMxOGZlNDQ3NSIsImlhdCI6MTc0MzcwNTIyN30.CJYM_1fEcVwSxW2zsDxDr3o4vojBZubF-NGuyrT6m8g`);
    
        ws.onopen = () => {
            console.log("WebSocket connected");
            setSocket(ws);
            ws.send(JSON.stringify({ type: "join_room", roomId }));
        };
    
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    
        ws.onclose = () => {
            console.log("WebSocket closed");
        };
    
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "leave_room", roomId }));
            }
            ws.close();
        };
    }, [roomId]);
    

    if (!socket) {
        return <div>Connecting to server...</div>;
    }

    return(
        <Canvas roomId={roomId as string} socket={socket}/>
    )
}