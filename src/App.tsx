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

const isWinner = (board: number[][]): boolean => {
    
    const oWinnerNum = oWinner(board.length)
    let vertical = []
    for(let i = 0; i < board.length; ++i){
       let arr = []
        for(let j = 0; j < board[i].length; ++j){
            arr.push(board[i][j])
            vertical.push(board[j][i])
        } 
        const isVertical = vertical.reduce((a,b)=> a * b,1)
        const isHorizontal = arr.reduce((a, b) => a * b, 1);
        if (isHorizontal === 1 || isHorizontal === oWinnerNum || isVertical === 1 || isVertical === oWinnerNum) {
            return true;
        }
    }
    return false
}
   

const createBlocks = (n: number): number[][] => {
  return new Array(n).fill(undefined).map(() => new Array(n).fill(0))
};

function App() {
  const [board, setBoard] = useState(createBlocks(3));
  const [turn, setTurn] = useState(true)
  
  const handleClick = (row: number, col: number) => {
    board[row][col] = turn ? 1 : 2;
    setBoard(() => [...board]);
    if(isWinner(board)){
        console.log("hi")
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
