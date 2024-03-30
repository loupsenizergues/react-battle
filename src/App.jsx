import {Battle} from './Battle.jsx'
import {StartMenu} from './StartMenu.jsx'
import './App.css'
import * as variables from './variables.jsx'
import {useState} from 'react'

function App() {

  const [mode,setMode] = useState('start')

  return <div>

      {mode === 'start' && <StartMenu startClick={() => setMode('battle')}/>}

      {mode === 'battle' && <Battle playerTeam={variables.playerTeam} enemyTeam={variables.enemyTeam}/>}

    </div>
}

export default App
