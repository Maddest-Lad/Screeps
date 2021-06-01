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
const hauler = [MOVE, CARRY, MOVE, CARRY]; // 200
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
    "move": 50,
    "work": 100,
    "carry": 50,
    "attack": 80,
    "ranged_attack": 150,
    "heal": 250,
    "claim": 600,
    "tough": 10
}

function getRoleCost(role) {
    let total = 0;

    const parts = roleMap[role];

    for (const part in parts) {
        const currentPart = parts[part];
        total += costMap[currentPart];
    }

    return total;
}

class harvestController {

    constructor(source) {
        this.source = source.id;
        this.miners = [];
        this.haulers = [];
    }
}

function print(harvestController) {
    console.log("HarvestController: \n" +
        "    Source: " + harvestController.source + "\n" +
        "    Miners: " + harvestController.miners + "\n" +
        "    Haulers: " + harvestController.haulers
    );
}

module.exports = {roles, roleMap, clearUnusedMemory, getRoleCost, harvestController, print};