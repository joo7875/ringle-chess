import React, { Component } from 'react';
import './App.css';

const size = 70;

class App extends Component {

  state = {
    boardInput: 0,
    pawnInput: 0,
    pawnArrX: [],
    pawnArrY: []
  }


  onInputChange = (type, e) => {
    if (type === 'board') {
      this.setState({ boardInput: e.target.value});
      this.onDrawBoard(e.target.value);
    }
    else if (type === 'pawn') {
      this.setState({ pawnInput: e.target.value, pawnArrX: [], pawnArrY: [] });
      this.onAddPawn(e.target.value);
    }
  }

  onDrawPawn = (pawn) => {

    this.setState({ pawnArrX: [], pawnArrY: [] });
    
    for (var i = 0; i < pawn; i++) {
      var pawnX = document.getElementById('pawnInput-' + i + '-0').value;
      var pawnY = document.getElementById('pawnInput-' + i + '-1').value;

      if (pawnX === '') {
        document.getElementById('pawnInput-' + i + '-0').value = 0;
        pawnX = 0;
      }
      if (pawnY === '') {
        document.getElementById('pawnInput-' + i + '-1').value = 0;
        pawnY = 0;
      }

      var joinedX = this.state.pawnArrX.concat(Number(pawnX));
      var joinedY = this.state.pawnArrY.concat(Number(pawnY));

      this.setState({ pawnArrX: joinedX, pawnArrY: joinedY });
    }

    this.onDrawBoard(this.state.boardInput, this.state.pawnArrX, this.state.pawnArrY);
  }

  onAddPawn = (pawn) => {

    var pawnDiv = document.getElementById('pawnDiv');

    // remove all child before rendering new pawns
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
      pawnInput1.setAttribute('min', 0);
      pawnInput1.setAttribute('max', this.state.boardInput - 1);
      pawnInput1.setAttribute('id', 'pawnInput-' + i + '-0');

      var pawnInput2 = document.createElement('input');
      pawnInput2.setAttribute('type', 'number');
      pawnInput2.setAttribute('class', 'pawnInput');
      pawnInput1.setAttribute('min', 0);
      pawnInput1.setAttribute('max', this.state.boardInput - 1);
      pawnInput2.setAttribute('id', 'pawnInput-' + i + '-1');

      pawnDiv.appendChild(spanOpen);
      pawnDiv.appendChild(pawnInput1);
      pawnDiv.appendChild(comma);
      pawnDiv.appendChild(pawnInput2);
      pawnDiv.appendChild(spanClose);
    }

    var pawnBtn = document.createElement('button');
    pawnBtn.setAttribute('class', 'ui button pawnBtn');
    pawnBtn.innerText = 'Add pawn';
    pawnBtn.onclick = () => this.onDrawPawn(pawn);
    // pawnBtn.onclick = () => this.onDrawBoard(this.state.boardInput);

