import React from 'react';

class Cell extends React.Component {

  handleClick = () => this.props.onClick(this);

  render() {
    return <td onClick={ this.handleClick }>
      <div className={
        this.props.isActive ? 'active' : ''
      }>{this.props.value}</div>
    </td>
  }
}

export default Cell;