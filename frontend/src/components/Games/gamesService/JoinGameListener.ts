export default interface CoveyTownListener {
    /**
     * Called when a player joins a town
     * @param newPlayer the new player
     */
    onPlayerJoined(player2: string): void;
}