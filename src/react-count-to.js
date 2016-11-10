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
      onComplete: () => {},
    };
  },

  getInitialState() {
    return {
      counter: this.props.from,
    };
  },

  componentDidMount() {
    this.start();
  },

  componentWillReceiveProps(nextProps) {
    const props = this.props;

    // no need to restart animation if onComplete / digits / className changes
    if (nextProps.to !== props.to || nextProps.from !== props.from
    || nextProps.speed !== props.speed || nextProps.delay !== props.delay) {
      this.start();
    }
  },

  componentWillUnmount() {
    this.clear();
  },

  start() {
    this.clear();
    this.setState(this.getInitialState(), () => {
      const delay = this.props.delay;
      this.loopsCounter = 0;
      this.loops = Math.ceil(this.props.speed / delay);
      this.increment = (this.props.to - this.state.counter) / this.loops;
      this.interval = setInterval(this.next, delay);
    });
  },

  next() {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      this.setState({
        counter: this.state.counter + this.increment,
      });
    } else {
      this.clear();
      this.props.onComplete();
    }
  },

  clear() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <span className={this.props.className}>
        {this.state.counter.toFixed(this.props.digits)}
      </span>
    );
  },

});

export default CountTo;
