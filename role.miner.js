const roleDrone = require("role.drone")

const roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.owned) {
            const mySource = Game.getObjectById(creep.memory.source);

            if (creep.store.getFreeCapacity() === 0) {
                creep.drop(RESOURCE_ENERGY);
            }

            if (creep.harvest(mySource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(mySource, {visualizePathStyle: {stroke: "#FF00FF"}, reusePath: 10});
            }
        }
    },
};

module.exports = roleMiner;