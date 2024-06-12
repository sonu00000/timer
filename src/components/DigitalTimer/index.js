import {useEffect, useState} from 'react'
import './index.css'

// const INITIAL_MINS = 25

const DigitalTimer = () => {
  const [initialMins, setInitialMins] = useState(25)
  const [time, setTime] = useState(initialMins * 60)
  const [isStarted, setIsStarted] = useState(false)
  // const [isReset, setIsReset] = useState(false)

  function getMinutes() {
    return Math.floor(time / 60)
  }

  function getSeconds() {
    return time % 60
  }

  function onReset() {
    setIsStarted(false)
    // setIsReset(true)
    setTime(25 * 60)
    setInitialMins(25)
  }

  function onIncrease() {
    setTime(prevState => prevState + 60)
    setInitialMins(prevState => prevState + 1)
  }

  function onDecrease() {
    setTime(prevState => prevState - 60)
    setInitialMins(prevState => prevState - 1)
  }

  useEffect(
    function () {
      if (!isStarted) {
        return
      }
      let timerId = setInterval(function () {
        setTime(prevState => prevState - 1)
      }, 1000)

      if (time === 0) {
        clearInterval(timerId)
        setTime(0)
        setIsStarted(false)
        return
      }

      return () => clearInterval(timerId)
    },
    [isStarted, time],
  )

  const minutes = getMinutes()
  const seconds = getSeconds()

  return (
    <div className="bg-container">
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
              alt=""
              className="timer-img"
            />
            <div className="countdown-timer">
              <p>
                <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
              </p>
              <p class="timer-status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-control-container">
            <div className="timer-buttons-container">
              <div className="button-container">
                <button
                  className="btn"
                  onClick={() => setIsStarted(prevState => !prevState)}
                >
                  {!isStarted ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="btn-icon"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="btn-icon"
                    />
                  )}
                </button>
                <p>{isStarted ? 'Stop' : 'Start'}</p>
              </div>
              <div className="button-container">
                <button className="btn" onClick={onReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="btn-icon"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="timer-limit-container">
              <button
                className="btn limit-btn"
                disabled={isStarted}
                onClick={onDecrease}
              >
                -
              </button>
              <div className="time-limit">{initialMins}</div>
              <button
                className="btn limit-btn"
                disabled={isStarted}
                onClick={onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DigitalTimer
