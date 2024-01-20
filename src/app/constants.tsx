export const GAMES_TO_SHOW = 10;

export const ERR_CODE = "ERR_NETWORK";
export const CANT_FIND = "Can't find user";
export const API_ERR = "API Error";

export const PINGS = [
    'allInPings',
    'assistMePings',
    'baitPings',
    'basicPings',
    'commandPings',
    'dangerPings',
    'enemyMissingPings',
    'enemyVisionPings',
    'getBackPings',
    'holdPings',
    'needVisionPings',
    'onMyWayPings',
    'pushPings',
    'visionClearedPings'
]

export enum DataProperty {
    PING = "ping",
    DRAGON = "dragon",
    BARON = "baron",
}

export const DAMAGE_DEALT = [
    'damageDealtToBuildings',
    'damageDealtToObjectives',
    'damageDealtToTurrets',
    'magicDamageDealt',
    'magicDamageDealtToChampions',
    'physicalDamageDealt',
    'physicalDamageDealtToChampions',
    'totalDamageDealt',
    'totalDamageDealtToChampions',
    'trueDamageDealt',
    'trueDamageDealtToChampions'
]
export const DAMAGE_TAKEN = [
    'magicDamageTaken',
    'physicalDamageTaken',
    'totalDamageTaken',
    'trueDamageTaken'
]
export const DAMAGE_SHIELDED = [
    'damageSelfMitigated',
    'totalDamageShieldedOnTeammates'
]