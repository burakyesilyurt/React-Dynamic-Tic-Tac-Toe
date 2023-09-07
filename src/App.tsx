import { useState } from "react";
import "./App.css";

const blockStyle = {
  width: 120,
  height: 120,
  border: "solid white 1px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize:"64px"
};

const oWinner = (lenght: number) => {
    let oWinnerNum = 1 
      for(let i = lenght; i > 0; --i){
        oWinnerNum *=2
      }
    return oWinnerNum
} 

const verticalHorizontalWinner = (board: number[][]): boolean => {
    const oWinnerNum = oWinner(board.length)
    for(let i = 0; i < board.length; ++i){
        let isVertical = 1;
        let isHorizontal = 1;
        for(let j = 0; j < board[i].length; ++j){
            isHorizontal *= board[i][j];
            isVertical *= board[j][i];
        } 
        if (isHorizontal === 1 || isHorizontal === oWinnerNum || isVertical === 1 || isVertical === oWinnerNum) {
            return true;
        }
      
    }
    return false
}

const diagonalWinner = (board: number[][]): boolean => {
    const oWinnerNum = oWinner(board.length)
    let diagSum = 1;
    let reverseDiagSum = 1;
    for(let i = 0, j = board.length - 1; i < board.length; ++i, --j){
        diagSum *= board[i][i]
        reverseDiagSum *= board[i][j]
    }
    if(diagSum === 1 || reverseDiagSum === 1 || diagSum === oWinnerNum || reverseDiagSum === oWinnerNum){
        return true
    }
    return false
}

const isWinner = (board: number[][]): boolean => {
   if(verticalHorizontalWinner(board) || diagonalWinner(board)) return true
   return false
}
   
const createBlocks = (n: number): number[][] => {
  return new Array(n).fill(undefined).map(() => new Array(n).fill(0))
};

function App() {
  const [board, setBoard] = useState(createBlocks(3));
  const [turn, setTurn] = useState(true)
  
  const handleClick = (row: number, col: number) => {
    if(board[row][col] !== 0) return
    board[row][col] = turn ? 1 : 2;
    setBoard(() => [...board]);
    if(isWinner(board)){
        setBoard(createBlocks(3))
        const winner = turn ? "X" : "O";
        console.log(`Winner is ${winner}`)
        setTurn(false)
        
    }
    setTurn((prev) => !prev)
  };

  return (
    <>
      {board.map((row, r) => {
        return (
          <div style={{ display: "flex" }} key={r}>
            {row.map((cell: number, c: number) => {
              return (
                <div
                  key={c}
                  style={blockStyle}
                  onClick={() => handleClick(r, c)}
                >
                  {cell === 1 ? "X" : cell === 2 ? "O" : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
