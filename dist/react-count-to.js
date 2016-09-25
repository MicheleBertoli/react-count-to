'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

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
    className: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      counter: this.props.from || 0
    };
  },
  componentDidMount: function componentDidMount() {
    this.start(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextState) {
    if (!(0, _shallowequal2.default)(this.props, nextProps)) {
      this.start(nextProps);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clear();
  },
  start: function start(props) {
    var _this = this;

    this.clear();
    this.setState(this.getInitialState(), function () {
      var delay = _this.props.delay || 100;
      _this.loopsCounter = 0;
      _this.loops = Math.ceil(props.speed / delay);
      _this.increment = (props.to - _this.state.counter) / _this.loops;
      _this.interval = setInterval(_this.next.bind(_this, props), delay);
    });
  },
  next: function next(props) {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      this.setState({
        counter: this.state.counter + this.increment
      });
    } else {
      this.clear();
      if (props.onComplete) {
        props.onComplete();
      }
    }
  },
  clear: function clear() {
    clearInterval(this.interval);
  },
  render: function render() {
    return _react2.default.createElement(
      'span',
      { className: this.props.className },
      this.state.counter.toFixed(this.props.digits)
    );
  }
});

exports.default = CountTo;