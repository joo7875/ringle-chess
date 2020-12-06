import React, { Component } from 'react';
import './App.css';

const size = 70;

class App extends Component {

  state = {
    boardInput: 0,
    pawnInput: 0
  }


  onInputChange = (type, e) => {
    if (type === 'board') {
      this.setState({ boardInput: e.target.value});
    }
    else if (type === 'pawn') {
      this.setState({ pawnInput: e.target.value});
    }
  }

  onAddPawn = (board, pawn) => {

    var pawnDiv = document.getElementById('pawnDiv');

    // remove all child before drawing new pawns
    while (pawnDiv.hasChildNodes()) {
      pawnDiv.removeChild(pawnDiv.lastChild);
    }

    var pawnDesc = document.createElement('span');
    pawnDesc.setAttribute('class', 'title');
    pawnDesc.innerText = 'Location (x, y)';
    pawnDesc.setAttribute('style', 'margin-right: 10px');

    pawnDiv.appendChild(pawnDesc);
    
    for (var i = 0; i < pawn; i++) {
      var spanOpen = document.createElement('span');
      spanOpen.innerText = '[';

      var comma = document.createElement('span');
      comma.innerText = ', ';

      var spanClose = document.createElement('span');
      spanClose.innerText = '] ';

      var pawnInput1 = document.createElement('input');
      pawnInput1.setAttribute('type', 'number');
      pawnInput1.setAttribute('class', 'pawnInput');
      pawnInput1.setAttribute('id', 'pawnInput-' + i + '-0');

      var pawnInput2 = document.createElement('input');
      pawnInput2.setAttribute('type', 'number');
      pawnInput2.setAttribute('class', 'pawnInput');
      pawnInput2.setAttribute('id', 'pawnInput-' + i + '-1');

      pawnDiv.appendChild(spanOpen);
      pawnDiv.appendChild(pawnInput1);
      pawnDiv.appendChild(comma);
      pawnDiv.appendChild(pawnInput2);
      pawnDiv.appendChild(spanClose);
    }

    var pawnBtn = document.createElement('button');
    pawnBtn.setAttribute('class', 'ui button pawnBtn');
    pawnBtn.innerText = 'Make board';

    pawnDiv.appendChild(pawnBtn);
  }


  onDrawBoard = (board) => {
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
          <button className="ui button" onClick={() => this.onAddPawn(boardInput, pawnInput)}>Enter</button>
        </div>

        <div id='pawnDiv'></div>

        <canvas id="board" />
      </div>
    );
  }


}

export default App;

