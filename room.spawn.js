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
                console.log("[SPAWN] Warning Room Level [" + room.memory.level + "] Unsupported")
        }
    },

    spawnCreep: function (role, room) {
        // console.log("Energy Cost: " + utils.getRoleCost(role));
        // console.log("Energy Available: " + room.energyAvailable);

        if (utils.getRoleCost(role) <= room.energyAvailable) {
            console.log("Spawning " + role + " in room: " + room.name);
            const newName = role + Game.time + "T:" + room.memory.level;
            Game.spawns["Spawn1"].spawnCreep(utils.roleMap[role], newName, {memory: {role: role}});
        }
    },

    tierOne: function (room) {
        const drones = _.filter(Game.creeps, (creep) => creep.memory.role === "drone").length;
        if (drones < 8) {
            spawnCreep("drone", room);
        }
    },

    tierTwo: function (room) {
        const threshold = 4;

        // Count Existing
        const miners = _.filter(room.creeps, (creep) => creep.memory.role === "miner").length;
        const builders = _.filter(room.creeps, (creep) => creep.memory.role === "builder").length;
        const haulers = _.filter(room.creeps, (creep) => creep.memory.role === "hauler").length;
        const upgradedDrones = _.filter(room.creeps, (creep) => creep.memory.role === "upgraded_drone").length;

        // Spawn Creeps
        if (miners < threshold) {
            //this.spawnCreep("miner", room);
        }
        if (builders < threshold) {
            //this.spawnCreep("builder", room);
        }

        if (haulers < threshold) {
            this.spawnCreep("hauler", room);
        }
        if (upgradedDrones < threshold) {
            this.spawnCreep("drone", room);
        }
    }
}

module.exports = roomSpawn;