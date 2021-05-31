const roleHauler = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.full = true;
        } else if (creep.store.getUsedCapacity() === 0) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {
            const depositTarget = creep.pos.findClosestByPath(STRUCTURE_CONTAINER, {
                filter: (structure) => structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getUsedCapacity(RESOURCE_ENERGY) &&
                    (creep.memory.role === "drone" || creep.memory.role === "miner")
            });

            if (creep.transfer(depositTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(depositTarget)
            }

        } else {
            const withdrawTarget = creep.pos.findClosestByPath(FIND_CREEPS, {
                filter: (creep) => creep.store.getUsedCapacity(RESOURCE_ENERGY) > 50 &&
                    (creep.memory.role === "drone" || creep.memory.role === "miner")
            });

            if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(withdrawTarget)
            }
        }
    },

};

module.exports = roleHauler;
