// import { BACKEND_URL } from "../config/config";
import axios from "axios";

export async function getExistingShapes(roomId) {
    const res = await axios.get(`http://localhost:8004/api/v1/getroomchats?room=${roomId}`);
    const messages = res.data;

    let messageData = [];

    messages.map((x) => {
        messageData.push(JSON.parse(x.message))

        // return { newShape: messageData.newShape, type: messageData.type };
    })

    // return shapes;

    console.log(messageData)
}

getExistingShapes(1111)