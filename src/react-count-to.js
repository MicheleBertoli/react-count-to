import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  from: PropTypes.number,
  to: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  onComplete: PropTypes.func,
  digits: PropTypes.number,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.func,
  easing: PropTypes.func,
};

const defaultProps = {
  from: 0,
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
    this.updateCounter = this.updateCounter.bind(this);
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
      const { speed } = this.props;
      this.endDate = Date.now() + speed;
      this.raf = requestAnimationFrame(this.next);
    });
  }

  next() {
    const now = Date.now();
    const { speed, onComplete } = this.props;
    const progress = Math.max(0, Math.min(1, 1 - (this.endDate - now) / speed));
    this.updateCounter(progress);

    if (now < this.endDate) {
      this.raf = requestAnimationFrame(this.next);
    } else if (onComplete) {
      onComplete();
    }
  }

  updateCounter(progress) {
    const { from, to, easing } = this.props;
    const delta = to - from;
    const counter = from + delta * easing(progress);
    this.setState({
      counter,
    });
  }

  clear() {
    cancelAnimationFrame(this.raf);
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
