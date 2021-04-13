export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
};
export type CoveyTownList = { friendlyName: string; coveyTownID: string; currentOccupancy: number; maximumOccupancy: number }[];

export type GameList = { gameID: string; gameState: string ; player1ID: string; gameType: string}[];

export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}

export interface GameCreateRequest {
  player1: string;
  gameType: string;
  initialGameState?: HangmanWord | TTLChoices;
}

export type HangmanWord = { word: string };
export type TTLChoices = { choice1: string, choice2: string, choice3: string, correctLie: number };

export interface GameCreateResponse {
  gameID: string;
}