import React, { PropTypes, } from 'react'
import CodeSlot from './CodeSlot';
import KeySlot from './KeySlot';

class Row extends React.Component {
  render () {
    const boardClass = this.props.active ?
      "board-row is-active" : "board-row";
    const activeHole = this.props.active ? this.props.activeHole : undefined;

    return (
      <div className={boardClass}>
        <CodeSlot
          active={this.props.active}
          activeHole={activeHole}
          codePegs={this.props.codePegs}
          />
        <KeySlot
          keyPegs={this.props.keyPegs}
          />
      </div>
    );
  }
}

Row.propTypes = {
  active: PropTypes.bool.isRequired,
  activeHole: PropTypes.number.isRequired,
  codePegs: PropTypes.array.isRequired,
  keyPegs: PropTypes.array.isRequired,
}

export default Row;
