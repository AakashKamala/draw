// import { BACKEND_URL } from "@/config/config";
// import axios from "axios";

// export async function getExistingShapes(roomId:any) {
//     const res = await axios.get(`${BACKEND_URL}/getroomchats?room=${roomId}`);
//     const messages = res.data;

//     const shapes = messages.map((x: any) => {
//         const messageData = JSON.parse(x.message)
//         return { newShape: messageData.newShape, type: messageData.type };
//     })

//     return shapes;
// }


import { BACKEND_URL } from "@/config/config";
import axios from "axios";

export async function getExistingShapes(roomId: any) {
    const res = await axios.get(`${BACKEND_URL}/getroomchats?room=${roomId}`);
    const messages = res.data;

    let messageData: any = [];

    messages.map((x: any) => {
        messageData.push(JSON.parse(x.message))

        // return { newShape: messageData.newShape, type: messageData.type };
    })

    // return shapes;

    // console.log(messageData)
    return messageData
}

getExistingShapes(1111)