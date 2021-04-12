import CoveyTownController from './CoveyTownController';
import { CoveyTownList, GameCreateRequest, GameCreateResponse, GameListResponse, GameList, HangmanWord, ResponseEnvelope, TTLChoices } from './CoveyTypes';
import HangmanGame from './HangmanGame';
import TTLGame from './TTLGame';


function passwordMatches(provided: string, expected: string): boolean {
  if (provided === expected) {
    return true;
  }
  if (process.env.MASTER_TOWN_PASSWORD && process.env.MASTER_TOWN_PASWORD === provided) {
    return true;
  }
  return false;
}

export default class CoveyTownsStore {
  private static _instance: CoveyTownsStore;

  private _towns: CoveyTownController[] = [];

  private _gamesList: (TTLGame | HangmanGame )[] = [];


  static getInstance(): CoveyTownsStore {
    if (CoveyTownsStore._instance === undefined) {
      CoveyTownsStore._instance = new CoveyTownsStore();
    }
    return CoveyTownsStore._instance;
  }

  getControllerForTown(coveyTownID: string): CoveyTownController | undefined {
    return this._towns.find(town => town.coveyTownID === coveyTownID);
  }

  getTowns(): CoveyTownList {
    return this._towns.filter(townController => townController.isPubliclyListed)
      .map(townController => ({
        coveyTownID: townController.coveyTownID,
        friendlyName: townController.friendlyName,
        currentOccupancy: townController.occupancy,
        maximumOccupancy: townController.capacity,
      }));
  }

  createTown(friendlyName: string, isPubliclyListed: boolean): CoveyTownController {
    const newTown = new CoveyTownController(friendlyName, isPubliclyListed);
    this._towns.push(newTown);
    return newTown;
  }

  updateTown(coveyTownID: string, coveyTownPassword: string, friendlyName?: string, makePublic?: boolean): boolean {
    const existingTown = this.getControllerForTown(coveyTownID);
    if (existingTown && passwordMatches(coveyTownPassword, existingTown.townUpdatePassword)) {
      if (friendlyName !== undefined) {
        if (friendlyName.length === 0) {
          return false;
        }
        existingTown.friendlyName = friendlyName;
      }
      if (makePublic !== undefined) {
        existingTown.isPubliclyListed = makePublic;
      }
      return true;
    }
    return false;
  }

  async createGame(requestData: GameCreateRequest, coveyTownID: string): Promise<ResponseEnvelope<GameCreateResponse>> {
    const existingTown = this.getControllerForTown(coveyTownID);
    let newGame;
    const { player1 } = requestData;
    const initialState = requestData.initialGameState;
    if (requestData.gameType === 'Hangman') {
      newGame = new HangmanGame(player1, <HangmanWord>(initialState));
      existingTown?.createTownGame(newGame.id);
    } else if (requestData.gameType === 'TTL') {
      newGame = new TTLGame(player1, <TTLChoices>(initialState));
      existingTown?.createTownGame(newGame.id);
    }
    if (newGame === undefined) {
      return {
        isOK: false,
        message: 'Error: No game type specified',
      };
    }
    // existingTown?.createTownGame(newGame.id);
    this._gamesList.push(newGame);
    return {
      isOK: true,
      response: {
        gameID: newGame.id,
      },
    };
  }

  public findGameById(gameId: string): (HangmanGame | TTLGame | undefined) {
    try {
      return this._gamesList.find(game => game.id === gameId);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAllGames(): Promise<ResponseEnvelope<GameListResponse>>  {
    
    const games = this._gamesList.map(game => ({
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

  deleteTown(coveyTownID: string, coveyTownPassword: string): boolean {
    const existingTown = this.getControllerForTown(coveyTownID);
    if (existingTown && passwordMatches(coveyTownPassword, existingTown.townUpdatePassword)) {
      this._towns = this._towns.filter(town => town !== existingTown);
      existingTown.disconnectAllPlayers();
      return true;
    }
    return false;
  }

  

}