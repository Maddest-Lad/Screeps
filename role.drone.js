const roleDrone = {

    /* The Swiss Army Knife of The Early Game
     * Jobs In Order of Importance [BUILD, REPAIR, UPGRADE, MINE]
     */

    /** @param {Creep} creep **/
    run: function (creep) {


        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
        }

        // Check For Energy First
        if (!creep.memory.building) {

            //TODO Temp Until I Sort Out Source Based Creeps
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                algorithm: "astar",
                filter: (source) => source.pos.getRangeTo(source.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) > 5
            });

            if (!source) {
                source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                    algorithm: "astar",
                    filter: (source) => source.pos.getRangeTo(source.pos.findClosestByRange(FIND_HOSTILE_CREEPS)) > 5
                });
            }

            if (!source) {
                source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                    algorithm: "astar",
                });
            }

            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: "#FF00FF"}});
            }

        } else {

            // Refill, Build, Repair & Upgrade
            const refillPriorityTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType === STRUCTURE_EXTENSION || i.structureType === STRUCTURE_SPAWN) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));
            const refillStandardTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType === STRUCTURE_CONTAINER || i.structureType === STRUCTURE_TOWER) && i.store.getFreeCapacity(RESOURCE_ENERGY) > 0}));
            const repairTarget = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES, {filter: (i) => i.hits < i.hitsMax}));
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
        }
    },
};

module.exports = roleDrone;