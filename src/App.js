import { useState, useEffect, useRef } from "react";
import "./App.css";
import Length from "./Length";
const audioSrc =
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";

function App() {
  const [time, setTime] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  let player = useRef(null);

  const breakSound = () => {
    player.currentTime = 0;
    player.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  useEffect(() => {
    if (time < 0 && !onBreak) {
      setOnBreak(true);
      breakSound();
      setTime(breakTime);
    } else if (time < 0 && onBreak) {
      setOnBreak(false);
      setTime(sessionTime);
    }
  }, [time]);

  const changeTime = (amount, type) => {
    if (!timerOn) {
      if (type === "Break") {
        if ((breakTime <= 1 && amount < 0) || (breakTime >= 60 && amount > 0)) {
          return;
        }
        setBreakTime((prevState) => prevState + amount);
      } else {
        if (
          (sessionTime <= 1 && amount < 0) ||
          (sessionTime >= 60 && amount > 0)
        ) {
          return;
        }
        setSessionTime((prevState) => prevState + amount);
        setTime((sessionTime + amount) * 60);
      }

      // if (onBreak) {
      //   setTime(breakTime * 1);
      // } else {
      //   setTime(sessionTime * 1);
      // }
    }
  };
  const controlTime = () => {
    if (!timerOn) {
      const countDown = setInterval(() => {
        setTime((prev) => {
          return prev - 1;
        });
      }, 1000);

      localStorage.clear();
      localStorage.setItem("interval-id", countDown);
      setTimerOn(true);
    } else {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setTime(1500);
    setTimerOn(false);
    setOnBreak(false);
    setBreakTime(5);
    setSessionTime(25);
    player.pause();
    player.currentTime = 0;
    clearInterval(localStorage.getItem("interval-id"));
  };

  return (
    <div>
      <h1 id="TIMER">TIMER</h1>
      <div className="length-control">
        <Length
          title={"Break"}
          time={breakTime}
          changeTime={changeTime}
          formatTime={formatTime}
        />
        <Length
          title={"Session"}
          time={sessionTime}
          changeTime={changeTime}
          formatTime={formatTime}
        />
      </div>

      <h1 id="timer-label">{onBreak ? "Break" : "Session"}</h1>
      <div className="display">
        <h1 id="time-left">{formatTime(time)}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "none",
          }}
        >
          <button id="start_stop" onClick={controlTime}>
            {timerOn ? (
              <i class="far fa-pause-circle" />
            ) : (
              <i class="far fa-play-circle" />
            )}
          </button>
          <button id="reset" onClick={resetTime}>
            <i class="far fa-stop-circle" />
          </button>
        </div>
      </div>
      <audio ref={(t) => (player = t)} src={audioSrc} id="beep" />
    </div>
  );
}

export default App;
