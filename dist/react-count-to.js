'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CountTo = _react2.default.createClass({
  displayName: 'CountTo',


  propTypes: {
    from: _react2.default.PropTypes.number,
    to: _react2.default.PropTypes.number.isRequired,
    speed: _react2.default.PropTypes.number.isRequired,
    delay: _react2.default.PropTypes.number,
    onComplete: _react2.default.PropTypes.func,
    digits: _react2.default.PropTypes.number,
    className: _react2.default.PropTypes.string,
    tagName: _react2.default.PropTypes.string,
    children: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      from: 0,
      delay: 100,
      digits: 0,
      tagName: 'span'
    };
  },
  getInitialState: function getInitialState() {
    var from = this.props.from;


    return {
      counter: from
    };
  },
  componentDidMount: function componentDidMount() {
    this.start();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _props = this.props;
    var from = _props.from;
    var to = _props.to;


    if (nextProps.to !== to || nextProps.from !== from) {
      this.start();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clear();
  },
  start: function start() {
    var _this = this;

    this.clear();
    this.setState(this.getInitialState(), function () {
      var _props2 = _this.props;
      var delay = _props2.delay;
      var speed = _props2.speed;
      var to = _props2.to;
      var counter = _this.state.counter;

      _this.loopsCounter = 0;
      _this.loops = Math.ceil(speed / delay);
      _this.increment = (to - counter) / _this.loops;
      _this.interval = setInterval(_this.next, delay);
    });
  },
  next: function next() {
    var _this2 = this;

    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      this.setState(function (_ref) {
        var counter = _ref.counter;
        return {
          counter: counter + _this2.increment
        };
      });
    } else {
      var onComplete = this.props.onComplete;

      this.clear();

      if (onComplete) {
        onComplete();
      }
    }
  },
  clear: function clear() {
    clearInterval(this.interval);
  },
  render: function render() {
    var _props3 = this.props;
    var className = _props3.className;
    var digits = _props3.digits;
    var Tag = _props3.tagName;
    var fn = _props3.children;
    var counter = this.state.counter;

    var value = counter.toFixed(digits);

    if (fn) {
      return fn(value);
    }

    return _react2.default.createElement(
      Tag,
      { className: className },
      value
    );
  }
});

exports.default = CountTo;