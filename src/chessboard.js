import React, { Component, useState, useEffect } from "react";
import Chess  from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import './chessboard.css';

export default function BlindChess({user_data, socket}) {
  const [gameFen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [history, setHistory] = useState([]);
  
  // Image options
  const factor = 0.75;
  var WhiteImage = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/48/face-with-tears-of-joy_1f602.png";
  var BlackImage = "http://cdn.shopify.com/s/files/1/1061/1924/products/Loudly_Crying_Face_Emoji_grande.png?v=1571606037";
  const optionWhite = ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: isDragging ? squareWidth * factor : squareWidth,
              height: isDragging ? squareWidth * factor : squareWidth
            }}
            src={WhiteImage}
            alt={"whitepieces"}
          />
        )
        
  const optionBlack =  ({ squareWidth, isDragging }) => (
          <img
            style={{
              width: isDragging ? squareWidth * factor : squareWidth,
              height: isDragging ? squareWidth * factor : squareWidth
            }}
            src={BlackImage}
            alt={"blackpieces"}
          />
        )

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (sourceSquare === targetSquare) {
      return;
    }
    
    console.log(sourceSquare, targetSquare);
    const game = new Chess(gameFen);
    // see if the move is legal
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) {
      //alert("You lose due to illegal move");
      console.log("illegal move");
      return;
    };
    
    const newFen = game.fen();
    
    //console.log(game.pgn().replace("[SetUp \"1\"]" , "").replace(/\s*\[.*?\]\s*/g, ''));
    let move_string = game.pgn().replace("[SetUp \"1\"]" , "").replace(/\s*\[.*?\]\s*/g, '');
    
    if (move_string.includes("...")) {
      //console.log(move_string.split("...")[1]);
     move_string= move_string.split("...")[1] + " ";
    }
    else {
      //console.log(move_string);
    }
    
    const newHistory = history.concat(move_string)
    setFen((prev) => newFen);
    setHistory(prev => newHistory);
  };


  function chessInfo() {
    const game = new Chess(gameFen);
    //console.log(game);
    console.log(user_data);
    
    return (<div className="chessInfo">
      <h1> Turn: {game.fen() === "start" || game.fen().search(/w/) !== -1 ? "White": "Black"} </h1>
      <h2> {history} </h2>
      
      </div>
    )
  }
  

  return (<div>
    <Chessboard
      id="chessBoard"
      width={640}
      position={gameFen}
      onDrop={onDrop}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
      }}
      pieces={{
        wK: optionWhite,
        wQ: optionWhite,
        wN: optionWhite,
        wR: optionWhite,
        wB: optionWhite,
        wP: optionWhite,
        bK: optionBlack,
        bQ: optionBlack,
        bN: optionBlack,
        bR: optionBlack,
        bB: optionBlack,
        bP: optionBlack
      }}
    />
    
    {chessInfo()}
    </div>
  );
}