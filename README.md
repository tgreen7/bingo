# Bingo Game

This project is a bingo game created for a coding challenge. It is written in react with an express server.
For now it always creates 5x5 Bingo Boards.

The player receives 4 boards and numbers are randomly called from 1-100. When the player thinks they have a winning board they can call bingo which will send that board to the server to see if it is a winning board.
If it is, the game ends.

To start the app use:

```
yarn start
```

Start the server with:

```
yarn start-server
```

Then visit localhost:3000.

Tests can be ran with:

```
yarn test
```
