import Player from '../types/Player';

export interface GameCreateRequest {
  players: Player[];
  gameType: string;
}

export interface GameUpdateRequest {
  gameId: string;
  player: Player;
  move: string
}

export interface GameFindRequest {
  gameId: string
}

export interface GameDeleteRequest {
  gameId: string
}

export enum Cell {
  empty,
  xSlot,
  oSlot,
}

export enum CheckDirection {
  horizontal,
  vertical,
}

export enum Players {
  player1,
  player2,
}
