const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.full = true;
        } else if (creep.store.getUsedCapacity() === 0) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {

            // Refill, Build, Repair & Upgrade
            const refillPriorityTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType === STRUCTURE_EXTENSION || i.structureType === STRUCTURE_SPAWN) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));
            const refillStandardTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType === STRUCTURE_CONTAINER || i.structureType === STRUCTURE_TOWER) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));
            const repairTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.hits / i.hitsMax) < 0.25}));
            const buildTarget = creep.pos.findClosestByRange(creep.room.find(FIND_CONSTRUCTION_SITES));

            if (refillPriorityTarget) {
                if (creep.transfer(refillPriorityTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(refillPriorityTarget, {visualizePathStyle: {stroke: "#00FF00"}});
                }
            } else if (repairTarget) {
                if (creep.repair(repairTarget) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget, {visualizePathStyle: {stroke: "#00FF00"}});
                }
            } else if (buildTarget) {
                if (creep.build(buildTarget) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTarget, {visualizePathStyle: {stroke: "#FFFF00"}});
                }
            } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: "#0000FF"}});
            } else {
                if (creep.transfer(refillStandardTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(refillStandardTarget, {visualizePathStyle: {stroke: '#007FFF'}});
                }
            }

        } else {

            const withdrawTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {
                filter: (i) => (
                    i.structureType === STRUCTURE_CONTAINER) &&
                    i.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)
            }));

            if (withdrawTarget) {
                if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(withdrawTarget, {visualizePathStyle: {stroke: "#FF00FF"}, reusePath: 10})
                }
            } else {
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

                if (target) {
                    if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }

            if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.full = true;
            }
        }
    },

};

module.exports = roleBuilder;

