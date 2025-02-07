import React, { useEffect } from "react";
import IconX from "../assets/new-x-icon.svg";
import IconO from "../assets/new-o-icon.svg";
import "../styles/styles.scss";

const PLAYER_X = "X";
const PLAYER_O = "O";
const WINNING_COMBINATIONS = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonals
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [tiles, setTiles] = React.useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = React.useState(PLAYER_X);
  const [winningCombination, setWinningCombination] = React.useState<
    number[] | null
  >(null);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [draw, setDraw] = React.useState<boolean>(false);
  const [matchHistory, setMatchHistory] = React.useState<string[]>([]);

  //handle click
  const handleClick = (index: number) => {
    if (tiles[index] !== null || winningCombination || draw) return;
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  //reset game
  const resetGame = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setWinningCombination(null);
    setWinner(null);
    setDraw(false);
  };

  //check winner
  const checkWinner = (tiles: any) => {
    for (const comb of WINNING_COMBINATIONS) {
      const [a, b, c] = comb;
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        setWinningCombination(comb);
        setWinner(tiles[a]);
        setMatchHistory((prevHistory) => {
          const newHistory = [tiles[a], ...prevHistory];
          return newHistory;
        });
        return;
      }
    }
    if (tiles.every((tile: any) => tile !== null)) {
      setDraw(true);
      setMatchHistory((prevHistory) => {
        const newHistory = ["Draw", ...prevHistory];
        return newHistory;
      });
    }
  };

  useEffect(() => {
    checkWinner(tiles);
  }, [tiles]);

  //component
  const Tile = ({
    value,
    onClick,
    isWinningTile,
  }: {
    value: string | null;
    onClick: () => void;
    isWinningTile: boolean;
  }) => {
    return (
      <div
        className={`tile ${isWinningTile ? "winner-tile" : ""}`}
        onClick={onClick}
      >
        {value && (
          <img
            className="icon"
            src={value === "X" ? IconX : IconO}
            alt={value}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="header">Welcome to the game of Tic Tac Toe</div>
      <div className="main">
        <div className="rule">
          <h2>Rules</h2>
          <ul>
            <li>The game is played on a 3x3 grid.</li>
            <li>Player X goes first.</li>
            <li>
              Players take turns placing their mark (X or O) in an empty square.
            </li>
            <li>
              The first player to get 3 of their marks in a row (vertically,
              horizontally, or diagonally) wins.
            </li>
            <li>
              If all 9 squares are filled and no player has 3 marks in a row,
              the game is a draw.
            </li>
          </ul>
        </div>
        <div className="board">
          {tiles.map((value, index) => (
            <Tile
              key={index}
              value={value}
              onClick={() => handleClick(index)}
              isWinningTile={winningCombination?.includes(index) || false}
            />
          ))}
        </div>
        <div className="result">
          <div className="turn">{playerTurn === PLAYER_X ? "X" : "O"} turn</div>
          {winner && <div className="winner">{winner} win</div>}
          {draw && <div className="winner">It's a draw!</div>}
          <div className="history">
            <h3>Match History</h3>
            <ul className="history-list">
              {matchHistory.map((result, index) => (
                <li key={index}>
                  {result === "Draw" ? "Draw" : result + " win"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="reset" onClick={() => resetGame()}>
          Reset
        </button>
      </div>
    </>
  );
};

export default TicTacToe;
