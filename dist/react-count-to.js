'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  from: _propTypes2.default.number,
  to: _propTypes2.default.number.isRequired,
  speed: _propTypes2.default.number.isRequired,
  delay: _propTypes2.default.number,
  onComplete: _propTypes2.default.func,
  digits: _propTypes2.default.number,
  className: _propTypes2.default.string,
  tagName: _propTypes2.default.string,
  children: _propTypes2.default.func,
  easing: _propTypes2.default.func
};

var defaultProps = {
  from: 0,
  delay: 100,
  digits: 0,
  tagName: 'span',
  easing: function easing(t) {
    return t;
  }
};

var CountTo = function (_PureComponent) {
  _inherits(CountTo, _PureComponent);

  function CountTo(props) {
    _classCallCheck(this, CountTo);

    var _this = _possibleConstructorReturn(this, (CountTo.__proto__ || Object.getPrototypeOf(CountTo)).call(this, props));

    var from = props.from;


    _this.state = {
      counter: from
    };

    _this.start = _this.start.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.updateCounter = _this.updateCounter.bind(_this);
    return _this;
  }

  _createClass(CountTo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.start();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          from = _props.from,
          to = _props.to;


      if (nextProps.to !== to || nextProps.from !== from) {
        this.start(nextProps);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clear();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      this.clear();
      var from = props.from;

      this.setState({
        counter: from
      }, function () {
        var _props2 = _this2.props,
            speed = _props2.speed,
            delay = _props2.delay;

        var now = Date.now();
        _this2.endDate = now + speed;
        _this2.scheduleNextUpdate(now, delay);
        _this2.raf = requestAnimationFrame(_this2.next);
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var now = Date.now();
      var _props3 = this.props,
          speed = _props3.speed,
          onComplete = _props3.onComplete,
          delay = _props3.delay;


      if (now >= this.nextUpdate) {
        var progress = Math.max(0, Math.min(1, 1 - (this.endDate - now) / speed));
        this.updateCounter(progress);
        this.scheduleNextUpdate(now, delay);
      }

      if (now < this.endDate) {
        this.raf = requestAnimationFrame(this.next);
      } else if (onComplete) {
        onComplete();
      }
    }
  }, {
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(now, delay) {
      this.nextUpdate = Math.min(now + delay, this.endDate);
    }
  }, {
    key: 'updateCounter',
    value: function updateCounter(progress) {
      var _props4 = this.props,
          from = _props4.from,
          to = _props4.to,
          easing = _props4.easing;

      var delta = to - from;
      var counter = from + delta * easing(progress);
      this.setState({
        counter: counter
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      cancelAnimationFrame(this.raf);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          className = _props5.className,
          digits = _props5.digits,
          Tag = _props5.tagName,
          fn = _props5.children;
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
  }]);

  return CountTo;
}(_react.PureComponent);

CountTo.propTypes = propTypes;
CountTo.defaultProps = defaultProps;

exports.default = CountTo;