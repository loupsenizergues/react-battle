import { useState,useRef,useEffect,createContext } from 'react';
import {Console, Enemies, Players, useInitializeHealthValues, useBattleSequence} from './BattleTools.jsx'
import {wait, resolveAfter} from './helpers.jsx'

export const battleContext = createContext()

export function Battle() {


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
        addMessageToConsole
      }}>
        <div className='battleZone'>

            <Enemies/>

            <Console consoleMessages={consoleMessages}/>

            <Players/>

            <div className='tests'>
            </div>
        </div>
    </battleContext.Provider>
    }