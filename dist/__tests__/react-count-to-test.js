'use strict';

jest.dontMock('../react-count-to');

describe('CountTo', function () {

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var CountTo = require('../react-count-to');

  var countTo = undefined;

  describe('with `to` and `speed` props', function () {

    beforeEach(function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1 }));
    });

    it('starts from 0', function () {
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('0');
    });

    it('ends to 1', function () {
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });
  });

  describe('with `from` prop', function () {

    beforeEach(function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { from: 1, to: 1, speed: 1 }));
    });

    it('starts from 1', function () {
      var span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
    });
  });

  describe('with `delay` prop', function () {

    beforeEach(function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1, delay: 1 }));
    });

    it('sets increment to 1', function () {
      expect(countTo.increment).toEqual(1);
    });
  });

  describe('with `onComplete` prop', function () {

    var onComplete = jest.genMockFunction();

    beforeEach(function () {
      countTo = TestUtils.renderIntoDocument(React.createElement(CountTo, { to: 1, speed: 1, onComplete: onComplete }));
    });

    it('calls onComplete', function () {
      jest.runAllTimers();
      expect(onComplete).toBeCalled();
    });
  });
});