import React, {Component} from 'react';
import './App.css';
import spinner from './spinner.gif'
import errorImg from './error-broken.png'

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
    this.setState(state => {
      state.error = null
      state.isLoaded = false
    });
    this.forceUpdate()
    this.loadNewBoard()
  }

  loadNewBoard() {
    let error = {
      message: "Oops! I am good on Sudoku, but I am not that good as a developer :p"
    };
    fetch(BACKEND)
      .then(res => {
        if (!res.ok) {
          if (res.status === 502) {
            error.message = "Come on... it's not that hard setting the backend up, did you read the readme file?"
          }
          throw new Error(`[http ${res.status} code]: ${res.statusText}`);
        }
        return res.json()
      }).then(
      (result) => {
        this.setState({
          isLoaded: true,
          numbers: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (e) => {
        error.details = e.message;
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
    let html = "";
    let reloadButton = <button type="button" id="reload-button" className="btn btn-warning"
                               onClick={this.refreshBoard}>Reload</button>
    if (error) {
      html = <div className="card mx-auto" id="error">
        <img className="card-img-top" src={errorImg} alt="Error image"/>
        <div className="card-body">
          <h5 className="card-title">Error</h5>
          <p className="card-text">{error.message}</p>
          <code>{error.details}</code>
          <p>{reloadButton}</p>
        </div>
      </div>

    } else if (!isLoaded) {
      html = <div id="loader"><img src={spinner}/><h1>Loading...</h1></div>;
    } else {
      html = <di>{RenderBoard(numbers)}
        {reloadButton}
      </di>

    }
    return <div className="text-center">{html}</div>;
  }

}

function RenderBoard(numbers) {
  let rows = [];
  for (let i = 0; i < 9; i++) {
    // let rowID = `row${i}`;
    let cell = [];
    const indexPot = 9 * i;
    for (let idx = 0; idx < 9; idx++) {
      let cellID = `cell${i}-${idx}`;
      cell.push(<td key={cellID} id={cellID}>
        <div class="sudoku-number">{numbers[idx + indexPot]}</div>
      </td>)
    }
    rows.push(<tr class="sudoku-box" key={i}>{cell}</tr>)
  }
  return <table class="table table-bordered" id="sudoku-board">
    <tbody>
    {rows}
    </tbody>
  </table>

}

export default App;
