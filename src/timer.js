import React from "react";

function Timer() {
    // Timer hooks
    const [time, setTime] = React.useState(0); // Start at t = 0
    const [timerOn, setTimerOn] = React.useState(true); // Timer starts as soon as level is loaded

    React.useEffect(() => {
        let interval = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const stopTimer = () => {
        setTimerOn(false);
    };

    return (
        <div className="Timers">
            <div id="display">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
            </div>

            <div id="buttons">
                {!timerOn && time === 0 && (
                    <button onClick={() => setTimerOn(true)}>Start</button>
                )}
                {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>}
                {!timerOn && time > 0 && (
                    <button onClick={() => setTime(0)}>Reset</button>
                )}
                {!timerOn && time > 0 && (
                    <button onClick={() => setTimerOn(true)}>Resume</button>
                )}
            </div>
        </div>
    );
}

export default Timer