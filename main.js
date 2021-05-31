const utils = require("utils")
const roomConstruction = require("room.construction")
const roomDefense = require("room.defense")
const roomSpawn = require("room.spawn")
const roleDrone = require("role.drone")
const roleRanged = require("role.ranged")
const roleHauler = require("role.hauler")

module.exports.loop = function () {

    // Removes Dead Creeps From Memory
    utils.clearUnusedMemory(Memory)

    // Standard Room Code
    // noinspection JSAnnotator
    _.forEach(Game.rooms, function (room) {

            // Do we own the room?
            if (room && room.controller && room.controller.my) {

                // Room Data For Memory
                room.memory.level = room.controller.level;
                room.memory.extensions = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType === STRUCTURE_EXTENSION);



                // Room Modules
                roomSpawn.run(room);
                roomConstruction.run(room);
                //roomDefense.run(room);
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
                //roleMiner.run(creep);
                break;

            default:
                roleDrone.run(creep);
        }
    });


}


