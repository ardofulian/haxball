import Haxball from "haxball.js";
import { config } from "dotenv";

config();

Haxball.then((HBInit) => {
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
    });

    room.setDefaultStadium("Big");
    room.setScoreLimit(5);
    room.setTimeLimit(0);

    room.onRoomLink = (link) => {
        console.log(link);
    };

    room.onPlayerJoin = (player) => {
        if (room.getPlayerList().length === 1)
            room.setPlayerAdmin(player.id, true);
    };
});
