import React, { Component } from "react";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  componentWillMount() {
    this.getElapsedTime(this.props.timeIn);
  }
  componentDidMount() {
    // console.log(this.props)
    setInterval(() => this.getElapsedTime(this.props.timeIn), 1000);
  }
  leading0(num) {
    return num < 10 ? "0" + num : num;
  }
  getElapsedTime(time_in) {
    const time = Date.parse(new Date()) - Date.parse(time_in);
    if (time < 0) {
      this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
        
      this.props.data.updateBilling(this.props.data.parkingMap, this.props.data.data, this.props.timeIn)
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.setState({ days, hours, minutes, seconds });
    }
  }
  render() {
    return (
      <div>
        {
            `${this.state.days > 0 ? `${this.leading0(this.state.days)}days -` : ''} 
            ${this.leading0(this.state.hours)}hr : 
            ${this.leading0(this.state.minutes)}min : 
            ${this.leading0(this.state.seconds)}sec`
        }
      </div>
    );
  }
}
export default Clock;
