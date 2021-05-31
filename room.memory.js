class detailedSource {

    constructor(source) {
        this.source = source;
        this.miner = "";
    }
}

const roomMemory = {

    run: function (room) {

        // Only Run Once
        if (!room.memory.sources) {
            const rawSources = room.find(FIND_SOURCES);
            const sources = []

            for (const i in rawSources) {
                sources.concat(new detailedSource(rawSources[i]));
            }

            room.memory.sources = sources;
        }

        // Run These Every Time This is Called
        const structures = room.find(FIND_MY_STRUCTURES);

        // Current Things To Track
        room.memory.extensions = _.filter(structures, (structure) => structure.structureType === STRUCTURE_EXTENSION);
        room.memory.spawns = _.filter(structures, (structure) => structure.structureType === STRUCTURE_SPAWN);
        room.memory.containers = _.filter(structures, (structure) => structure.structureType === STRUCTURE_CONTAINER);
        room.memory.level = room.controller.level;
    }
}

module.exports = roomMemory;