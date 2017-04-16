jest.unmock('../react-count-to');

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import CountTo from '../react-count-to';

describe('CountTo', () => {
  let countTo;

  describe('with `to` and `speed` props', () => {
    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runAllTimers();
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

  describe('with `delay` prop', () => {
    it('sets increment to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} delay={1} />
      );
      expect(countTo.increment).toEqual(1);
    });
  });

  describe('with `onComplete` prop', () => {
    it('calls onComplete', () => {
      const onComplete = jest.genMockFunction();
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} onComplete={onComplete} />
      );
      jest.runAllTimers();
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
      jest.runAllTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
    });

    it('starts from 1, ends to -1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={-1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('1');
      jest.runAllTimers();
      expect(findDOMNode(span).textContent).toEqual('-1');
    });

    it('starts sfrom -1, ends to -2', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={-2} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('-1');
      jest.runAllTimers();
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
      jest.runAllTimers();
      expect(findDOMNode(span).textContent).toEqual('0.5');
    });
  });

  describe('when receive new props', () => {
    it('starts from 0, ends to 1', () => {
      class Parent extends Component {
        constructor() {
          super();
          this.state = {
            to: 1,
          };
        }
        render() {
          return <CountTo to={this.state.to} speed={1} />;
        }
      }
      const parent = TestUtils.renderIntoDocument(
        <Parent />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(parent, 'span');
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runAllTimers();
      expect(findDOMNode(span).textContent).toEqual('1');
      parent.setState({
        to: 2,
      });
      expect(findDOMNode(span).textContent).toEqual('0');
      jest.runAllTimers();
      expect(findDOMNode(span).textContent).toEqual('2');
    });
  });

  describe('with `tagName` prop', () => {
    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} tagName={'div'} />
      );
      const div = TestUtils.findRenderedDOMComponentWithTag(countTo, 'div');
      expect(findDOMNode(div).textContent).toEqual('0');
      jest.runAllTimers();
      expect(findDOMNode(div).textContent).toEqual('1');
    });
  });

  describe('with child function', () => {
    it('starts from 0, ends to 1', () => {
      const fn = jest.fn().mockImplementation(value => <span>{value}</span>);
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1}>{fn}</CountTo>
      );
      jest.runAllTimers();
      expect(fn.mock.calls.length).toBe(3);
      expect(fn).lastCalledWith('1');
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(findDOMNode(span).textContent).toEqual('1');
    });
  });
});
