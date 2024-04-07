
export const simpleAttack = {name:'Attaque au corps à corps', baseDamages: 10}
export const bossaNova = {name:'Bossa Nova redoutable', baseDamages: 20}

export var coconera={name:'Coconera', healthMax: 100, strength: 10, agility: 10, img:'./src/assets/images/avatars/Coconera.png', skills: [simpleAttack, bossaNova]}
export var goblin={name:'Gobelin', healthMax: 25, strength: 10, agility: 10, img:'./src/assets/images/avatars/Gobelin.png', skills: [simpleAttack, bossaNova]}

export var enemyTeam=[goblin, goblin]
export var playerTeam=[coconera, coconera]