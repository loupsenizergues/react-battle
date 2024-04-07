import { useState,useRef,useEffect,createContext } from 'react';
import {Console, Enemies, Players, useInitializeHealthValues, useBattleSequence} from './BattleTools.jsx'
import {wait, resolveAfter} from './helpers.jsx'

export const battleContext = createContext()

export function Battle() {
    const [turn, setTurn] = useState(0);

    const {
        players,
        setPlayers,
        enemies,
        setEnemies,
        playersHealths,
        setPlayersHealths,
        enemiesHealths,
        setEnemiesHealths,
        playersChoices,
        setPlayersChoices,
        enemiesChoices,
        setEnemiesChoices,
        selectingTarget,
        setSelectingTarget,
        currentChoice,
        setCurrentChoice,
        consoleMessages,
        addMessageToConsole
      } = useBattleSequence()

    return <battleContext.Provider value={{
        players,
        setPlayers,
        enemies,
        setEnemies,
        playersHealths,
        setPlayersHealths,
        enemiesHealths,
        setEnemiesHealths,
        playersChoices,
        setPlayersChoices,
        enemiesChoices,
        setEnemiesChoices,
        selectingTarget,
        setSelectingTarget,
        currentChoice,
        setCurrentChoice,
        addMessageToConsole,
        consoleMessages,
      }}>
        <div className='battleZone'>

            <Enemies/>

            <Console/>

            <Players/>

            <div className='tests'>
            </div>
        </div>
    </battleContext.Provider>
    }