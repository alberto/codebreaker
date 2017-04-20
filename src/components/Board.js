import React, { PropTypes, } from 'react'
import Row from './Row';

class Board extends React.Component {
  render () {
    const activeRow = this.props.activeRow;
    const rows = this.props.rows.map((row, index) => {
      const isActive = activeRow === index;
      return <Row
        key={row.key}
        active={isActive}
        activeHole={this.props.activeHole}
        codePegs={row.codePegs}
        keyPegs={row.keyPegs}
        />
    });

    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

Board.propTypes = {
  activeRow: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  activeHole: PropTypes.number.isRequired,
};

export default Board;
