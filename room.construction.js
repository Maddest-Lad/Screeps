const roomConstruction = {

    run: function (room) {

        // This Will Be Ran Every 10th Tick To Check For An Upgrade,
        // And Then Ran Every 500 Ticks In Case Something Was Missed
        if (room.memory.level !== room.controller.level || Game.time % 10 === 0) {

            switch (room.memory.level) {

                case 1:
                    this.tierOne(room);
                    break;

                case 2:
                    this.tierTwo(room);
                    break;

                default:
                    console.log("[CONSTRUCTION] Warning Room Level [" + room.memory.level + "] Unsupported")
            }
        }

        if (room.find(FIND_FLAGS).length === 1) {
            this.cancelConstruction(room);
        }
    },

    tierOne: function (room) {
        this.cancelConstruction(room);
    },

    tierTwo: function (room) {
        if (room.memory.extensions.length <= 4) {
            this.planSpawnExtensions(room);
        } else {
            this.planRoads(room);
        }
    },

    planSpawnExtensions: function (room) {
        console.log("Placing Extension Sites")
        const spawnPos = Game.spawns["Spawn1"].pos;
        const x = spawnPos.x, y = spawnPos.y;

        // Probably A Better Way, But For T1 This Works Fine
        room.createConstructionSite(x + 2, y, STRUCTURE_EXTENSION);
        room.createConstructionSite(x - 2, y, STRUCTURE_EXTENSION);
        room.createConstructionSite(x, y + 2, STRUCTURE_EXTENSION);
        room.createConstructionSite(x, y - 2, STRUCTURE_EXTENSION);
        room.createConstructionSite(x - 2, y - 2, STRUCTURE_EXTENSION);
    },

    planRoads: function (room) {
        console.log("Placing Road Sites")

        const roadEndpoints = room.find(FIND_SOURCES).concat(room.controller);

        for (let path = 0; path < roadEndpoints.length; path++) {
            // Room Unsafe Code
            let pathToEndpoint = Game.spawns["Spawn1"].pos.findPathTo(roadEndpoints[path].pos, {ignoreCreeps: true});
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
    }


}

module.exports = roomConstruction;