    pawnDiv.appendChild(pawnBtn);
  }

  onDrawBoard = (board, arrX, arrY) => {

    var canvas = document.getElementById("board");
    var ctx = canvas.getContext("2d");

    canvas.width  = board * size;
    canvas.height = board * size; 

    // board
    for (var i = 0; i < board; i++) {

      ctx.moveTo(0, size * i);
      ctx.lineTo(size * board, size * i);

      ctx.moveTo(size * i, 0);
      ctx.lineTo(size * i, size * board);

      // location
      for (var j = 0; j <= board; j++) {

        ctx.font = "10px Noto Sans KR, sans-serif";
        ctx.fillText('(' + (j-1) + ', ' + i + ')', size * i + 25, size * j - 30);

        // if (j === 0 && i === 0) ctx.fillRect(size * i, size * j, size, size);
        // if (j === 1 && i === 2) ctx.fillRect(size * i, size * j, size, size);
        // if (j === 2 && i === 3) ctx.fillRect(size * i, size * j, size, size);
      }
    }

    // pawn
    if (arrX !== undefined && arrY !== undefined) {
      
      document.getElementById('visualize').style.display = 'inline-block';
      for (var n = 0; n < this.state.pawnInput; n++) {

          if (arrX.length > 0 && arrY.length > 0) {
            ctx.fillRect(size * arrY[n], size * arrX[n], size, size);
          }
        
      }
    }

    ctx.moveTo(0, size * board);
    ctx.lineTo(size * board, size * board);

    ctx.moveTo(size * board, 0);
    ctx.lineTo(size * board, size * board);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  onVisualClick = (arrX, arrY) => {

    var total = [];
    var start = [];
    var end = [];

    start.push(arrX[0], arrY[0]); // 노드 2개라고 가정
    end.push(arrX[1], arrY[1]);

    for (var i = 0; i < arrX.length - 1; i++) {

      if (arrX[i] < arrX[i+1] && arrY[i] < arrY[i+1]) { 
        for (var n = arrX[i]; n <= arrX[i+1]; n++) {
          for (var m = arrY[i]; m <= arrY[i+1]; m++) {
            total.push([n, m]);
          }
        }
      }
      else if (arrX[i] < arrX[i+1] && arrY[i] > arrY[i+1]) { 
        for (var n = arrX[i]; n <= arrX[i+1]; n++) {
          for (var m = arrY[i+1]; m <= arrY[i]; m++) {
            total.push([n, m]);
          }
        }
      }
      else if (arrX[i] > arrX[i+1] && arrY[i] < arrY[i+1]) { 
        for (var n = arrX[i+1]; n <= arrX[i]; n++) {
          for (var m = arrY[i]; m <= arrY[i+1]; m++) {
            total.push([n, m]);
          }
        }
      }
      else if (arrX[i] > arrX[i+1] && arrY[i] > arrY[i+1]) { 
        for (var n = arrX[i+1]; n <= arrX[i]; n++) {
          for (var m = arrY[i+1]; m <= arrY[i]; m++) {
            total.push([n, m]);
          }
        }
      }

    }

    this.AstarAlgorithm(total, start, end);

  }

  AstarAlgorithm = (total, start, end) => {

    var totalArr = total;
    var current = [];
    var open = [];
    var close = [];

    var minmin = 0;

    var execute;

    for (var i = 0; i < totalArr.length; i++) {
      if (totalArr[i][0] === start[0] && totalArr[i][1] === start[1]) {
        totalArr.splice(i, 1);
      }
    }

    current = start;
    close.push(start);

    // loop start
    while (current !== end) {

      for (var a = -1; a <= 1; a++) {
        for (var b = -1; b <= 1; b++) {

          for (var c = 0; c < totalArr.length; c++) {
            if (totalArr[c][0] === current[0]+a && totalArr[c][1] === current[1]+b) {
              open.push([current[0]+a, current[1]+b]);
              totalArr.splice(c, 1);
            }
          }
          
        }
      }


      for (var f = 0; f < open.length; f++) {
        if (open[f][0] === end[0] && open[f][1] === end[1]) {
          close.push(end);
          current = end;
          execute = false;
        }
        else execute = true;
      }



      if (execute) {
        
        current = [];

          for (var d = 0; d < open.length; d++) { 
            open[d].push(Math.abs(end[0] - open[d][0]) + Math.abs(end[1] - open[d][1]));

            var min = [];
            min.push(open[d][2]);

            minmin = Math.min(...min);
          }

          for (var e = 0; e < open.length; e++) {
            if (minmin === open[e][2]) {
              if (current.length === 0) {
                current.push(open[e][0], open[e][1]);
                open = [];
                close.push(current);
              }
            }
          }

          minmin = 0;
      }

    }
    // loop end

    console.log(totalArr);
    console.log(current);
    console.log(open);
    console.log(close);
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
          {/* <button className="ui button" onClick={() => this.onAddPawn(pawnInput)}>Enter</button> */}
        </div>

        <div id='pawnDiv'></div>

        <canvas id="board" />
        <span><button id='visualize' className="ui button" onClick={() => this.onVisualClick(this.state.pawnArrX, this.state.pawnArrY)}>Find Path</button></span>
      </div>
    );
  }


}


export default App;

