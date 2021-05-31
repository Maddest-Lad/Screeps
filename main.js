const utils = require("utils")
const roomConstruction = require("room.construction")
const roomDefense = require("room.defense")
const roomSpawn = require("room.spawn")
const roomMemory = require("room.memory")
const roleDrone = require("role.drone")
const roleRanged = require("role.ranged")
const roleHauler = require("role.hauler")
const roleMiner = require("role.miner")

module.exports.loop = function () {

    // Removes Dead Creeps From Memory
    utils.clearUnusedMemory(Memory)

    // Standard Room Code
    // noinspection JSAnnotator
    _.forEach(Game.rooms, function (room) {

            // Do we own the room?
            if (room && room.controller && room.controller.my) {

                // Room Modules (Only Run Once Every Once-In-A-While For Performance)
                runEveryXTicks(roomSpawn, room, 10);
                runEveryXTicks(roomConstruction, room, 100);
                runEveryXTicks(roomMemory, room, 1);
            }
        }
    );

    // Run Creep Code
    _.forEach(Game.creeps, function (creep) {
        switch (creep.memory.role) {

            case "drone":
                roleDrone.run(creep);
                break;

            case "hauler":
                roleHauler.run(creep);
                break;

            case "builder":
                //roleBuilder.run(creep);
                break;

            case "ranged":
                roleDrone.run(creep);
                break;

            case "miner":
                roleMiner.run(creep);
                break;

            default:
                roleDrone.run(creep);
        }
    });
}

function runEveryXTicks(func, room, tickFrequency) {
    if (Game.time % tickFrequency === 0) {
        func.run(room);
    }
}


