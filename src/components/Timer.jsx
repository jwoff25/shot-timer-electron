import "./Timer.css";
import { Button, Grid } from "@material-ui/core";
import ScoreTable from "./ScoreTable";
import React, { Component } from "react";
import { setSerialPort } from "../utils/Serial";
const Readline = require("@serialport/parser-readline");
const path = require("path");

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      isDisabled: false,
      timer: "00.00",
      results: [],
    };

    this.intervalId = null;
    this.beep = new Audio(
      process.env.NODE_ENV === "development"
        ? "/beep.mp3"
        : path.join(window.process.resourcesPath, "beep.mp3")
    );

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTable = this.clearTable.bind(this);
  }

  startTimer = async () => {
    this.setState({
      isRunning: true,
      isDisabled: true,
    });
    this.port = await setSerialPort();
    // Read the port data
    setTimeout(() => {
      this.beep.play();
      this.setState({
        isDisabled: false,
      });
      var startTime = Date.now();
      var currentTime = 0;
      const parser = this.port.pipe(new Readline({ delimiter: "\n" }));
      this.port.flush((err) => {
        console.log("flushed port ", err);
      });
      parser.on("data", (data) => {
        if (parseInt(data) === 1 && currentTime !== 0) {
          this.port.close((err) => {
            console.log("port closed ", err);
          });
          const timeToDisplay = parseFloat(currentTime.toFixed(2));
          this.setState((prevState) => ({
            isRunning: false,
            results:
              prevState.results.length === 5
                ? [timeToDisplay]
                : [...prevState.results, timeToDisplay],
          }));
          return;
        }
        currentTime = (Date.now() - startTime) / 1000;
        console.log(currentTime);
        this.setState({
          timer: currentTime.toFixed(2),
        });
      });
    }, 3000);
  };

  stopTimer() {
    this.setState({
      isRunning: false,
    });
    if (this.port) {
      this.port.open(() => {
        this.port.close((err) => {
          console.log("port close", err);
        });
      });
    }
  }

  clearTable() {
    this.setState({
      results: [],
    });
  }

  render() {
    const { timer, isRunning, results, isDisabled } = this.state;
    return (
      <div className='container'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className='timer-container'>
              <span className='timer-display'>{timer}</span>
            </div>
            <div className='timer-buttons'>
              <Button
                variant='contained'
                color={isRunning ? "secondary" : "primary"}
                disabled={isDisabled}
                size='large'
                onClick={isRunning ? this.stopTimer : this.startTimer}
              >
                {isRunning ? "Stop" : "Start"}
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ScoreTable results={results} />
            <Button
              variant='contained'
              className='clear-button'
              onClick={this.clearTable}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
