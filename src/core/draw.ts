import { getExistingShapes } from "./getExistingShapes";

let ctx: CanvasRenderingContext2D | null;
let canvas: any;
const existingShapes: Shape[] = []

type Shape = {
    startX: number,
    startY: number,
    width: number,
    height: number,
    shape: String,
    color: string
}

// if (typeof window !== "undefined") {
//     window.addEventListener("load", () => {
//         canvas = document.getElementById("canvas1");
//         if (canvas instanceof HTMLCanvasElement) {
//             ctx = canvas.getContext("2d");
//             if (ctx) {
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
                
//                 const savedShapes = localStorage.getItem("existingShapes");
//                 if (savedShapes) {
//                     const parsedShapes = JSON.parse(savedShapes);
//                     existingShapes.push(...parsedShapes);
//                 }
//             } else {
//                 console.error("Failed to get 2D context");
//             }
//         } else {
//             console.error("Canvas element not found or invalid");
//         }
//     });
// } else {
//     console.error("This code must run in a browser environment.");
// }

export class Draw {
    public ctx: CanvasRenderingContext2D;
    // public ctx;
    public shape;
    public color: string = "red";
    startX: number | undefined;
    startY: number | undefined;
    width: number | undefined;
    height: number | undefined;
    isDrawing: boolean = false;
    roomId: any
    socket: any

    private intervalId: any;
    
    private mouseDownHandler: ((e: MouseEvent) => void) | null = null;
    private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
    private mouseUpHandler: ((e: MouseEvent) => void) | null = null;
    
    constructor(shape: String, roomId: String | undefined, color: string = "red", ctx: CanvasRenderingContext2D, width: number, height:number, socket: any) {
        this.ctx = ctx;
        this.shape = shape;
        this.color = color;
        this.width = width;
        this.height = height
        this.socket = socket
        this.roomId = roomId
        // canvas.width = width;
        // canvas.height = height
        this.intervalId = setInterval(() => {
            this.initializeShapes()
        }, 500);
    }

    async initializeShapes() {
        const shapes = await getExistingShapes(this.roomId);
        existingShapes.push(...shapes);
        this.reDraw(); // Redraw the canvas with the loaded shapes
    }

    setColor(color: string) {
        this.color = color;
    }

    initHandlers() {
        this.cleanup();
        
        this.mouseDownHandler = (e: MouseEvent) => {
            this.isDrawing = true;
            this.startX = e.clientX;
            this.startY = e.clientY;
        };
        
        this.mouseMoveHandler = (e: MouseEvent) => {
            if (!this.isDrawing || !this.startX || !this.startY) {
                return;
            }
            
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            
            this.clearCanvas();
            this.redrawExistingShapes();
            this.drawShape(this.startX, this.startY, width, height, this.shape, this.color);
        };
        
        this.mouseUpHandler = (e: MouseEvent) => {
            if (!this.isDrawing || !this.startX || !this.startY) {
                return;
            }
            
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;

            const newShape = {
                startX: this.startX,
                startY: this.startY,
                width: width,
                height: height,
                shape: this.shape,
                color: this.color
            }
            
            // existingShapes.push(
            //    newShape
            // );
            this.initializeShapes()
            // console.log(existingShapes)
            
            localStorage.setItem("existingShapes", JSON.stringify(existingShapes));
            // console.log("room" , this.roomId)
            const toSend = JSON.stringify({ type: "chat", roomId: this.roomId, message: newShape, userId: '67eed48b5e1264b318fe4475'})
            // console.log(newShape)
            this.socket.send(toSend)

            // When receiving a new shape from the server
            this.socket.onmessage = (event: MessageEvent) => {
                const data = JSON.parse(event.data);
                if (data.type === "chat") {
                    // console.log(data)
                // Update the local state and redraw
                // existingShapes.push(data.message);
                this.initializeShapes()
                this.reDraw(); // Assuming drawInstance is your Draw class instance
                }
            };
  

            
            this.isDrawing = false;
            this.startX = undefined;
            this.startY = undefined;
            
            this.clearCanvas();
            this.redrawExistingShapes();
        };
        
        document.addEventListener("mousedown", this.mouseDownHandler);
        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseup", this.mouseUpHandler);
        
        this.redrawExistingShapes();
    }
    
    cleanup() {
        if (this.mouseDownHandler) {
            document.removeEventListener("mousedown", this.mouseDownHandler);
            this.mouseDownHandler = null;
        }
        
        if (this.mouseMoveHandler) {
            document.removeEventListener("mousemove", this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
        
        if (this.mouseUpHandler) {
            document.removeEventListener("mouseup", this.mouseUpHandler);
            this.mouseUpHandler = null;
        }

        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    drawShape(startX: number, startY: number, width: number, height: number, shape: String, color: string = "red") {
        if (!this.ctx) {
            return;
        }
        
        if (shape === "Rectangle") {
            this.drawRectangle(startX, startY, width, height, color);
        }
        else if (shape === "Circle") {
            this.drawCircle(startX, startY, width, height, color);
        }
        else if (shape === "Triangle") {
            this.drawTriangle(startX, startY, width, height, color);
        }
        else if (shape === "Line") {
            this.drawLine(startX, startY, width, height, color);
        }
    }

    drawRectangle(startX: number, startY: number, width: number, height: number, color: string) {
        if (!this.ctx) {
            return;
        }
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(startX, startY, width, height);
    }

    drawCircle(startX: number, startY: number, width: number, height: number, color: string) {
        if (!this.ctx) {
            return;
        }
        let centerX = startX + width / 2;
        let centerY = startY + height / 2;
        let radius = Math.min(Math.abs(width), Math.abs(height)) / 2;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawLine(startX: number, startY: number, width: number, height: number, color: string) {
        if (!this.ctx) {
            return;
        }
        let endX = startX + width;
        let endY = startY + height;

        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    drawTriangle(startX: number, startY: number, width: number, height: number, color: string) {
        if (!this.ctx) {
            return;
        }
        const x1 = startX;
        const y1 = startY;
        const x2 = startX + width;
        const y2 = startY;
        const x3 = startX + width / 2;
        const y3 = startY - height;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;  
        this.ctx.stroke();
    }

    clearCanvas() {
        if (!this.ctx) {
            return;
        }
        this.ctx.clearRect(0, 0, this.width as number, this.height as number);
    }

    redrawExistingShapes() {
        if (!this.ctx) {
            return;
        }
        
        existingShapes.forEach(currShape => {
            this.drawShape(
                currShape.startX, 
                currShape.startY, 
                currShape.width, 
                currShape.height, 
                currShape.shape,
                currShape.color || "red"
            );
        });
    }
    
    reDraw() {
        this.clearCanvas();
        this.redrawExistingShapes();
    }
}