const roleDrone = require("role.drone")

const roleHauler = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.owned) {
            if (creep.store.getFreeCapacity() === 0) {
                creep.memory.full = true;
            } else if (creep.store.getUsedCapacity() === 0) {
                creep.memory.full = false;
            }

            // Drop Off Energy
            if (creep.memory.full) {
                let target = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType === STRUCTURE_EXTENSION || i.structureType === STRUCTURE_SPAWN) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));

                if (!target) {
                    target = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType === STRUCTURE_CONTAINER && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));
                }

                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target)
                } else {
                    creep.memory.full = false;
                }

            } else {
                // Look For Dropped Resources in Range 10
                const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

                if (target && creep.pos.getRangeTo(target) < 10) {
                    if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                } else {

                    const rangeToSource = creep.pos.getRangeTo(Game.getObjectById(creep.memory.source));

                    // No Crowding But Still Useful
                    if (rangeToSource >= 3 && rangeToSource <= 8) {
                        // Do Nothing
                    } else if (rangeToSource < 3) {
                        creep.moveTo(creep.room.controller);
                    } else {
                        creep.moveTo(Game.getObjectById(creep.memory.source));
                    }
                }
            }
        }
    },
};

module.exports = roleHauler;
