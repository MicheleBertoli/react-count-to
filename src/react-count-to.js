import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  from: PropTypes.number,
  to: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  delay: PropTypes.number,
  onComplete: PropTypes.func,
  digits: PropTypes.number,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.func,
};

const defaultProps = {
  from: 0,
  delay: 100,
  digits: 0,
  tagName: 'span',
};

class CountTo extends Component {
  constructor(props) {
    super();

    const { from } = props;

    this.state = {
      counter: from,
    };

    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.start();
  }

  componentWillReceiveProps(nextProps) {
    const { from, to } = this.props;

    if (nextProps.to !== to || nextProps.from !== from) {
      this.start();
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  start() {
    this.clear();
    const { from } = this.props;
    this.setState({
      counter: from,
    }, () => {
      const { delay, speed, to } = this.props;
      const { counter } = this.state;
      this.loopsCounter = 0;
      this.loops = Math.ceil(speed / delay);
      this.increment = (to - counter) / this.loops;
      this.interval = setInterval(this.next, delay);
    });
  }

  next() {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      this.setState(({ counter }) => ({
        counter: counter + this.increment,
      }));
    } else {
      const { onComplete } = this.props;
      this.clear();

      if (onComplete) {
        onComplete();
      }
    }
  }

  clear() {
    clearInterval(this.interval);
  }

  render() {
    const { className, digits, tagName: Tag, children: fn } = this.props;
    const { counter } = this.state;
    const value = counter.toFixed(digits);

    if (fn) {
      return fn(value);
    }

    return (
      <Tag className={className}>
        {value}
      </Tag>
    );
  }
}

CountTo.propTypes = propTypes;
CountTo.defaultProps = defaultProps;

export default CountTo;
