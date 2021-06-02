const utils = require("utils");

const roomSpawn = {

    run: function (room) {
        switch (room.memory.level) {

            case 1:
                this.tierOne(room);
                break;

            case 2:
                this.tierTwo(room);
                break;

            default:
                this.tierTwo(room);
                console.log("[SPAWN] Warning Room Level [" + room.memory.level + "] Unsupported")
        }
    },

    spawnCreep: function (role, room) {
        console.log("Energy Cost: " + utils.getRoleCost(role));
        console.log("Energy Available: " + room.energyAvailable);

        if (utils.getRoleCost(role) <= room.energyAvailable) {
            console.log("Spawning " + role + " in room: " + room.name);
            const newName = role + Game.time + "T:" + room.memory.level;
            Game.spawns["Spawn1"].spawnCreep(utils.roleMap[role], newName, {
                memory: {
                    role: role,
                    owned: false,
                    source: null
                }
            });
        }
    },

    tierOne: function (room) {
        const drones = _.filter(Game.creeps, (creep) => creep.memory.role === "drone").length;
        if (drones < 8) {
            this.spawnCreep("drone", room);
        }
    },

    tierTwo: function (room) {

        const threshold = 3 //room.memory.sources.length * 2;

        // Count Existing
        const roomCreeps = room.find(FIND_MY_CREEPS);
        const miners = _.filter(roomCreeps, (creep) => creep.memory.role === "miner").length;
        const builders = _.filter(roomCreeps, (creep) => creep.memory.role === "builder").length;
        const haulers = _.filter(roomCreeps, (creep) => creep.memory.role === "hauler").length;

        console.log(miners + " miners, " + haulers + " haulers, " + builders + " builders");

        // Spawn Creeps
        if (miners < 3) {
            this.spawnCreep("miner", room);
        }

        if (haulers < 4) {
            this.spawnCreep("hauler", room);
        }

        if (builders < 3) {
            this.spawnCreep("builder", room);

        }
    }
}

module.exports = roomSpawn;