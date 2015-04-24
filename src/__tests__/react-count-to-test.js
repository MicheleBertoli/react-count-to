jest.dontMock('../react-count-to');

describe('CountTo', () => {

  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let CountTo = require('../react-count-to');

  let countTo;

  describe('with `to` and `speed` props', () => {

    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} />
      );
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('0');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });

  });

  describe('with `from` prop', () => {

    it('starts from 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={1} speed={1} />
      );
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
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
      let onComplete = jest.genMockFunction();
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} onComplete={onComplete} />
      );
      jest.runAllTimers();
      expect(onComplete).toBeCalled();
    });

  });

  describe('with negative values', () => {

    it('start from -1, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={1} speed={1} />
      );
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });

    it('start from 1, ends to -1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={-1} speed={1} />
      );
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-1');
    });

    it('start from -1, ends to -2', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={-2} speed={1} />
      );
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-2');
    });

  });

});
