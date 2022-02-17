import React, { Component } from "react";


class TimerComponent extends Component {
    constructor() {
        super();

        this.state = {
            timerOn: true,
            time: 0
        }
        this.countUp = this.countUp.bind(this);
    }

    setTimerOn = (on) => {
        this.setState({
            timerOn: on
        });
    };

    setTime = (timeValue) => {
        this.setState({
            time: timeValue
        });
    };

    componentDidMount() {
        setInterval(this.countUp, 1000);
    };

    resetTimer() {
        this.setState({
            time: 0,
            timerOn: true
        });
    };

    countUp() {
        if(this.state.timerOn) {
            // Add one second, set state so a re-render happens.
            let time = this.state.time + 1000;
            this.setState({
                time: time,
            });
        }
    };

    render() {
        return (
            <div className="Timers">
                <div id="display">
                    <span>{("0" + Math.floor((this.state.time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((this.state.time / 1000) % 60)).slice(-2)}</span>
                </div>
            </div>
        );
    }
}

export default TimerComponent;