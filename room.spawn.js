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
                console.log("Warning Room Level [" + room.memory.level + "] Unsupported")
        }
    },

    spawnCreep: function (role, room) {
        const maxEnergy = room.memory.extensions * 50 + 300;
        if (utils.getRoleCost(role) < maxEnergy) {
            const newName = role + Game.time + "T:" + room.memory.level;
            Game.spawns["Spawn1"].spawnCreep(utils.roleMap.get(role), newName, {memory: {role: role}});
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
            this.spawnCreep("miner", room);
        } else if (builders < threshold) {
            this.spawnCreep("builder", room);
        } else if (haulers < threshold) {
            this.spawnCreep("hauler", room);
        } else if (upgradedDrones < 4) {
            this.spawnCreep("upgraded_drone", room);
        }
    }
}

module.exports = roomSpawn;