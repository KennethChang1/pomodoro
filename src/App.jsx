import { useEffect, useState, useReducer } from 'react'
import Pomodoro from './components/Pomodoro';

function App() {
  const [duration, setDuration] = useState({
    "pomodoro": 1500,
    "shortBreak": 5,
    "longBreak": 600
  });
  const [nav, setNav] = useState(1);
  const [time, setTime] = useState(duration.pomodoro);
  const [shortBreak, setShortBreak] = useState(duration.shortBreak);
  const [longBreak, setLongBreak] = useState(duration.longBreak);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(false)
  }, [nav])

  const displayTimer = (status) => {
    switch (status) {
      case 1:
        return <Pomodoro duration={duration.pomodoro} time={time} setTime={setTime} start={start} setStart={setStart}></Pomodoro>;
      case 2: 
        return <Pomodoro duration={duration.shortBreak} time={shortBreak} setTime={setShortBreak} start={start} setStart={setStart}></Pomodoro>;
      case 3: 
        return <Pomodoro duration={duration.longBreak} time={longBreak} setTime={setLongBreak} start={start} setStart={setStart}></Pomodoro>;
      default:
        return null;
    }
  }
  return (
    <>
      <nav>
        <h1 className='logo'>pomodoro</h1>
        <div className='container navigation'> 
          <button className={`btn btn-nav ${nav == 1 ? "btn-active":""}`} onClick={() => setNav(1)}>pomodoro</button>
          <button className={`btn btn-nav ${nav == 2 ? "btn-active":""}`} onClick={() => setNav(2)}>short break</button>
          <button className={`btn btn-nav ${nav == 3 ? "btn-active":""}`} onClick={() => setNav(3)}>long break</button>
        </div>
      </nav>
      <main>
        {displayTimer(nav)}
      </main>
    </>
  )
}

export default App
