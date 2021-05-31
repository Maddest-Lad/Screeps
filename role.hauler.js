const roleDrone = require("role.drone")

const roleHauler = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.full = true;
        } else if (creep.store.getUsedCapacity() === 0) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {
            const depositTarget = creep.pos.findClosestByPath(creep.room.find([STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_SPAWN]));

            //console.log(creep.room.find([STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_SPAWN]));

            if (creep.transfer(depositTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(depositTarget)
            }

        } else {
            const withdrawTarget = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: (creep) => creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50 &&
                    creep.memory.role === "miner"
            });

            if (creep.pos.getRangeTo(withdrawTarget) > 1) {
                creep.moveTo(withdrawTarget)
            }
        }
    },
};

module.exports = roleHauler;
