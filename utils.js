var Utils = {

    roles: {
        DRONE: "drone",
        COURIER: "courier",
        BUILDER: "builder",
        MELEE: "melee",
        RANGED: "ranged"
    },

    // Delete Creeps Which Have Died From Memory
    clearUnusedMemory: function (Memory) {
        for (const name in Memory.creeps) {
            if (!Game.creeps[name]) { // Falsy
                delete Memory.creeps[name];
            }
        }
    },

    // No Tier
    melee: [MOVE, ATTACK, TOUGH],  // Multiplier of 3
    ranged: [MOVE, RANGED_ATTACK, TOUGH], // Multiplier of 3

    // Tier 0
    drone: [WORK, MOVE, CARRY],    // Multiplier of 3
    courier: [MOVE, CARRY],         // Multiplier of 2

    // Tier 1
    miner: [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY],
    builder: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE]

};

module.exports = Utils;