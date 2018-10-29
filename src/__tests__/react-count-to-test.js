jest.unmock('../react-count-to');
jest.useFakeTimers();

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import CountTo from '../react-count-to';

describe('CountTo', () => {
  let countTo;

  beforeEach(() => {
    global.Date.now = jest.fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('with `to` and `speed` props', () => {
    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
    });
  });

  describe('with `from` prop', () => {
    it('starts from 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('1');
    });
  });

  describe('with `onComplete` prop', () => {
    it('calls onComplete', () => {
      const onComplete = jest.fn();
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} onComplete={onComplete} />
      );
      jest.runOnlyPendingTimers();
      expect(onComplete).toBeCalled();
    });
  });

  describe('with negative values', () => {
    it('starts from -1, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('-1');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
    });

    it('starts from 1, ends to -1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={-1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('1');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('-1');
    });

    it('starts from -1, ends to -2', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={-2} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('-1');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('-2');
    });
  });

  describe('with decimal values', () => {
    it('starts from -0.5, ends to 0.5', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-0.5} to={0.5} speed={1} digits={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('-0.5');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('0.5');
    });
  });

  describe('when receive new props', () => {
    class Parent extends Component {
      constructor() {
        super();
        this.state = {
          from: 0,
          to: 1,
        };
      }
      render() {
        return <CountTo speed={1} {...this.state} />;
      }
    }

    it('starts from 0, restarts from 0', () => {
      const parent = TestUtils.renderIntoDocument(
        <Parent />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(parent, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
      parent.setState({
        to: 2,
      });
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('2');
    });

    it('starts from 0, restarts from 2', () => {
      const parent = TestUtils.renderIntoDocument(
        <Parent />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(parent, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
      parent.setState({
        from: 2,
        to: 3,
      });
      expect(findDOMNode(span).textContent).toEqual('2');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('3');
    });
  });

  describe('with `tagName` prop', () => {
    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} tagName={'div'} />
      );
      const div = TestUtils.findRenderedDOMComponentWithTag(countTo, 'div');
      expect(findDOMNode(div).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(div).textContent).toEqual('1');
    });
  });

  describe('with child function', () => {
    it('starts from 0, ends to 1', () => {
      const fn = jest.fn().mockImplementation(value => <span>{value}</span>);
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1}>{fn}</CountTo>
      );
      jest.runOnlyPendingTimers();
      expect(fn.mock.calls.length).toBe(2);
      expect(fn).lastCalledWith('1');
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('1');
    });
  });

  describe('easing prop', () => {
    beforeEach(() => {
      global.Date.now = jest.fn()
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(200)
        .mockReturnValueOnce(300);
    });

    it('does not modify behaviour by default', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={10} speed={200} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('5');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('10');
    });

    it('applies easing to the value', () => {
      const easing = jest.fn()
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.8)
        .mockReturnValueOnce(1);
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={10} speed={300} easing={easing} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('2');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('8');
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('10');
    });
  });

  describe('with `delay` prop', () => {
    beforeEach(() => {
      global.Date.now = jest.fn().mockReturnValueOnce(0);
    });

    it('does not update state before given delay', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={0} to={10} delay={5} speed={10} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      global.Date.now.mockReturnValueOnce(4);
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('0');
      global.Date.now.mockReturnValueOnce(5);
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('5');
      global.Date.now.mockReturnValueOnce(6);
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('5');
    });

    it('finishes after `speed` ms despite `delay` prop', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={0} to={10} delay={6} speed={10} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      global.Date.now.mockReturnValueOnce(6);
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('6');
      global.Date.now.mockReturnValueOnce(10);
      jest.runOnlyPendingTimers();
      expect(findDOMNode(span).textContent).toEqual('10');
    });
  });
});
