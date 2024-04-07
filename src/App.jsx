import {Battle} from './Battle.jsx'
import {StartMenu} from './StartMenu.jsx'
import './App.css'
import {playerTeam,enemyTeam} from './variables.jsx'
import {useState, createContext} from 'react'



function App() {

  const [mode,setMode] = useState('start')

  return <div>

      {mode === 'start' && <StartMenu startClick={() => setMode('battle')}/>}

      {mode === 'battle' && <Battle/>}

    </div>
}

export default App
