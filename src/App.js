import React, {Component} from 'react';
import './App.css';

const BACKEND = `http://localhost/sudoku/board`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      numbers: []
    };
    this.refreshBoard = this.refreshBoard.bind(this);
  }

  refreshBoard(e) {
    e.preventDefault();
    this.loadNewBoard()
  }
  loadNewBoard() {
    fetch(BACKEND)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            numbers: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.loadNewBoard()
  }

  render() {
    const {error, isLoaded, numbers} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>{RenderBoard(numbers)}<button onClick={this.refreshBoard}>Reload</button></div>;
    }
  }

}

function RenderBoard(numbers) {
  let rows = [];
  for (let i = 0; i < 9; i++){
    let rowID = `row${i}`;
    let cell = [];
    const indexPot = 9 * i;
    for (let idx = 0; idx < 9; idx++){
      let cellID = `cell${i}-${idx}`;
      cell.push(<td key={cellID} id={cellID}>{numbers[idx+indexPot]}</td>)
    }
    rows.push(<tr key={i} id={rowID}>{cell}</tr>)
  }
  return <table id="simple-board">
    <tbody>
    {rows}
    </tbody>
  </table>

}

export default App;
