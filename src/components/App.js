import React from 'react';
import Board from './Board';
import CodePeg from './CodePeg';
import _ from 'lodash';


const KEY_SIZE = 4;
const ROW_COUNT = 6;

const PEGS = [
  { value: 1, selected: false, },
  { value: 2, selected: false, },
  { value: 3, selected: false, },
  { value: 4, selected: false, },
  { value: 5, selected: false, },
  { value: 6, selected: false, },
  { value: 7, selected: false, },
  { value: 8, selected: false, },
];

function buildKey(collection, size) {
  return _.take(collection, size);
  // return _.sampleSize(collection, size);
}

const KEY = buildKey(PEGS, KEY_SIZE);

function buildRows(count, size) {
  return _.range(count).map(key => {
    return {
      key: key,
      codePegs: _.fill(Array(size), null),
      keyPegs: _.fill(Array(size), null),
    }
  })
}

const STATE = {
  key: KEY,
  rows: buildRows(ROW_COUNT, KEY_SIZE),
  pegs: PEGS,
  activeRow: ROW_COUNT - 1,
  activeHole: 0,
  canConfirm: false,
};

class App extends React.Component {
  constructor() {
    super();
    this.pegSelected = this.pegSelected.bind(this);
    this.confirm = this.confirm.bind(this);

    this.state = STATE;
  }

  render() {
    const pegs = this.state.pegs.map((peg) => {
      return (
        <CodePeg
          key={peg.value}
          value={peg.value}
          selected={peg.selected}
          onSelected={this.pegSelected} />
      );
    });

    return (
      <div className="text-center">
        <div>{this.state.message}</div>
        <Board
          rows={this.state.rows}
          activeRow={this.state.activeRow}
          activeHole={this.state.activeHole}
        />
        <div className="code-pegs">
          {pegs}
        </div>
        <button
          className="btn btn-primary"
          disabled={!this.state.canConfirm}
          onClick={this.confirm}>Confirm</button>
      </div>
    );
  }

  confirm() {
    const results = this.computeRowResults();
    if (_.every(results, result => result.match)) {
      this.setState({message: 'You win',});
    } else if (this.state.activeRow === 0) {
      this.setState({
        message: 'You loose',
        canConfirm: false,
        activeHole: -1,
      });
    } else {
      this.setState({
        activeRow: this.state.activeRow - 1,
        activeHole: 0,
        canConfirm: false,
      });
    }
    this.setState({
      pegs: this.state.pegs.map(p => {
        p.selected = false;
        return p;
      }),
    })
  }

  pegSelected(peg) {
    if (this.state.message) return;
    this.selectPeg(peg);
    this.unSelectPreviousPeg();
    this.updateRowsWith(peg);
    this.updateActive();
  }

  selectPeg(peg) {
    const pegs = _.clone(this.state.pegs);
    pegs[peg - 1].selected = true;
    this.setState({pegs,});
  }

  unSelectPreviousPeg() {
    const row = this.state.rows[this.activeRowIndex()];
    const peg = row.codePegs[this.state.activeHole];
    if (peg) {
      const pegs = _.clone(this.state.pegs);
      pegs[peg.value - 1].selected = false;
      this.setState({pegs,});
    }
  }

  activeRowIndex() {
    return this.state.activeRow;
  }

  computeRowResults() {
    const row = this.state.rows[this.activeRowIndex()];
    var pegs = row.codePegs;
    var result = this.getResultFor(pegs);
    row.keyPegs = result;
    this.setState({rows: this.state.rows,});
    return result;
  }

  getResultFor(pegs) {
    const pegsWithPostion = pegs.map((peg, position) => ({position, value: peg.value,}));
    const keysWithPosition = this.state.key.map((key, position) => ({position, value: key.value,}));

    const matches = this.getMatchesFor(pegsWithPostion, keysWithPosition);
    const partialMatches = this.getPartialMatchesFor(pegsWithPostion, keysWithPosition);
    const results = matches.concat(partialMatches);
    const length = results.length;
    results.length = KEY_SIZE;
    return _.fill(results, {}, length);
  }

  getMatchesFor(pegs, keys) {
    return pegs.map(peg => {
      return {
        match: peg.value === keys[peg.position].value,
      };
    }).filter(p => p.match);
  }

  getPartialMatchesFor(pegs, keys) {
    return pegs.map(peg => {
      return {
        partialMatch: peg.value !== keys[peg.position].value &&
        _.some(keys, k => k.value === peg.value),
      }
    }).filter(p => p.partialMatch);
  }

  updateRowsWith(peg) {
    const newRow = this.updateRowWith(peg);
    const rows = _.clone(this.state.rows);
    rows[this.activeRowIndex()] = newRow;
    this.setState({rows,});
  }

  updateRowWith(peg) {
    const row = this.state.rows[this.activeRowIndex()];
    const pegs = _.clone(row.codePegs);
    pegs[this.state.activeHole] = { value: peg, };
    return { key: row.key, codePegs: pegs, keyPegs:row.keyPegs, };
  }

  updateActive() {
    const row = this.state.rows[this.activeRowIndex()];
    let canConfirm = false;
    let activeHole = row.codePegs.findIndex((hole, index) => {
      return !hole && index !== this.state.activeHole;
    });
    if (activeHole < 0) {
      canConfirm = true
      activeHole = (this.state.activeHole + 1) % KEY_SIZE;
    }
    this.setState({activeHole, canConfirm,});
  }
}

export default App;
