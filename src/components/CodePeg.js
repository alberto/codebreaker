import React, { PropTypes, } from 'react'

class CodePeg extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  render () {
    let className = `code-peg code-peg--${this.props.value}`;
    if (this.props.selected) {
      className += " is-selected";
    }
    return (
      <div className={className} onClick={this.onClick}></div>
    );
  }

  onClick() {
    if (!this.props.selected && this.props.onSelected) {
      this.props.onSelected(this.props.value);
    }
  }
}

CodePeg.propTypes = {
  value: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onSelected: PropTypes.func,
}

export default CodePeg;
