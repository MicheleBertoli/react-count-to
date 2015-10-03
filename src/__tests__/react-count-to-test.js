jest.dontMock('../react-count-to');

describe('CountTo', () => {

  const React = require('react/addons');
  const TestUtils = React.addons.TestUtils;
  const CountTo = require('../react-count-to');

  let countTo;

  describe('with `to` and `speed` props', () => {

    it('starts from 0, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
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
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
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

  describe('with `tofixed` prop', () => {

    it('sets toFixed to fixed digits', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo to={1.234567} speed={1} tofixed={2} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1.23');
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

    it('start from -1, ends to 1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('1');
    });

    it('start from 1, ends to -1', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={1} to={-1} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-1');
    });

    it('start from -1, ends to -2', () => {
      countTo = TestUtils.renderIntoDocument(
        <CountTo from={-1} to={-2} speed={1} />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(countTo, 'span');
      expect(span.getDOMNode().textContent).toEqual('-1');
      jest.runAllTimers();
      expect(span.getDOMNode().textContent).toEqual('-2');
    });

  });

  describe('when receive new props', () => {

    it('starts from 0, ends to 1', () => {
      const Parent = React.createClass({
        getInitialState() {
          return {
            to: 1
          };
        },
        render() {
          return <CountTo to={this.state.to} speed={1} />;
        }
      });
      const parent = TestUtils.renderIntoDocument(
        <Parent />
      );
      const span = TestUtils.findRenderedDOMComponentWithTag(parent, 'span');
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
