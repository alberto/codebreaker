import React, { PropTypes, } from 'react'

class KeyPeg extends React.Component {
  render () {
    const className = this.props.match ?
      "key-peg key-peg--match" : (this.props.partialMatch ?
        "key-peg key-peg--partial-match" : "key-peg");
    return (
      <div className={className}>
      </div>
    );
  }
}

KeyPeg.propTypes = {
  match: PropTypes.bool,
  partialMatch: PropTypes.bool,
}

export default KeyPeg;
