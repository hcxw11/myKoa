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
    this.setState(state => ({ count: state.count + 1 }));
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div>
          the count is:
          {count}
        </div>
        <button onClick={this.increment}>add</button>
      </div>
    );
  }
}

module.exports = App;
