import { useState,useRef,useEffect } from 'react';
import {Console, Enemies, Players, useInitializeHealthValues} from './BattleTools.jsx'
import {wait, resolveAfter} from './helpers.jsx'
import {playerTeam, enemyTeam} from './variables.jsx'


export function Battle() {

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

    const [sequence,setSequence] = useState([])

    return <div className='battleZone'>

        <Enemies enemies={enemies} enemiesHealths={enemiesHealths}/>

        <Console consoleMessages={consoleMessages}/>

        <Players players={players} enemies={enemies} playersHealths={playersHealths}/>

        <div className='tests'>
        </div>
        </div>
    }