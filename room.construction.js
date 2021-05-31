const roomConstruction = {

    run: function (room) {
        if (room.memory.spawnPlanned) {
            if (room.find(FIND_FLAGS).length === 2 && room.find(FIND_MY_CONSTRUCTION_SITES).length < 100) {
                this.planRoads(room);
            } else if (room.find(FIND_FLAGS).length === 1) {
                this.cancelConstruction(room);
            }
        } else {
            this.planSpawn(room);
            room.memory.spawnPlanned = true;
        }
    },

    // Call on
    planSpawn: function (room) {
        console.log("Placing Extension Sites")
        const spawnPos = Game.spawns["Spawn1"].pos;
        const x = spawnPos.x, y = spawnPos.y;

        // Probably A Better Way, But For T1 This Works Fine
        room.createConstructionSite(x + 2, y, STRUCTURE_EXTENSION);
        room.createConstructionSite(x - 2, y, STRUCTURE_EXTENSION);
        room.createConstructionSite(x, y + 2, STRUCTURE_EXTENSION);
        room.createConstructionSite(x, y - 2, STRUCTURE_EXTENSION);
    },

    planRoads: function (room) {
        console.log("Placing Road Sites")

        // Room Unsafe Code
        const roadEndpoints = room.find(FIND_SOURCES).concat(room.controller);

        for (let path = 0; path < roadEndpoints.length; path++) {
            let pathToEndpoint = Game.spawns["Spawn1"].pos.findPathTo(roadEndpoints[path].pos);
            for (let step = 0; step < pathToEndpoint.length; step++) {
                room.createConstructionSite(pathToEndpoint[step].x, pathToEndpoint[step].y, STRUCTURE_ROAD);
            }
        }
    },

    cancelConstruction: function (room) {
        console.log("Clearing Construction Sites");
        _.forEach(room.find(FIND_MY_CONSTRUCTION_SITES), function (constructionSite) {
            constructionSite.remove();
        });

        room.memory.spawnPlanned = false;
    }


};

module.exports = roomConstruction;