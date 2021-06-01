const roomMemory = {

    run: function (room) {

        // Run Once - Unless Deleted
        if (!room.memory.sources) {
            console.log("Assigning Sources For Room: " + room.name)
            room.memory.sources = Game.rooms[room.name].find(FIND_SOURCES);
        }

        _.remove(room.memory.sources, (source) => source.id === "4ab8038bb744cfc13f6e3053");

        // Run These Every Time This is Called
        const structures = room.find(FIND_MY_STRUCTURES);

        // Current Things To Track
        room.memory.extensions = _.filter(structures, (structure) => structure.structureType === STRUCTURE_EXTENSION);
        room.memory.spawns = _.filter(structures, (structure) => structure.structureType === STRUCTURE_SPAWN);
        room.memory.containers = _.filter(structures, (structure) => structure.structureType === STRUCTURE_CONTAINER);
        room.memory.constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
        room.memory.level = room.controller.level;

    }
}

module.exports = roomMemory;