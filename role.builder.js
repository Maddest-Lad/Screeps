const roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.store.getFreeCapacity() === 0) {
            creep.memory.full = true;
        } else if (creep.store.getUsedCapacity() === 0) {
            creep.memory.full = false;
        }

        if (creep.memory.full) {

            // Manage Source Control
            if (!creep.memory.source) {
                // Repairs?
                const repair = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => i.hits < i.hitsMax}));
                if (repair) {
                    creep.memory.source = repair.id;
                } else {
                    const build = creep.pos.findClosestByRange(creep.room.memory.constructionSites);

                    if (build) {
                        creep.memory.source = build.id;
                    } else {
                        creep.memory.source = creep.room.controller.id;
                    }
                }
            } else {
                const target = Game.getObjectById(creep.memory.source);

                if (target) {

                    if (target.hasOwnProperty("progress")) {
                        if (target.progress === target.progressTotal) {
                            creep.memory.source = null;
                        }
                    } else if (target.hasOwnProperty("hits")) {
                        if (target.hits === target.hitsMax) {
                            creep.memory.source = null;
                        }
                    }
                } else {
                    creep.memory.source = null;
                }
            }

            const target = Game.getObjectById(creep.memory.source);

            if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: "#FF00FF"}, reusePath: 3});
            }

            if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: "#FF00FF"}, reusePath: 3});
            }

            if (creep.build(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: "#FF00FF"}, reusePath: 3});
            }

            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                creep.memory.full = false;
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

