import { useState,useRef,useEffect } from 'react';

export function Battle({player, enemy}) {
    const [playerHealth, setPlayerHealth] = useState(player.healthMax)
    const [enemyHealth, setEnemyHealth] = useState(enemy.healthMax)

    const consoleRef = useRef()
    const [consoleMessages, setConsoleMessages] = useState([])
    const addMessageToConsole = (message) => {setConsoleMessages(consoleMessages.concat(message))}

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
          }
    }, [consoleMessages])

    return <div className='battleZone'>
        <div className='dungeonDiv'>
            <div className='enemyDiv'>
                <div>{enemy.name}</div>
                <div>{enemyHealth}/{enemy.healthMax} HP</div>
            </div>
        </div>
        <div className='console' ref={consoleRef}>
            {consoleMessages.map((msg,index) =>
                <div key={index}>{msg}</div>)}
        </div>
        <div className='bottomPanel'>
            <div className='playerDiv'>
                <div>
                    <img src={player.img}/>
                    <div>{player.name}</div>
                    <div>{playerHealth}/{player.healthMax} HP</div>
                </div>
                <div className='playerMenu'>
                    <button onClick={() => addMessageToConsole('Attaquer')}>Attaquer</button>
                    <button onClick={() => addMessageToConsole('Compétences')}>Compétences</button>
                    <button onClick={() => addMessageToConsole('Défendre')}>Défendre</button>
                </div>
            </div>
        </div>
    </div>
    }
