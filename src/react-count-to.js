import React, { PureComponent } from 'react';
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
  easing: PropTypes.func,
};

const defaultProps = {
  from: 0,
  delay: 100,
  digits: 0,
  tagName: 'span',
  easing: t => t,
};

class CountTo extends PureComponent {
  constructor(props) {
    super(props);

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
      this.start(nextProps);
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  start(props = this.props) {
    this.clear();
    const { from } = props;
    this.setState({
      counter: from,
    }, () => {
      const { delay, speed, to } = this.props;
      this.loopsCounter = 0;
      this.loops = Math.ceil(speed / delay);
      this.delta = to - from;
      this.interval = setInterval(this.next, delay);
    });
  }

  next() {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      const { from, easing } = this.props;
      const counter = from + this.delta * easing(this.loopsCounter / this.loops);
      this.setState({
        counter,
      });
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
