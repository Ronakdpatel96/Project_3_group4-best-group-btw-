import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js'; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from 'chessboardjsx';
import './chessboard.css';
import Chat from './chat';

export default function BlindChess({ userData, socket, userName }) {
  const [gameFen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on('move', (data) => {
      setFen(data.FEN);
      setHistory(data.history);
    });
  }, []);
  // Image options
  const factor = 0.75;
  const WhiteImage = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/48/face-with-tears-of-joy_1f602.png';
  const BlackImage = 'http://cdn.shopify.com/s/files/1/1061/1924/products/Loudly_Crying_Face_Emoji_grande.png?v=1571606037';
  const optionWhite = ({ squareWidth, isDragging }) => (
    <img
      style={{
        width: isDragging ? squareWidth * factor : squareWidth,
        height: isDragging ? squareWidth * factor : squareWidth,
      }}
      src={WhiteImage}
      alt="whitepieces"
    />
  );

  const optionBlack = ({ squareWidth, isDragging }) => (
    <img
      style={{
        width: isDragging ? squareWidth * factor : squareWidth,
        height: isDragging ? squareWidth * factor : squareWidth,
      }}
      src={BlackImage}
      alt="blackpieces"
    />
  );

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (sourceSquare === targetSquare) {
      return;
    }
    // console.log("User_data " , userData);

    if (userData.Black !== userName && userData.White !== userName) {
      return;
    }

    // console.log(sourceSquare, targetSquare);
    const game = new Chess(gameFen);
    // see if the move is legal

    if (game.in_checkmate()) {
      return;
    }

    const turn = game.fen() === 'start' || game.fen().search(/w/) !== -1 ? 'White' : 'Black';

    if (userName === userData.White && turn !== 'White') {
      return;
    }
    if (userName === userData.Black && turn !== 'Black') {
      return;
    }

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      alert('You lose due to illegal move', sourceSquare, targetSquare);
      console.log('illegal move');
      return;
    }

    // console.log(game.pgn().replace("[SetUp \"1\"]" , "").replace(/\s*\[.*?\]\s*/g, ''));
    let moveString = game.pgn().replace('[SetUp "1"]', '').replace(/\s*\[.*?\]\s*/g, '');

    if (moveString.includes('...')) {
      // console.log(moveString.split("...")[1]);
      moveString = moveString.split('...')[1];
    } else {
      // console.log(moveString);
      moveString = moveString.split('. ')[1];
    }

    const newFen = game.fen();
    const newHistory = history.concat(moveString);

    const data = { FEN: newFen, history: newHistory };

    socket.emit('move', data);

    // console.log("New History", newHistory);
    setFen((prev) => newFen);
    setHistory((prev) => newHistory);
  };

  function chessInfo() {
    const game = new Chess(gameFen);
    // console.log(game);
    // console.log(userData);
    // console.log("history", history);
    const tempHistory = history;

    const listMoves = Array(0);
    for (let i = 0; i < tempHistory.length; i += 2) {
      listMoves.push([tempHistory[i], tempHistory[i + 1]]);
    }

    // console.log("listMoves", listMoves);
    console.log(game.in_checkmate());
    let GameInfo = '';
    const turn = game.fen() === 'start' || game.fen().search(/w/) !== -1 ? 'White' : 'Black';

    if (game.in_checkmate()) {
      if (turn === 'Black') {
        GameInfo = 'White won by checkmate';
        socket.emit('finish', { win: userData.White, lose: userData.Black });
      } else {
        GameInfo = 'Black won by checkmate';
        socket.emit('finish', { win: userData.Black, lose: userData.White });
      }
    } else if (game.in_draw() || game.in_stalemate() || game.in_threefold_repetition()) {
      socket.emit('draw', [userData.White, userData.Black]);
      GameInfo = 'Draw by stalemate';
    } else if (game.insufficient_material()) {
      socket.emit('draw', [userData.White, userData.Black]);
      GameInfo = 'Draw by insufficient material';
    } else {
      GameInfo = `${turn} to Play`;
    }

    let Role = '';

    if (userName === userData.White) {
      Role = 'White';
    } else if (userName === userData.Black) {
      Role = 'Black';
    } else {
      Role = 'Spectator';
    }

    return (
      <div className="chessInfo">
        <h1>
          {' '}
          {GameInfo}
          {' '}
        </h1>
        <h1>
          {' '}
          {userName}
          {' '}
          (You) are playing as
          {' '}
          {Role}
        </h1>
        <ol>
          {' '}
          {listMoves.map((move) => <li>{move}</li>)}
          {' '}
        </ol>

      </div>
    );
  }

  function resign() {
    if (Chess(gameFen).game_over()) {
      return;
    }

    if (userName === userData.White) {
      setFen('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
      const data = { FEN: 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3', history: [] };
      socket.emit('move', data);
    } else if (userName === userData.Black) {
      setFen('rnbqkbnr/ppppp2p/8/5ppQ/4P3/P7/1PPP1PPP/RNB1KBNR b KQkq - 1 3');
      const data = { FEN: 'rnbqkbnr/ppppp2p/8/5ppQ/4P3/P7/1PPP1PPP/RNB1KBNR b KQkq - 1 3', history: [] };
      socket.emit('move', data);
    }
  }

  function replay() {
    if (!(userData.Black === userName || userData.White === userName)) {
      return;
    }
    setFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    setHistory([]);
    const data = { FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', history: [] };
    socket.emit('move', data);
  }

  function ChessGame() {
    if ((userName === userData.Black || userName === userData.White)) {
      return (
        <div className="ChessBoard">
          <Chessboard
            id="chessBoard"
            width={640}
            position={gameFen}
            onDrop={onDrop}
            boardStyle={{
              borderRadius: '5px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
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
              bP: optionBlack,
            }}
            orientation={userName === userData.Black ? 'Black' : 'White'}
          />
        </div>
      );
    }

    return (
      <div className="ChessBoard">
        <Chessboard
          id="chessBoard"
          width={640}
          position={gameFen}
          onDrop={onDrop}
          boardStyle={{
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          }}
          orientation={userName === userData.Black ? 'Black' : 'White'}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        {ChessGame()}
        {chessInfo()}
        {userData.Black === userName || userData.White === userName
          ? (
            <button type="button" onClick={() => resign()}>Resign </button>
          )
          : null}
        {Chess(gameFen).in_checkmate()
        && (userData.Black === userName || userData.White === userName)
          ? (
            <button type="button" onClick={() => replay()}>Play Again</button>
          )
          : ''}
        <br />
      </div>

      <div className="box">
        <h2>Chat with other players:</h2>
        <br />
        <br />
        <div className="chat">
          <Chat socket={socket} userName={userName} />
        </div>
      </div>

    </div>
  );
}

BlindChess.propTypes = {
  socket: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.string),
  userName: PropTypes.string,
};

BlindChess.defaultProps = {
  socket: () => {},
  userData: {},
  userName: '',
};
