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
        selectingTarget,
        setSelectingTarget,
        currentChoice,
        setCurrentChoice,
        consoleMessages,
        addMessageToConsole
      } = useBattleSequence()
    
    useEffect(() => {
      var newPlayers = []
      var newEnemies = []
      for (var i=0; i<playersHealths.length; i++) {
        if (playersHealths[i] > 0) newPlayers.push(players[i])
      }
      for (var i=0; i<enemiesHealths.length; i++) {
        if (enemiesHealths[i] > 0) newEnemies.push(enemies[i])
      }
    setEnemies(newEnemies)
    setPlayers(newPlayers)
    }, [playersHealths, enemiesHealths])
    

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