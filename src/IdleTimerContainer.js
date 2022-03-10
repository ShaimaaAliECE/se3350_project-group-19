import IdleTimer from "react-idle-timer";
import React from "react"
import { Component, useRef } from "react";

// After 5 minutes of inactivity, the session should time out and go back to the home page.

class IdleTimerContainer extends Component {
    constructor(props) {
      super(props);
      this.idleTimer = null
      this.handleOnAction = this.handleOnAction.bind(this);
      this.handleOnActive = this.handleOnActive.bind(this);
      this.handleOnIdle = this.handleOnIdle.bind(this);
    }
  
    render() {
      return (
        <div>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            timeout={5 * 60 * 1000} // Idle timeout in milliseconds.
            onActive={this.handleOnActive}
            onIdle={this.handleOnIdle}
            onAction={this.handleOnAction}
            debounce={250}
          />
        </div>
      )
    };
  
    // Function to call on user action.
    handleOnAction (event) {
      console.log("User has input an action.",event);
    }
  
    // Function to call when user is no longer idle.
    handleOnActive (event) {
      console.log("User is active.", event);
      console.log("Time until idle logout: ", this.idleTimer.getRemainingTime());
    }
  
    // Function to call when user is now idle.
    handleOnIdle (event) {
      console.log("User is idle", event);
      console.log("Last activity: ", this.idleTimer.getLastActiveTime());
      window.location.href = window.location.protocol + "//" + window.location.host + "/";
    }
  }

export default IdleTimerContainer;