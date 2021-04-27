import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess  from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import {useState, useEffect} from 'react';
import './Login.js';
import io from 'socket.io-client';

const socket = io();

class ChessGame extends Component {
  
  static propTypes = { children: PropTypes.func };

  state = {
    fen: "start",
    pieceSquare: "",
    square: "",
    history: []
  };

  componentDidMount() {
    this.game = new Chess();
  }


  onDrop = ({ sourceSquare, targetSquare }) => {
    
    if (sourceSquare === targetSquare) {
      return;
    }
    
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      alert("You lose due to illegal move");
      return;
    };
    
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: false })
    }));
  };



  render() {
    const { fen }  = this.state;
    
    const his = this.state.history;
    
    console.log(his);
    
    return this.props.children({
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      PGN: his
    });
  }
}


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

function game_is_over(curr_pos) {
  let temp = new Chess();
  temp.load(curr_pos)
  console.log(temp.game_over());
  if (temp.game_over()) {
    return "Game is Over"
  }
  else {
    return "Keep Playing"
  }
}

function history_of_moves (moves) {
  console.log(moves);
  
  return moves;
}


export default function BlindChess() {
  const [Player, setPlayer] = useState([]);
  const [Spectator, setSpectator] = useState([]);
  
  useEffect(() => {
            socket.on('Player added', (Login) => {
            console.log('New Player was added to the game');
            console.log(Login);
            //setPlayers(Login);
            });
            
            socket.on('Players', (Players) => {
                console.log(Players);
                setPlayer(stats => Players);
            });
            
            socket.on('Spectators', (Spectators) => {
                console.log(Spectators);
                setSpectator(stats => Spectators);
            });
            
        }, []);
  return (
    <div>
    <h2>Players: {Player}</h2>
    <h2>Spectators: {Spectator}</h2>
    
    <ChessGame>
        {({
          position,
          moves,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          dropSquareStyle,
          PGN
        }) => (
        <div>
          <Chessboard
            id="humanVsHuman"
            width={640}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            dropSquareStyle={dropSquareStyle}
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
          
          <h1>
          Chess
          </h1>
          <h2>
          {position === "start" || position.search(/w/) !== -1 ? "White to Play": "Black to Play"}
          
          </h2>
          
          <h3>
          { game_is_over(position) }
          
          </h3>
          
          <ol>
          { PGN.map((move) => <li>{move}</li>) } 
          
          </ol>
          
          </div>
        )}
        </ChessGame>
    </div>
  );
}