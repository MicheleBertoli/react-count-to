import React from 'react';

const CountTo = React.createClass({

  propTypes: {
    from: React.PropTypes.number,
    to: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    delay: React.PropTypes.number,
    onComplete: React.PropTypes.func,
    digits: React.PropTypes.number,
    className: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      from: 0,
      delay: 100,
      digits: 0,
    };
  },

  getInitialState() {
    const { from } = this.props;

    return {
      counter: from,
    };
  },

  componentDidMount() {
    this.start();
  },

  componentWillReceiveProps(nextProps) {
    const { from, to } = this.props;

    if (nextProps.to !== to || nextProps.from !== from) {
      this.start();
    }
  },

  componentWillUnmount() {
    this.clear();
  },

  start() {
    this.clear();
    this.setState(this.getInitialState(), () => {
      const { delay, speed, to } = this.props;
      const { counter } = this.state;
      this.loopsCounter = 0;
      this.loops = Math.ceil(speed / delay);
      this.increment = (to - counter) / this.loops;
      this.interval = setInterval(this.next, delay);
    });
  },

  next() {
    if (this.loopsCounter < this.loops) {
      const { counter } = this.state;
      this.loopsCounter++;
      this.setState({
        counter: counter + this.increment,
      });
    } else {
      const { onComplete } = this.props;
      this.clear();

      if (onComplete) {
        onComplete();
      }
    }
  },

  clear() {
    clearInterval(this.interval);
  },

  render() {
    const { className, digits } = this.props;
    const { counter } = this.state;
    const value = counter.toFixed(digits);

    return (
      <span className={className}>
        {value}
      </span>
    );
  },

});

export default CountTo;
