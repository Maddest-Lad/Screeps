const Utils = require("utils")
const roomConstruction = require("room.construction")
const roomDefense = require("room.defense")
const roleDrone = require("role.drone")
const roleRanged = require("role.ranged")
const roleHauler = require("role.hauler")

module.exports.loop = function () {

    // Removes Dead Creeps From Memory
    Utils.clearUnusedMemory(Memory)

    // Standard Room Code
    // noinspection JSAnnotator
    _.forEach(Game.rooms, function (room) {

            // Do we own the room?
            if (room && room.controller && room.controller.my) {

                // Use Number of Extensions To Establish "Tier" of Room - Which Determines Whether We'll Use The
                const extensions = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType === STRUCTURE_EXTENSION)

                let loadout;
                let tier;
                let total = 0;


                if (extensions.length > 3) {
                    loadout = Utils.drone.concat(Utils.drone).concat([WORK]);
                    tier = 0;
                } else {
                    loadout = Utils.drone;
                    tier = 6;
                }

                // Drone Count // TODO Fix Room Unsafe Code (Game.creeps)
                const drones = _.filter(Game.creeps, (creep) => creep.memory.role === 'drone').length;

                // If Low, Add to Population
                if (drones < 8) {
                    const newName = 'Drone' + Game.time + "T:" + loadout.length;

                    const roomSpawn = room.find(FIND_MY_SPAWNS)
                    //TODO Fix Room Unsafe Code ["Spawn1"]
                    Game.spawns["Spawn1"].spawnCreep(loadout, newName, {memory: {role: 'drone'}});
                }
            }

            // Room Modules
            roomConstruction.run(room);
            roomDefense.run(room);
        }
    );

    // Run Each Creep's Function
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'drone') {
            roleDrone.run(creep);
        }
        if (creep.memory.role === 'ranged') {
            roleRanged.run(creep);
        }
        if (creep.memory.role === 'hauler') {
            roleHauler.run(creep);
        }
    }

}


