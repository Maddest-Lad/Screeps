// Delete Creeps Which Have Died From Memory
function clearUnusedMemory(Memory) {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) { // Falsy
            delete Memory.creeps[name];
        }
    }
}

// Role Info & Utils
const roles = [
    "drone",
    "hauler",
    "builder",
    "miner",
    "ranged",
    "upgraded_drone"
]


// For Reference: Tier 2 Max Energy = 550 (With 5 Extensions)
const drone = [WORK, MOVE, CARRY]; // 200
const upgraded_drone = [WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY] // 500
const hauler = [MOVE, CARRY]; // 100
const builder = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE] // 500
const miner = [WORK, WORK, WORK, WORK, MOVE, CARRY]; // 500
const ranged = [MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH]; // 500

const roleMap = {
    "drone": drone,
    "hauler": hauler,
    "builder": builder,
    "ranged": ranged,
    "miner": miner,
    "upgraded_drone": upgraded_drone
}

const costMap = {
    MOVE: 50,
    WORK: 100,
    CARRY: 50,
    ATTACK: 80,
    RANGED_ATTACK: 150,
    HEAL: 250,
    CLAIM: 600,
    TOUGH: 10
}

function getRoleCost(loadout) {
    let total = 0;

    _.forEach(loadout, function (move) {
        total += costMap[move];
    })

    return total;
}

module.exports = {roles, roleMap, clearUnusedMemory, getRoleCost};