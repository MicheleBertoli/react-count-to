jest.dontMock('../react-count-to');

describe('CountTo', () => {

  let React = require('react/addons');
  let TestUtils = React.addons.TestUtils;
  let CountTo = require('../react-count-to');

  let countTo;

  describe('with `to` and `speed` props', () => {

    beforeEach(() => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} />
      );
    });

    it('starts from 0', () => {
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('0');
    });

    it('ends to 1', () => {
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });

  });

  describe('with `from` prop', () => {

    beforeEach(() => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={1} speed={1} />
      );
    });

    it('starts from 1', () => {
      var span = TestUtils.findRenderedDOMComponentWithTag(
        countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
    });

  });

  describe('with `delay` prop', () => {

    beforeEach(() => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} delay={1} />
      );
    });

    it('sets increment to 1', () => {
      expect(countTo.increment).toEqual(1);
    });

  });

  describe('with `onComplete` prop', () => {

    let onComplete = jest.genMockFunction();

    beforeEach(() => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} onComplete={onComplete} />
      );
    });

    it('calls onComplete', () => {
      jest.runAllTimers();
      expect(onComplete).toBeCalled();
    });

  });

});
