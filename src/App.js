import React, { Component } from 'react';
import './App.css';

const size = 70;

class App extends Component {

  state = {
    boardInput: null,
    pawnInput: null
  }


  onInputChange = (type, e) => {
    if (type === 'board') {
      this.setState({ boardInput: e.target.value});
    }
    else if (type === 'pawn') {
      this.setState({ pawnInput: e.target.value});
    }
  }


  onDrawBoard = (board, pawn) => {

    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");

    canvas.width  = board * size;
    canvas.height = board * size; 

    for (var i = 0; i < board; i++) {

      ctx.moveTo(0, size * i);
      ctx.lineTo(size * board, size * i);

      ctx.moveTo(size * i, 0);
      ctx.lineTo(size * i, size * board);
    }

    ctx.moveTo(0, size * board);
    ctx.lineTo(size * board, size * board);

    ctx.moveTo(size * board, 0);
    ctx.lineTo(size * board, size * board);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();

  }

  render() {

    var boardInput = this.state.boardInput;
    var pawnInput = this.state.pawnInput;

    return (
      <div>
        <div>
          <span className='title'>Board Size</span>
          <input type='number' className='input marginRight' onChange={this.onInputChange.bind(this, 'board')} />
          <span className='title'>Number of pawn</span>
          <input type='number' className='input marginRight' onChange={this.onInputChange.bind(this, 'pawn')} />
          <button className="ui button" onClick={() => this.onDrawBoard(boardInput, pawnInput)}>Enter</button>
        </div>

        <canvas id="board" />
      </div>
    );
  }


}

export default App;

