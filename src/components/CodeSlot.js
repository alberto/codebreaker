import React, { PropTypes, } from 'react'
import CodeHole from './CodeHole';
import CodePeg from './CodePeg';

class CodeSlot extends React.Component {
  render () {
    const codeHoles = this.props.codePegs.map((peg, index) => {
      const codePeg = peg && <CodePeg key={peg.value} value={peg.value} />;

      return (
        <CodeHole
          key={index}
          active={this.props.activeHole === index}
        >
          {codePeg}
        </CodeHole>
      );
    });

    return (
      <div className="code-slot">
        {codeHoles}
      </div>
    );
  }
}

CodeSlot.propTypes = {
  codePegs: PropTypes.array.isRequired,
  activeHole: PropTypes.number,
}

export default CodeSlot;
