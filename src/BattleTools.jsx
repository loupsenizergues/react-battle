import { useState,useRef,useEffect } from 'react';


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

export function Console({consoleMessages}) {
    const consoleRef = useRef()

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

export function Enemies({enemies, enemiesHealths}) {
    return <div className='dungeonDiv'>
                <div className='enemiesDiv'>
                        {enemies.map((enemy,index) =>
                        <Enemy enemy={enemy} enemyHealth={enemiesHealths[index]} index={index}/>)}</div>
                </div>}

export function Players({players, playersHealths}) {

    return <div className='bottomPanel'>
               <div className='playersDiv'>
                    {players.map((player,index) =>
                    <Player player={player} playerHealth={playersHealths[index]} index={index}/>)}
                </div>
            </div>}

function Player({player, playerHealth, index}) {
    const [playerChoice, setPlayerChoice] = useState({user: player, skill: null, target: null})
    var [choiceIsDone,setChoiceIsDone] = useState(false)

    useEffect(() => playerChoice.skill !== null && playerChoice.target !== null ? setChoiceIsDone(true) : setChoiceIsDone(false))

    const selectSkill = (skill) => {
        var playerChoiceCopy = playerChoice
        playerChoiceCopy.skill=skill
        setPlayerChoice(playerChoiceCopy)
    }

    const selectTarget = (target) => {
        var playerChoiceCopy = playerChoice
        playerChoiceCopy.target=target
        setPlayerChoice(playerChoiceCopy)
    }

    return <div className='player' key={index}>
        <div className='playerInfos'>
            <img className='avatar' src={player.img}/>
            <div>{player.name}</div>
            <Bar value={playerHealth} valueMax={player.healthMax} widthMultiplicator={0.5} label='PV'/>
        </div>
        <div className='playerMenu'>
            {player.skills.map((skill, index) => 
            <button onClick={() => {
                selectSkill(skill)
            }}key={index}>{skill.name}</button>)}

            {/* <div>{player.name} utilisera {playerChoice.skill} sur {playerChoice.target.name}</div> */}
        </div>
</div>
}

function Enemy ({enemy, enemyHealth, index}) {
    return <div className={'enemy'} key={index}>
    <img className={'avatar'} src={enemy.img} />
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

export function useSkill(skill, userTeam, userIndex, receiverTeam, receiverIndex) {
    const damages = (skill.baseDamages + userTeam[userIndex].strength * 0.2)
    return {damages}
}
