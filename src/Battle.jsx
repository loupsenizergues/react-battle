import { useState,useRef,useEffect } from 'react';

function Bar ({value, valueMax, label, height=20, color='red'}) {

    var percentage = (value/valueMax) * 100;
    if (value<=0) {percentage=0}
    const barStyle = {
        width: `${percentage}%`,
        height: 20,
        background: 'red',
      }

    return <div>
        <div style={barStyle}>{value}/{valueMax} {label}</div>
    </div>
}

export function Battle({playerStats, enemyTeam}) {
    const consoleRef = useRef()
    const [consoleMessages, setConsoleMessages] = useState([])
    const addMessageToConsole = (message) => {setConsoleMessages(consoleMessages.concat(message))}

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
          }
    }, [consoleMessages])

    const [player, setPlayer] = useState(playerStats)

    const [enemies, setEnemies] = useState(enemyTeam)

    const [turnState, setTurnState] = useState('playerTurn')
    const [playerChoice, setPlayerChoice] = useState('')

    const simpleAttack= () => {
        var newHealth=enemies[0].health - 10
        enemies[0] = {...enemies[0], health: newHealth}
        setEnemies(enemies)}

    useEffect(() => {
        if (turnState === 'playerTurn') {
            addMessageToConsole('Tour du joueur: Choisissez une action')
        }
    }, [turnState])

    useEffect(() => {
        if (playerChoice === 'simpleAttack') {
            simpleAttack()
            addMessageToConsole('attack')
            setPlayerChoice('')}
        }, [playerChoice])

    return <div className='battleZone'>
        <div className='dungeonDiv'>
            <div className='enemyDiv'>
                {enemies.map((enemy,index) =>
                    <div className='enemyInfos' key={index}>
                        <img className='avatar' src={enemy.img}/>
                        <div>{enemy.name}</div>
                        <Bar value={enemy.health} valueMax={enemy.healthMax} label='PV'/>
                    </div>)}
            </div>
        </div>
        <div className='console' ref={consoleRef}>
            {consoleMessages.map((msg,index) =>
                <div key={index}>{msg}</div>)}
        </div>
        <div className='bottomPanel'>
            <div className='playerDiv'>
                <div className='playerInfos'>
                    <img src={player.img}/>
                    <div>{player.name}</div>
                    <Bar value={player.health} valueMax={player.healthMax} label='PV'/>
                </div>

                <div className='playerMenu'>
                    <button onClick={() => setPlayerChoice('simpleAttack')}>Attaquer</button>
                    <button>Compétences</button>
                    <button>Défendre</button>
                </div>
            </div>
        </div>
    </div>
    }
