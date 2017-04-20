import React, { PropTypes, } from 'react'

class CodeHole extends React.Component {
  render () {
    var className = this.props.active ?
      "code-hole is-active" : "code-hole";
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

CodeHole.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.element,
}

export default CodeHole;
