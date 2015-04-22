import React from 'react';

let CountTo = React.createClass({

  propTypes: {
    from: React.PropTypes.number,
    to: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    delay: React.PropTypes.number,
    onComplete: React.PropTypes.func
  },

  getInitialState() {
    return {
      counter: this.props.from || 0
    };
  },

  componentDidMount() {
    let delay = this.props.delay || 100;
    let loops = Math.ceil(this.props.speed / delay);
    this.increment = (this.props.to - this.state.counter) / loops;
    this.interval = setInterval(this.next, delay);
  },

  componentWillUnmount() {
    this.clear();
  },

  next() {
    if (this.state.counter < this.props.to) {
      this.setState({
        counter: this.state.counter + this.increment
      });
    } else {
      this.clear();
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  },

  clear() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <span>
        {this.state.counter}
      </span>
    );
  }

});

export default CountTo;
