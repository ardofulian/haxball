import Haxball from "haxball.js";
import { config } from "dotenv";
import { createServer } from "node:http";

config();

let url: string;

Haxball.then((HBInit) => {
    console.log("Haxball: init complete");

    const room = HBInit({
        roomName: process.env.ROOM_NAME as string,
        password: process.env.ROOM_PASSWORD,
        maxPlayers: parseInt(process.env.ROOM_MAX_PLAYER_COUNT as string),
        public: process.env.ROOM_SHOW_IN_ROOM_LIST === "true",
        noPlayer: true,
        token: process.env.TOKEN,
        geo: {
            code: process.env.ROOM_GEO_FLAG as string,
            lat: parseInt(process.env.ROOM_GEO_LAT as string),
            lon: parseInt(process.env.ROOM_GEO_LON as string),
        },
        debug: true,
    });

    room.setDefaultStadium("Big");
    room.setScoreLimit(5);
    room.setTimeLimit(0);

    room.onRoomLink = (link) => {
        console.log(link);

        url = link;
    };

    room.onPlayerJoin = (player) => {
        if (room.getPlayerList().length === 1)
            room.setPlayerAdmin(player.id, true);
    };
}).catch((e) => {
    console.error("Haxball:", e);
});

createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            data: url || "Hello World!",
        }),
    );
}).listen(parseInt(process.env.PORT as string));
