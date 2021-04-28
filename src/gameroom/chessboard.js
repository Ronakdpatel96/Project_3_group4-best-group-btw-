import React, { useState,  useRef, useEffect } from "react";
import Chess  from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import './chessboard.css';

export default function BlindChess({user_data, socket, user_name}) {
  const [username, setUsername] = useState("");
  const [gameFen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [history, setHistory] = useState([]);
  
  const inputRef = useRef(null);

  function onClickButton() {
    if (inputRef != null && inputRef.current.value != "") {
      const userName = inputRef.current.value;
      setUsername(prev => userName);
    }
  }
  
  
  useEffect(() => {
    socket.on("move", (data) => {
      
      setFen(data.FEN);
      setHistory(data.history);
    });
  }, []);
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
    
    
    const spectator = user_data.Spectator;
    
    if (spectator.includes(user_name)) {
      return;
    }
    
    console.log(sourceSquare, targetSquare);
    const game = new Chess(gameFen);
    // see if the move is legal
    
    
    const turn = game.fen() === "start" || game.fen().search(/w/) !== -1 ? "White": "Black";
    
    if (user_name === user_data.White && turn != "White") {
      return;
    }
    if (user_name === user_data.Black && turn != "Black") {
      return;
    }
    
    let move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });
    
    
    // illegal move
    if (move === null) {
      alert("You lose due to illegal move", sourceSquare, targetSquare);
      console.log("illegal move");
      return;
    };
    
    
    
    //console.log(game.pgn().replace("[SetUp \"1\"]" , "").replace(/\s*\[.*?\]\s*/g, ''));
    let move_string = game.pgn().replace("[SetUp \"1\"]" , "").replace(/\s*\[.*?\]\s*/g, '');
    
    if (move_string.includes("...")) {
      //console.log(move_string.split("...")[1]);
     move_string= move_string.split("...")[1];
    }
    else {
      //console.log(move_string);
      move_string = move_string.split('. ')[1];
    }
    
    const newFen = game.fen();
    const newHistory = history.concat(move_string);
        
    const data = { FEN: newFen, history: newHistory};
    
    socket.emit('move', data);
    
    
    //console.log("New History", newHistory);
    setFen((prev) => newFen);
    setHistory(prev => newHistory);
  };


  function chessInfo() {
    const game = new Chess(gameFen);
    //console.log(game);
    // console.log(user_data);
    //console.log("history", history);
    let temp_history = history;
    
    let list_moves = Array(0);
    for (var i =0; i< temp_history.length; i+=2) {
      list_moves.push([temp_history[i], temp_history[i+1]]);
    }
    
    
    //console.log("list_moves", list_moves);
    console.log(game.in_checkmate());
    let GameInfo = "";
    const turn = game.fen() === "start" || game.fen().search(/w/) !== -1 ? "White": "Black";
    
    if (game.in_checkmate()) {
      if (turn == "Black") {
        GameInfo="White won by checkmate";
      }
      else {
        GameInfo="Black won by checkmate";
      }
    }
    else if (game.in_draw() || game.in_stalemate() || game.in_threefold_repetition()) {
      GameInfo="Draw by stalemate";
    }
    else if (game.insufficient_material()) {
      GameInfo="Draw by insufficient material";
    }
    else {
      GameInfo=turn + " to Play";
    }
    
    let Role="";
    
    if (user_name === user_data.White ) {
      Role = "White";
    }
    else if (user_name === user_data.Black ) {
      Role = "Black";
    }
    else {
      Role = "Spectator";
    }
    
    
    
    
    return (<div className="chessInfo">
      <h1> {GameInfo} </h1>
      <h1> You are playing as {Role}</h1>
      <ol> {list_moves.map((move) => <li>{move}</li>)} </ol>
      
      </div>
    )
  }
  
  function resign() {
    if (Chess(gameFen).game_over()) {
      return;
    }
    
    
    if (user_name == user_data.White) {
      setFen("rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3");
      const data = { FEN: "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3" , history: []};
      socket.emit('move', data);
    }
    else if (user_name == user_data.Black) {
      setFen("rnbqkbnr/ppppp2p/8/5ppQ/4P3/P7/1PPP1PPP/RNB1KBNR b KQkq - 1 3");
      const data = { FEN: "rnbqkbnr/ppppp2p/8/5ppQ/4P3/P7/1PPP1PPP/RNB1KBNR b KQkq - 1 3" , history: []};
     socket.emit('move', data);
    }
    else {
      return;
    }
  }
  
  function replay() {
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    setHistory([]); 
    const data = { FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" , history: []};
    socket.emit('move', data);
  }
  
  return (<div className="ChessBoard">
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
      orientation={user_name === user_data.Black ? "Black" : "White"}
    />
    
    {chessInfo()}
    <button onClick={() => resign()}>Resign </button>
    {Chess(gameFen).in_checkmate() ? <button onClick={() => replay()}>Play Again</button> : ""}
    
    <br/>

    </div>
  );
}