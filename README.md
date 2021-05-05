# Project 3 Sprint 2 - Penalty Chess
Heroku link:
[https://intense-river-03702.herokuapp.com/](https://intense-river-03702.herokuapp.com/)

This is the Penalty Chess Game, where players will play chess without knowing what their pieces are.

## Notes

For Sprint 2, out main focus was working on the main features that we had hoped to complete by Sprint 1.
This included adding socket connections to the chessboard, socket connections to the chat feature, emitting the database properly, and other features.
Once we were able to finish those stories, we began to work on other agile stories, like the landing page, improving the UI, adding spectators to the game
implementing pages to our project, etc.

## Installations
1. `npm install`
2. `pip install Flask`
4. `pip install flask-socketio`
5. `pip install flask-cors`
6. `pip install python-dotenv`
7. `pip install Flask-SQLAlchemy==2.1`
8. `pip install psycopg2-binary`
9. `npm install socket.io-client --save`
10. `npm install react-google-login`
11. `npm install axios`
12. `npm install react-router-dom`

## Google auth (not necessary)
1. https://developers.google.com/identity/gsi/web/guides/display-google-one-tap
2. https://console.cloud.google.com/
3. create an account
4. credentials
5. OAuth consent screen
6. register web app

## Rules ignored when using pylint
1. E1101 (no-member)
2. W1508 (invalid-envvar-default)
3. W0603 (global-statement)
4. R0903

These were the four rules that were ignored for this project. They are the rules that were ignored in the previous project.

## Rules ignored when using eslint(Airbnb)
1. react/jsx-filename-extension
2. react/no-array-index-key
3. react-hooks/exhaustive-deps
4. no-console
5. no-alert
6. import/no-named-as-default
7. no-unused-vars
8. no-undef
9. prefer-destructuring

* The first three rules ignored were also ignored from the previous project, so we included them here.
The next two, #4 and #5, these are warnings, and they are ignored so that the client workflows don't see these as an error.
* For #6, this error resulted when importing `Gameroom`, `Leaderboard`, and `Landing` in App.js. Even though it was written properly,
it still resulted in an error. When we found this [StackOverflow question](https://stackoverflow.com/questions/44437203/how-do-i-resolve-eslint-import-no-named-as-default)
we decided to ignore it when linting.
* For #7, this error would occur when changing a state's value, such as in `chessboard.js` in the line `setHistory((prev) => newHistory);`. The variable, `prev`
is considered unused, even though it acts as the previous state for the `history` variable.
* For #8, we had the variables `localStorage` and `alert` that were considered undefined. `localStorage` is used to persist data on the app, so that users
who return to the page will stay logged in. The `alert` comes from the javascript alert that appears when a player makes an illegal move. Since these variables
are important for the app, we decided to ignore this rule.
* For #9, we removed this error since it would interfere with the code that we wrote in `chessboard.js`. The lines `moveString = moveString.split('...')[1];`
and `moveString = moveString.split('. ')[1];` recieved errors, since they wanted us to rewrite how the array values are recieved. A [question](https://stackoverflow.com/questions/54828209/use-array-destructuring-prefer-destructuring-error-on-eslint)
on StackOverflow gave a possible solution, but it would not work, since the length of the array changes between two and three with every move made. As a result,
we decided to ignore this rule as well
