const Utils = require("utils")
const roleDrone = require("role.drone")
const roleRanged = require("role.ranged")

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

                for (const i in extensions) {
                    total += extensions[i].store.getFreeCapacity(RESOURCE_ENERGY);
                }

                if (total >= 150) {
                    loadout = Utils.drone.concat(Utils.drone);
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


                // Attack Planning Code
                if (room.find(FIND_HOSTILE_CREEPS) && tier === 0) {

                    const threshold = 20;
                    const ranged = _.filter(Game.creeps, (creep) => creep.memory.role === 'ranged').length;

                    // Build an Army if Enemy's Present and No Current Attack
                    if (ranged < threshold && !room.memory.startAttack) {
                        const newName = 'Ranged' + Game.time;

                        //TODO Fix Room Unsafe Code ["Spawn1"]
                        Game.spawns["Spawn1"].spawnCreep(Utils.ranged.concat(Utils.ranged), newName, {memory: {role: 'ranged'}});

                        // Attack After Reaching Threshold
                        // 50 Ticks Turns Before Another Attack Starts Planning
                    } else if (ranged === threshold && !room.memory.startAttack) {
                        console.log("Attack Starting");
                        room.memory.startAttack = true;
                        room.memory.timeRemaining = Game.time + 50;
                    } else {
                        room.memory.timeRemaining -= 1;
                        if (room.memory.timeRemaining <= Game.time) {
                            room.memory.startAttack = false;
                            console.log("Attack Failed, Trying Again");
                        }
                    }
                }
                // Structure Tower (Example)
                const towers = _.filter(room.find(FIND_STRUCTURES), (structure) => structure.structureType === STRUCTURE_TOWER)
            }
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
    }

}


