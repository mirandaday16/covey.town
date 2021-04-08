import IGame from './IGame';
import {TicMove} from '../client/Types';
import {Cell, CheckDirection, Players} from './RequestTypes';

export default class TicGame implements IGame {
  gameState: string;

  board: Cell[][];

  player1ID: string;

  player2ID: string;

  winningID: string;

  constructor(player1ID: string, player2ID: string) {
    this.player1ID = player1ID;
    this.player2ID = player2ID;
    this.board = this.initializeBoard();
    this.gameState = this.initializeGame();
    this.winningID = '';
  }


  finishGame(): string {
    if (this.winningID === this.player1ID) {
      return 'Player 1 has won!';
    }
    if (this.winningID === this.player2ID) {
      return 'PLayer 2 has won!';
    }
    if (this.winningID === '') {
      throw new Error('There is no winner recorded');
    }
  }

  initializeBoard(): Cell[][] {
    const tempBoard: Cell[][] = [];
    for (let i = 0; i < 3; i += 1) {
      const col : Cell[] = [];
      for (let j = 0; j < 3; j += 1) {
        col.push(Cell.empty);
      }
      tempBoard.push(col);
    }
    return tempBoard;
  }

  initializeGame(): string {

  }

  isGameOver(): boolean {
    const vertCell = this.checkStraight(CheckDirection.vertical);
    const horiCell = this.checkStraight(CheckDirection.horizontal);
    const middleCell = this.checkDiagonal();
    if (vertCell !== Cell.empty) {
      this.handleWinningCell(vertCell);
      return true;
    }
    if (middleCell !== Cell.empty) {
      this.handleWinningCell(middleCell);
      return true;
    }
    if (horiCell !== Cell.empty) {
      this.handleWinningCell(horiCell);
      return true;
    }
    return this.checkNoMoves();
  }

  handleWinningCell(cell: Cell) : void {
    if (cell !== Cell.empty){
      if ( cell === Cell.xSlot) {
        this.winningID = this.player1ID;
      } else {
        this.winningID = this.player2ID;
      }
    }
  }

  checkStraight(direction: CheckDirection) : Cell {
    let firstCell = Cell.empty;
    let secondCell = Cell.empty;
    let curCell = Cell.empty;
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        firstCell = secondCell;
        secondCell = curCell;
        if (direction === CheckDirection.vertical) {
          curCell = this.board[i][j];
        } else if (direction === CheckDirection.horizontal) {
          curCell = this.board[j][i];
        }
        if (curCell === secondCell && secondCell === firstCell) {
          return curCell;
        }
      }
    }
    return Cell.empty;
  }

  checkDiagonal() : Cell {
    const middleCell = this.board[1][1];
    const upLCell = this.board[0][0];
    const downRCell = this.board[2][2];

    const upRCell = this.board[2][0];
    const downLCell = this.board[0][2];

    if ((upLCell === middleCell && downRCell === middleCell) || (upRCell === middleCell && middleCell === downLCell)) {
      return middleCell;
    }
    return Cell.empty;
  }

  checkNoMoves() : boolean {
    let noEmpty = false;
    this.board.forEach(col => {
      col.forEach(cell => {
        noEmpty = noEmpty || cell === Cell.empty;
      });
    });
    return !noEmpty;
  }

  move(move: TicMove): void {
      if (this.board[move.x][move.y] === Cell.empty) {
        if (move.player === Players.player1) {
          this.board[move.x][move.y] = Cell.xSlot;
        }
        else {
          this.board[move.x][move.y] = Cell.oSlot;
        }
      }
  }

}
