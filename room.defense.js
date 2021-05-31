const roomDefense = {

    run: function (room) {

        // // defense Code
        // if (room.find(FIND_HOSTILE_CREEPS) && room.memory.level > 1) {
        //
        //     const threshold = 10;
        //     const ranged = _.filter(Game.creeps, (creep) => creep.memory.role === 'ranged').length;
        //
        //     // Build an Army if Enemy's Present and No Current Attack
        //     if (ranged < threshold && !room.memory.startAttack) {
        //         const newName = 'Ranged' + Game.time;
        //
        //         //TODO Fix Room Unsafe Code ["Spawn1"]
        //         Game.spawns["Spawn1"].spawnCreep(Utils.ranged.concat(Utils.ranged), newName, {memory: {role: 'ranged'}});
        //
        //         // Attack After Reaching Threshold
        //         // 50 Ticks Turns Before Another Attack Starts Planning
        //     } else if (ranged === threshold && !room.memory.startAttack) {
        //         console.log("Attack Starting");
        //         room.memory.startAttack = true;
        //         room.memory.timeRemaining = Game.time + 50;
        //     } else {
        //         room.memory.timeRemaining -= 1;
        //         if (room.memory.timeRemaining <= Game.time) {
        //             room.memory.startAttack = false;
        //             console.log("Attack Failed, Trying Again");
        //         }
        //     }
        // }
    }
}

module.exports = roomDefense