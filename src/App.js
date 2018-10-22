import React, {Component} from 'react';
import './App.css';
import spinner from './spinner.gif'
import errorImg from './error-broken.png'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell from './Cell';


Enzyme.configure({ adapter: new Adapter() });
const BACKEND = `http://localhost/sudoku/board`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error !== undefined ? props.error :  null,
      isLoaded: props.isLoaded !== undefined ? props.isLoaded : false,
      numbers: props.numbers !== undefined ? props.numbers : [],
      activeCell: null
    };
    this.refreshBoard = this.refreshBoard.bind(this);
  }

  refreshBoard(e) {
    e.preventDefault();
    this.setState(state => {
      state.error = null;
      state.isLoaded = false
    });
    this.forceUpdate();
    this.loadNewBoard()
  }

  loadNewBoard() {
    let error = {
      message: "Oops! I am good on Sudoku, but I am not that good as a developer :p"
    };

    let url = BACKEND;
    if(this.state.activeCell !== null) {
      url = `${url}?number=${this.state.activeCell.props.value}&line=${this.state.activeCell.props.line}&col=${this.state.activeCell.props.col}`;
    }
    return fetch(url).catch(e => {
      error.message = "The request has failed. Is the backend reachable?";
      throw e
    }).then(res => {
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
  handleClick = (cell) => {
    if(this.state.activeCell === cell) {
      this.setState({ activeCell: null });
    } else {
      this.setState({ activeCell: cell });
    }
  };

  renderBoard() {
    let rows = [];
    for (let i = 0; i < 9; i++) {
      // let rowID = `row${i}`;
      let cell = [];
      const indexPot = 9 * i;
      for (let col = 0; col < 9; col++) {
        let cellID = `cell${i}-${col}`;
        cell.push(
          <Cell value={this.state.numbers[col + indexPot]} key={cellID} line={i} col={col} id={cellID}
                isActive={ this.state.activeCell !== null && this.state.activeCell.props.id === cellID } onClick={ this.handleClick } />
          )
      }
      rows.push(<tr key={i}>{cell}</tr>)
    }
    return <table className="table table-bordered" id="sudoku-board">
      <tbody>
      {rows}
      </tbody>
    </table>
  }

  render() {
    const {error, isLoaded} = this.state;
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

      html = <div>{this.renderBoard()}
        {reloadButton}
      </div>

    }
    return <div className="text-center">{html}</div>;
  }
}


export default App;
