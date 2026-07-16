import http from 'node:http'
import fs from 'node:fs/promises';
import path from 'node:path';
import { WebSocketServer } from 'ws';
import {redisPublish, redisSubscribe} from './connection.js';
const PORT = process.env.PORT ?? 9000;
const REDIS_CHANNEL = 'ws-messages'

const httpServer = http.createServer(async function (req, res) {
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    return res.end(indexFile);
})
const webServer = new WebSocketServer({server:httpServer});

redisSubscribe.subscribe(REDIS_CHANNEL)
redisSubscribe.on('message', (channel, message)=>{
    if(channel === REDIS_CHANNEL){
        //Broad cast message to all of your connected clients
        webServer.clients.forEach((clients)=>{
            clients.send(message.toString())
        })
    }
})

webServer.on('connection', (WebSocket)=>{
    console.log('web socket connection');

    WebSocket.on('message',async (data)=>{
        console.log('web socket message received', data.toString());  

        // RELAY the message to the broker
        console.log("relaying message to redis broker...")
        await redisPublish.publish(REDIS_CHANNEL,data.toString());
    });
})

httpServer.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})