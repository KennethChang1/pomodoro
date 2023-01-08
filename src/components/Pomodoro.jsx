import { useEffect, useState, useRef } from "react";
import alarm from '../assets/alarm-clock-short-6402.mp3';

const audio = new Audio(alarm);

const Pomodoro = ({time, setTime, duration, start, setStart}) => {
  const [minute, setMinute] = useState(time/60);
  const [seconds, setSeconds] = useState(time%60);
  const radius = 130;
  const tick = useRef();

  const handleClick = () => {
    setStart(prev => !prev);
  }

  const handleRestart = () => {
    audio.pause();
    setTime(duration);
    setStart(false);
  }

  useEffect(() => {
    setMinute(time/60);
    setSeconds(time%60);

    if (start && time > 0) {
      tick.current = setInterval(() => { // <-- set tick ref current value
        setTime((timer) => timer - 1);
      }, 1000);
    } else if (time == 0) {
      audio.play();
    }

    return () => {
      clearInterval(tick.current);
    };
  }, [start, time])

  return (
    <div className="container timer">
      <p className="time">{`${Math.trunc(minute)}:${seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2
      })}`}</p> 
      {time == 0 
        ? <button className={`btn btn-start`} onClick={handleRestart}>RESTART</button>
        : (start 
          ? <button className={`btn btn-start`} onClick={handleClick}>STOP</button> 
          : <button className={`btn btn-start`} onClick={handleClick}>START</button>
      )}
      <svg className="circle">
        <circle cx="150" cy="150" r={radius} stroke="#F87070" strokeWidth="10" strokeDasharray={2 * Math.PI * radius} strokeDashoffset="0" fill="none" />
        Sorry, your browser does not support inline SVG.  
      </svg>
    </div>
  );
};

export default Pomodoro;
