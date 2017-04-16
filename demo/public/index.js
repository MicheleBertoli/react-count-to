import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import CountTo from '../../dist/react-count-to';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      to: 0,
    };

    this.onComplete = this.onComplete.bind(this);
    this.callback = this.callback.bind(this);
    this.renderCountTo = this.renderCountTo.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  componentDidMount() {
    request
      .get('https://api.github.com/repos/facebook/react')
      .end(this.callback);
  }

  onComplete() {
    console.log('completed!');
  }

  callback(err, res) {
    this.setState({
      isLoading: false,
      to: res.body.stargazers_count,
    });
  }

  renderLoading() {
    return (
      <span>Loading...</span>
    );
  }

  renderCountTo() {
    return (
      <CountTo to={this.state.to} speed={1000} onComplete={this.onComplete} />
    );
  }

  render() {
    return (
      <div>
        <h1>How many stars does React.js have?</h1>
        {this.state.isLoading ? this.renderLoading() : this.renderCountTo()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('count-to'));
