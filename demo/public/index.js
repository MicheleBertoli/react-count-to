import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import CountTo from '../../dist/react-count-to';

const App = React.createClass({

  getInitialState() {
    return {
      isLoading: true,
      to: 0,
    };
  },

  componentDidMount() {
    request
      .get('https://api.github.com/repos/facebook/react')
      .end(this.callback);
  },

  onComplete() {
    console.log('completed!');
  },

  callback(err, res) {
    this.setState({
      isLoading: false,
      to: res.body.stargazers_count,
    });
  },

  renderLoading() {
    return (
      <span>Loading...</span>
    );
  },

  renderCountTo() {
    return (
      <CountTo to={this.state.to} speed={1000} onComplete={this.onComplete} />
    );
  },

  render() {
    return (
      <div>
        <h1>How many stars does React.js have?</h1>
        {this.state.isLoading ? this.renderLoading() : this.renderCountTo()}
      </div>
    );
  },

});

ReactDOM.render(<App />, document.getElementById('count-to'));
