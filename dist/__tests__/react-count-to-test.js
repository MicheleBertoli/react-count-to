'use strict';

jest.dontMock('../react-count-to');

describe('CountTo', function () {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var CountTo = require('../react-count-to');

  var countTo = undefined;

  describe('with `to` and `speed` props', function () {

    it('starts from 0, ends to 1', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('0');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });
  });

  describe('with `from` prop', function () {

    it('starts from 1', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: 1, to: 1, speed: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
    });
  });

  describe('with `delay` prop', function () {

    it('sets increment to 1', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1, delay: 1 }));
      expect(countTo.increment).toEqual(1);
    });
  });

  describe('with `onComplete` prop', function () {

    it('calls onComplete', function () {
      var onComplete = jest.genMockFunction();
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1, onComplete: onComplete }));
      jest.runAllTimers();
      expect(onComplete).toBeCalled();
    });
  });

  describe('with negative values', function () {

    it('starts from -1, ends to 1', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: -1, to: 1, speed: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });

    it('starts from 1, ends to -1', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: 1, to: -1, speed: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-1');
    });

    it('starts sfrom -1, ends to -2', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: -1, to: -2, speed: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-2');
    });
  });

  describe('with decimal values', function () {

    it('starts from -0.5, ends to 0.5', function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: -0.5, to: 0.5, speed: 1, digits: 1 }));
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-0.5');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('0.5');
    });
  });

  describe('when receive new props', function () {

    it('starts from 0, ends to 1', function () {
      var Parent = React.createClass({
        displayName: 'Parent',

        getInitialState: function getInitialState() {
          return {
            to: 1
          };
        },
        render: function render() {
          return React.createElement(CountTo, { to: this.state.to, speed: 1 });
        }
      });
      var parent = TestUtils.renderIntoDocument(React.createElement(Parent, null));
      var span = TestUtils.findRenderedDOMComponentWithTag(parent, 'span');
      expect(span.getDOMNode().textContent).toEqual('0');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
      parent.setState({
        to: 2
      });
      expect(span.getDOMNode().textContent).toEqual('0');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('2');
    });
  });
});