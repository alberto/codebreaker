import React, { PropTypes, } from 'react'
import KeyPeg from './KeyPeg';

class KeySlot extends React.Component {
  render () {
    const keyPegs = this.props.keyPegs.map((keyPeg, index) => {
      return (
        <KeyPeg
          key={index}
          match={keyPeg && keyPeg.match}
          partialMatch={keyPeg && keyPeg.partialMatch}
        />
      );
    });
    return (
      <div className="key-slot">
        {keyPegs}
      </div>
    );
  }
}

KeySlot.propTypes = {
  keyPegs: PropTypes.array.isRequired,
}

export default KeySlot;
