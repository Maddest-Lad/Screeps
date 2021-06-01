// Useful Stuff
const utils = require("utils")

// Rooms
const roomSpawn = require("room.spawn")
const roomConstruction = require("room.construction")
const roomMemory = require("room.memory")
const roomHarvestController = require("room.harvestController")

// Roles
const roleDrone = require("role.drone")
const roleRanged = require("role.ranged")
const roleBuilder = require("role.builder")
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
                runEveryXTicks(roomMemory, room, 25);
                runEveryXTicks(roomHarvestController, room, 10)
                runEveryXTicks(roomSpawn, room, 10);
                runEveryXTicks(roomConstruction, room, 100);
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
                roleBuilder.run(creep);
                break;

            case "ranged":
                roleDrone.run(creep);
                break;

            case "miner":
                roleMiner.run(creep);
                break;

            default:
                creep.suicide();
        }
    });
}

function runEveryXTicks(func, room, tickFrequency) {
    if (Game.time % tickFrequency === 0) {
        func.run(room);
    }
}


