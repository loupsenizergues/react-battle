import { useState,useRef,useEffect, useContext } from 'react';
import { battleContext } from './Battle';
import {playerTeam, enemyTeam, simpleAttack} from './variables.jsx'
import { wait } from './helpers.jsx';

export const useMakeEnemiesChoices = (enemies, players) => {
    var enemiesChoices = []
    var enemyIndex = 0
    enemies.forEach((enemy) => {
        const skillIndex=0 //A FAIRE RANDOM POUR L'INSTANT
        const targetIndex=0
        const choice = {skill: enemy.skills[skillIndex], userIndex: enemyIndex, target: {team: players, index: targetIndex}}
        enemiesChoices.push(choice)
    })
    return enemiesChoices
}

export const useBattleSequence = () => {

    function useSkill(skill, userTeam, userIndex, receiverTeam, receiverIndex) {
        const damages = (skill.baseDamages + userTeam[userIndex].strength * 0.2)
        return damages
    }
    //WHAT MANAGES TEXT CONSOLE............................................
    const [consoleMessages, setConsoleMessages] = useState([])
    const addMessageToConsole = (message) => {setConsoleMessages(prev => prev.concat(message))}
    //.....................................................................

    const makeDamage = (damages, team, index) => {
        if (team === enemies) {
            setEnemiesHealths(prev => {
                const updatedEnemiesHealths = [...prev];
                updatedEnemiesHealths[index] -= damages;
                return updatedEnemiesHealths;
            });
        } else {
            setPlayersHealths(prev => {
                const updatedPlayersHealths = [...prev];
                updatedPlayersHealths[index] -= damages;
                return updatedPlayersHealths;
            });
        }
    };
    
    
    const [players, setPlayers] = useState(playerTeam)
    const [enemies, setEnemies] = useState(enemyTeam)

    //INITIALIZING HEALTH FOR ALL CHARACTERS IN BATTLE...............

    const {playersHealthsArray, enemiesHealthsArray} = useInitializeHealthValues(players, enemies)
    const [playersHealths, setPlayersHealths] = useState(playersHealthsArray)
    const [enemiesHealths, setEnemiesHealths] = useState(enemiesHealthsArray)

    const [playersChoices, setPlayersChoices] = useState([])
    // const [enemiesChoices,setEnemiesChoices] = useState([])

    const [selectingTarget,setSelectingTarget] = useState(false)
    const [currentChoice,setCurrentChoice] = useState({userIndex: 0})

    if (playersChoices.length === players.length) {
        const enemiesChoices = useMakeEnemiesChoices(enemies, players)
        for (const e of playersChoices) {
            const damages = useSkill(e.skill, players, e.userIndex, e.target.team, e.target.index)
            const message = `${damages} dommages infligés à ${e.target.team[e.target.index].name}`
            makeDamage(damages, e.target.team, e.target.index)
            addMessageToConsole(message)
        }

        for (const e of enemiesChoices) {
            const damages = useSkill(e.skill, enemies, e.userIndex, e.target.team, e.target.index)
            const message = `${damages} dommages infligés à ${e.target.team[e.target.index].name}`
            makeDamage(damages, e.target.team, e.target.index)
            addMessageToConsole(message)
        }

        setPlayersChoices([])
        setCurrentChoice({userIndex: 0})
    }

    return {
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
        setConsoleMessages,
        addMessageToConsole
      }
}

export function Bar ({value, valueMax, label, height=20, widthMultiplicator=1, color='red'}) {

    var percentage = (value/valueMax) * 100;
    if (value<=0) {percentage=0}
    const barStyle = {
        width: `${percentage * widthMultiplicator}%`,
        height: {height},
        background: 'red',
      }

    return <div>
        <div style={barStyle}>{value}/{valueMax} {label}</div>
    </div>
}

export function Console() {
    const consoleRef = useRef()
    const {consoleMessages} = useContext(battleContext)

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
          }
    }, [consoleMessages])

    return <div className='console' ref={consoleRef}>
    {consoleMessages.map((msg, index) => (
      <div key={index}>{msg}</div>
    ))}</div>
}

export function Enemies() {
    const {enemies, enemiesHealths} = useContext(battleContext)

    return <div className='dungeonDiv'>
                <div className='enemiesDiv'>
                        {enemies.map((enemy,index) =>
                        <Enemy enemy={enemy} enemyHealth={enemiesHealths[index]} index={index}/>)}</div>
                </div>}

export function Players() {
    const {players, playersHealths} = useContext(battleContext)

    return <div className='bottomPanel'>
               <div className='playersDiv'>
                    {players.map((player,index) =>
                    <Player player={player} playerHealth={playersHealths[index]} index={index}/>)}
                </div>
            </div>}

function Player({player, playerHealth, index}) {
    const {players,addMessageToConsole, playersChoices, setPlayersChoices, enemies, currentChoice, setCurrentChoice, selectingTarget, setSelectingTarget} = useContext(battleContext)

    useEffect(() => {if (currentChoice.userIndex === index && currentChoice.skill && currentChoice.target) {
        playersChoices[index] = currentChoice
        setPlayersChoices(playersChoices)
        setCurrentChoice({userIndex: index + 1})
    }}, [currentChoice])

    return <div className='player' key={index}>
        <div className='playerInfos'>
            <img className='avatar' src={player.img}/>
            <div>{player.name}</div>
            <Bar value={playerHealth} valueMax={player.healthMax} widthMultiplicator={0.5} label='PV'/>
        </div>
        {currentChoice.userIndex === index && 

        <div className='playerMenu'>
            {player.skills.map((skill, index) =>
            <button onClick={() => {
                setCurrentChoice({...currentChoice, skill: skill})
                setSelectingTarget(true)
            }
            } key={index}>{skill.name}</button>)}
            {currentChoice.skill  && <p>Action: {currentChoice.skill.name}</p>}
            {selectingTarget  && <p>Choisissez une cible</p>}
            {currentChoice.target && <p>Cible: {currentChoice.target.index}</p>}
        </div>}

        {currentChoice.userIndex !== index && playersChoices[index] &&
        <p>{playersChoices[index].skill.name} sur {playersChoices[index].target.team[playersChoices[index].target.index].name}</p>
        }
</div>}


function Enemy ({enemy, enemyHealth, index}) {
    const {enemies, selectingTarget, setSelectingTarget, currentChoice, setCurrentChoice} = useContext(battleContext)

    const handleClickOnEnemy = () => {
        if (selectingTarget) {
            setCurrentChoice({...currentChoice, target: {team: enemies, index: index}})
            setSelectingTarget(false)
        }
    }

    return <div className={'enemy'} key={index}>
    <img className={'avatar'} src={enemy.img} onClick={() => handleClickOnEnemy()}/>
    <div>{enemy.name}</div>
    <Bar value={enemyHealth} valueMax={enemy.healthMax} widthMultiplicator={0.5} label='PV'/>
</div>
}

export function useInitializeHealthValues (players,enemies) {
    var playersHealthsArray = []
    players.forEach((player) => playersHealthsArray.push(player.healthMax))
    var enemiesHealthsArray = []
    enemies.forEach((enemy) => enemiesHealthsArray.push(enemy.healthMax))
    return {playersHealthsArray, enemiesHealthsArray}
}


