import React from 'react';

export function Landing() {
  return (
    <>
      <div className="text-holder">
        <div className="about">
          <div className="sub-about">
            <div className="about-title" id="about">What is Penalty Chess?</div>
            <div className="information">
              Penalty Chess is a unique take on the timeless classic game,
              but it is not for the average player.
              This game is designed to put you to the test,
              making sure that you are truly keeping up,
              not only with your opponent, but with yourself.
            </div>
            <div className="information">
              All the pieces in front of you are all the same.
              There is absolutely no way to tell the difference from a pawn to a queen,
              a rook to a bishop, a knight to a king.
            </div>
          </div>
          <img className="img-right" alt="Game board with emojis as pieces" src="https://cdn.discordapp.com/attachments/836049770254172201/836049803812667442/board.PNG" />
        </div>

        <div className="about-penalty">
          <img className="img-left" alt="Person making illegal move with red no symbol on top" src="https://cdn.discordapp.com/attachments/836049770254172201/836101840743301130/illegal_move.png" />
          <div className="sub-about">
            <div className="about-title" id="penalty">What&apos;s the Penalty?</div>
            <div className="information">
              Every piece looks the same,
              which means you have to remember where you placed each piece.
              If you forget and accidentally make an illegal move, you lose immediately.
            </div>
            <div className="information">
              This is a tougher and more challenging version of chess,
              perfect for those who are comfortable with the game
              and want to take it to the next level.
            </div>
          </div>
        </div>

        <div className="purpose">
          <div className="sub-about">
            <div className="about-title" id="special">What&apos;s so special about this version?</div>
            <div className="information">
              There are dozens of variations of chess to play online,
              with multiple players, different boards, and new pieces.
              Although similar to Blindfold Chess,
              where the players do not see or touch their pieces,
              this version allows players to at least see where their pieces are,
              and making an illegal move will immediately end the game.
              Due to the similarities, Penalty Chess could be used to train for Blindfold Chess,
              especially since you are forced to be as accurate as possible.
              It strikes a good balance between regular chess and
              Blindfold Chess that has yet to be fully realized.
              Players that want a new challenge,
              but aren&apos;t ready for Blindfold Chess will appreciate this game.
            </div>
          </div>
        </div>
      </div>

      <div className="footer">

        <div className="column-holder">
          <div className="column">
            <h2>Links:</h2>
            <div className="links">
              <a href="#top">Back to Top</a>
              <a href="#about">About</a>
              <a href="#penalty">Penalty</a>
              <a href="#special">Special</a>
            </div>
          </div>

          <div className="column">
            <h2>Languages used:</h2>
            <div className="links">
              <a href="https://www.javascript.com/">Javascript</a>
              <a href="https://www.python.org/">Python</a>
            </div>
            <h2>Special Thanks to:</h2>
            <div className="links">
              <a href="https://www.heroku.com/">Heroku</a>
            </div>
          </div>

        </div>

        <div className="contact">
          © Created by Mike Jeong, Joe Passalacqua, Ronak Patel, and Karel Rojas Requena
        </div>
      </div>
    </>
  );
}
export default Landing;
