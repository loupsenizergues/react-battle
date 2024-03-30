import { useState,useRef,useEffect } from 'react';
import {Console, Enemies, Players, useInitializeHealthValues} from './BattleTools.jsx'

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

    //Ordre du combat : on sélectionne les actions pour tous les personnages joueurs,
    //puis le tour se déroule. L'ordre de jeu est en fonction de l'agilité des personnages.


    return <div className='battleZone'>

        <Enemies enemies={enemies} enemiesHealths={enemiesHealths}/>

        <Console consoleMessages={consoleMessages}/>

        <Players players={players} playersHealths={playersHealths}/>

        <div className='playerMenu'>
            <button onClick={() => {addMessageToConsole('prout')
                                    enemiesHealths[0]-=10
                                    setEnemiesHealths(enemiesHealths)}}>Attaquer</button>
        </div>
        </div>}




