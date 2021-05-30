var roleRanged = {

    /** @param {Creep} creep **/
    run: function (creep) {

        // ATTACK
        if (creep.room.memory.startAttack) {
            const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

            if (target) {
                if (creep.rangedAttack(Game.getObjectById("3aa444cbacfb0b3e654adca8")) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById("3aa444cbacfb0b3e654adca8"));
                }
            }

            // Move to Rally Point
        } else {
            const target = creep.pos.findClosestByPath(FIND_FLAGS);
            creep.moveTo(target);
        }
    },
};

module.exports = roleRanged;