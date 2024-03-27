export function StartMenu ({startClick}) {
    return <div className='startMenuDiv'>
        <div className='startMenu'>
            <button onClick={startClick}>Nouveau combat</button>
        </div>
    </div>
}