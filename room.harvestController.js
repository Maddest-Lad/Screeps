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

                const creeps = Game.creeps;

                //utils.print(harvestController);

                const roomCreeps = room.find(FIND_MY_CREEPS);
                const miners = _.filter(roomCreeps, (creep) => creep.memory.role === "miner" && creep.memory.owned === false);
                const haulers = _.filter(roomCreeps, (creep) => creep.memory.role === "hauler" && creep.memory.owned === false);

                if (harvestController.miners.length < 1) {
                    if (miners.length > 0) {
                        const miner = miners[0]
                        harvestController.miners.push(miner);
                        miner.memory.source = harvestController.source;
                        miner.memory.owned = true;
                    }
                }

                if (harvestController.haulers.length < 2) {

                    if (haulers.length > 0) {
                        const hauler = haulers[0]
                        harvestController.haulers.push(hauler);
                        hauler.memory.source = harvestController.source;
                        hauler.memory.owned = true;
                    }

                }
            });
        }
    }
}

module.exports = roomHarvestController;