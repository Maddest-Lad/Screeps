const utils = require("utils")

const roomHarvestController = {

    run: function (room) {

        // Only Actually Run When Miners & Haulers Can Exist
        if (room.memory.level >= 2) {

            // First Time Setup
            if (!room.memory.harvestControllers) {
                console.log("Assigning HarvestControllers For Room: " + room.name)
                let harvestControllers = []

                _.forEach(room.memory.sources, function (source) {
                    harvestControllers.push(new utils.harvestController(source));
                });

                room.memory.harvestControllers = harvestControllers;
            }

            _.forEach(room.memory.harvestControllers, function (harvestController) {

                // Get Rid of Dead Creeps
                _.forEach(harvestController.haulers, function (creep) {
                    if (!Game.getObjectById(creep)) {
                        harvestController.haulers.delete(creep);
                    }
                });

                _.forEach(harvestController.miners, function (creep) {
                    if (!Game.getObjectById(creep)) {
                        harvestController.miners.delete(creep);
                    }
                });

                const roomCreeps = room.find(FIND_MY_CREEPS);

                const miners = _.filter(roomCreeps, (creep) => creep.memory.role === "miner" && creep.memory.owned === false);
                const haulers = _.filter(roomCreeps, (creep) => creep.memory.role === "hauler" && creep.memory.owned === false);

                console.log(harvestController.miners);
                if (harvestController.miners.size < 2) {

                    if (miners.length <= 1) {
                        const miner = miners[0];
                        harvestController.miners.add(miner.id);
                        miner.memory.source = harvestController.source;
                        miner.memory.owned = true;
                    }
                }

                if (harvestController.haulers.size < 3) {
                    if (haulers.length <= 2) {
                        const hauler = haulers[0]
                        console.log(typeof miner)
                        harvestController.haulers.add(hauler.id);
                        hauler.memory.source = harvestController.source;
                        hauler.memory.owned = true;
                    }
                }

                utils.print(harvestController);
            });
        }
    }
}

module.exports = roomHarvestController;