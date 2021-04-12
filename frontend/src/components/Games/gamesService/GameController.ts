import {
  ResponseEnvelope,
  GameCreateRequest,
  GameCreateResponse,
  GameDeleteRequest,
  GameJoinRequest,
  GameJoinResponse,
  GameUpdateRequest,
  GameListResponse,
  TTLChoices,
  HangmanWord,
  HangmanPlayer2Move,
  TicMove, TTLPlayer2Move,
} from '../gamesClient/Types';
import HangmanGame from './HangmanGame';
import TTLGame from './TTLGame';
import JoinGameListener from './JoinGameListener';
import CoveyTownController from './CoveyTownController';


export default class GameController {

  private static _instance: GameController;

  private static _coveyInstance: CoveyTownController;

  private _gamesList: (TTLGame | HangmanGame )[] = [];

  private _listeners: JoinGameListener[] = [];

  get gamesList(): (TTLGame | HangmanGame)[] {
    return this._gamesList;
  }

  set gamesList(value: (TTLGame | HangmanGame )[]) {
    this._gamesList = value;
  }

  static getInstance(): GameController {
    if (GameController._instance === undefined) {
      GameController._instance = new GameController();
    }
    return GameController._instance;
  }

  // static getCoveyInstance(): CoveyTownController {
  //   if (CoveyTownController. === undefined) {
  //     CoveyTownController._coveyInstance = new GameController();
  //   }
  //   return GameController._instance;
  // }

  /**
   * Creates a new game session initialized by one player
   *
   */
  async createGame(requestData: GameCreateRequest): Promise<ResponseEnvelope<GameCreateResponse>> {
    let newGame;
    const { player1 } = requestData;
    const initialState = requestData.initialGameState;
    if (requestData.gameType === 'Hangman') {
      newGame = new HangmanGame(player1, <HangmanWord>(initialState));
    } else if (requestData.gameType === 'TTL') {
      newGame = new TTLGame(player1, <TTLChoices>(initialState));
    // } else if (requestData.gameType === 'TicTacToe') {
    //   // TODO: add params for TicTacToe constructor
    //   newGame = new TicTacToeGame();
    }
    if (newGame === undefined) {
      return {
        isOK: false,
        message: 'Error: No game type specified',
      };
    }
    this.gamesList.push(newGame);
    return {
      isOK: true,
      response: {
        gameID: newGame.id,
      },
    };
  }

  /**
   * Connects a second player to an existing game
   *
   */
  async joinGame(requestData: GameJoinRequest): Promise<ResponseEnvelope<GameJoinResponse>> {
    const { player2 } = requestData;
    const targetGame = this.gamesList.find(game => game.id === requestData.gameID);
    if (targetGame === undefined) {
      return {
        isOK: false,
        message: 'Error: Target game not found',
      };
    }
    targetGame.playerJoin(player2);
    this._listeners.forEach((listener) => listener.onPlayerJoined(player2));
    return {
      isOK: true,
      response: {
        gameID: targetGame.id,
      },
    };
  }

  /**
   * Updates the game state after a player makes a move
   *
   * @param requestData
   */
  async updateGame(requestData: GameUpdateRequest): Promise<ResponseEnvelope<Record<string, null>>> {
    const { move } = requestData;
    const targetGame = this.gamesList.find(game => game.id === requestData.gameID);
    if (targetGame === undefined) {
      return {
        isOK: false,
        message: 'Error: Target game not found',
      };
    }
    // TODO: move() method should return a boolean value
    let success = true;
    // if (targetGame instanceof TicTacToeGame) {
    //   targetGame.move(<TicMove>move);
    // } else
      if (targetGame instanceof TTLGame) {
      targetGame.move(<TTLPlayer2Move>move);
    } else if (targetGame instanceof HangmanGame) {
      targetGame.move(<HangmanPlayer2Move>move);
    } else {
      success = false;
    }
    return {
      isOK: true,
      response: {},
      message: !success ? 'Invalid update values specified.' : undefined,
    };
  }

  /**
   * Returns list of all games on the server
   *
   */
  async findAllGames(): Promise<ResponseEnvelope<GameListResponse>>  {
    
    const games = this.gamesList.map(game => ({
        gameID: game.id,
        gameState: game.gameState,
        player1ID: game.player1ID,
        gameType: game.gameType
      }),
    );
    return {
      isOK: true,
      response: {
        games,
      },
    };
  }

  /**
   * Returns an instance of a game found by its ID
   *
   */
  public findGameById(gameId: string): (HangmanGame | TTLGame | undefined) {
    try {
      return this.gamesList.find(game => game.id === gameId);
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Deletes a game from the server after it is finished
   *
   * @param requestData
   */
  async deleteGame(requestData: GameDeleteRequest): Promise<ResponseEnvelope<Record<string, null>>>  {
    let success;
    const updatedList = this.gamesList.filter(game => game.id !== requestData.gameID);
    if (this.gamesList.length !== updatedList.length) {
      this.gamesList = updatedList;
      success = true;
    } else {
      success = false;
    }
    return {
      isOK: true,
      response: {},
      message: !success ? 'Game to delete not found. Game ID may be invalid.' : undefined,
    };
  }

  addTownListener(listener: JoinGameListener): void {
    this._listeners.push(listener);
  }

  removeTownListener(listener: JoinGameListener): void {
    this._listeners = this._listeners.filter((v) => v !== listener);
  }
}

