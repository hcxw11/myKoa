const React = require('react');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <div>the count is: {this.state.count}</div>
        <button onClick={this.increment}>add</button>
      </div>
    );
  }
}

module.exports = App;
