import React, { Component } from "react";


class TimerComponent extends Component {
    constructor() {
        super();

        this.state = {
            timerOn: true,
            time: 0
        }
        this.timer = 0;
        this.countUp = this.countUp.bind(this);
    }

    setTimerOn = (on) => {
        this.setState({
            timerOn: on
        });
        console.log('Timer stopped');
    };

    setTime = (timeValue) => {
        this.setState({
            time: timeValue
        });
    };

    componentDidMount() {
        if (this.timer == 0) {
            this.timer = setInterval(this.countUp, 1000);
        }
    };

    countUp() {
        if(this.state.timerOn) {
            // Add one second, set state so a re-render happens.
            let time = this.state.time + 1000;
            this.setState({
                time: time,
            });
        } else {
            clearInterval(this.timer);
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