import "./Timer.css";
import { Button, Grid } from "@material-ui/core";
import ScoreTable from "./ScoreTable";
import React, { Component } from "react";
import { setSerialPort } from "../utils/Serial";
const Readline = require("@serialport/parser-readline");

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      timer: "00.00",
      results: [],
    };

    this.intervalId = null;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.clearTable = this.clearTable.bind(this);
  }

  startTimer = async () => {
    this.setState({
      isRunning: true,
    });
    this.port = await setSerialPort();
    // Read the port data
    setTimeout(() => {
      var startTime = Date.now();
      var currentTime = 0;
      const parser = this.port.pipe(new Readline({ delimiter: "\n" }));
      this.port.flush((err) => {
        console.log("flush err", err);
      });
      parser.on("data", (data) => {
        if (parseInt(data) === 1 && currentTime !== 0) {
          this.port.close((err) => {
            console.log("port close", err);
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
    const { timer, isRunning, results } = this.state;
    return (
      <div className='container'>
        <Grid container spacing={10}>
          <Grid item sm={6}>
            <div className='timer-container'>
              <span className='timer-display'>{timer}</span>
            </div>
            <div className='timer-buttons'>
              <Button
                variant='contained'
                color='primary'
                className='timer-button1'
                size='large'
                disabled={isRunning}
                onClick={this.startTimer}
              >
                Start
              </Button>
              <Button
                variant='contained'
                color='secondary'
                className='timer-button2'
                size='large'
                onClick={this.stopTimer}
              >
                Stop
              </Button>
            </div>
          </Grid>
          <Grid item sm={6}>
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
