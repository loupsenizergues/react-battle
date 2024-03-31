import { useState,useRef,useEffect } from 'react';
import {Console, Enemies, Players, useInitializeHealthValues, useSkill} from './BattleTools.jsx'

// const useBattleSequence = ()

export function Battle({playerTeam, enemyTeam}) {

    //WHAT MANAGES TEXT CONSOLE............................................
    const [consoleMessages, setConsoleMessages] = useState([])
    const addMessageToConsole = (message) => {setConsoleMessages(consoleMessages.concat(message))}

    //.....................................................................

    const [players, setPlayers] = useState(playerTeam)
    const [enemies, setEnemies] = useState(enemyTeam)

    //INITIALIZING HEALTH FOR ALL CHARACTERS IN BATTLE...............

    const {playersHealthsArray, enemiesHealthsArray} = useInitializeHealthValues(players, enemies)
    const [playersHealths, setPlayersHealths] = useState(playersHealthsArray)
    const [enemiesHealths, setEnemiesHealths] = useState(enemiesHealthsArray)

    //Comment créer une attaque ? useSkill(skillName, userTeam, userIndex, receiverTeam, receiverIndex)
    const simpleAttack = {baseDamages: 10}

    function useUpdateHealths(newHealths, onEnemiesOrPlayers) {
        onEnemiesOrPlayers === 'enemies' ? setEnemiesHealths(newHealths) : setPlayersHealths(newHealths)
    }


    //Ordre du combat : on sélectionne les actions pour tous les personnages joueurs,
    //puis le tour se déroule. L'ordre de jeu est en fonction de l'agilité des personnages.
    //chaque tour il nous faut : skill, user, receiver
    const turn1 = {skill: simpleAttack, user: {team: 'players', index: 0}, receiver: {team: 'enemies', index: 0}}
    const turn2 = {skill: simpleAttack, user: {team: 'enemies', index: 0}, receiver: {team: 'players', index: 0}}
    const sequence = {turn1, turn2}

    return <div className='battleZone'>

        <Enemies enemies={enemies} enemiesHealths={enemiesHealths}/>

        <Console consoleMessages={consoleMessages}/>

        <Players players={players} playersHealths={playersHealths}/>

        <div className='playerMenu'>
            <button onClick={() => {addMessageToConsole('prout')
                                    var {receiverTeamHealths, onEnemiesOrPlayers} = useSkill(simpleAttack, players, 0, 'enemies', enemiesHealths, 0)
                                    useUpdateHealths(receiverTeamHealths, onEnemiesOrPlayers)}}>Attaquer</button>
        </div>
        </div>}




