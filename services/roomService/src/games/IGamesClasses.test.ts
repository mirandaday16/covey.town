import TTLGame from './TTLGame';
import HangmanGame from './HangmanGame';


const player1ID1 = '1234567890';
const player1Username1 = '5500Student1';
const player2ID = '123456789';
const player2Username = 'Player2';
const finalWord = 'test';
const townId = '413554';



describe('HangmanGame', () => {
  describe('test initializeGame()', () => {
    it('should tell user to choose a letter, also testing finalWord is correct', () => {
      const testHangmanGame1 = new HangmanGame(player1ID1, player1Username1,
        { word: finalWord }, townId);
      expect(testHangmanGame1
        .initializeGame())
        .toBe('Choose a letter!');
      expect(testHangmanGame1
        .finalWord)
        .toBe('test');
    });
    it('should have the correct Player 1 ID/Username values', () => {
      const testHangmanGame1 = new HangmanGame(player1ID1, player1Username1,
        { word: finalWord }, townId);
      testHangmanGame1.initializeGame();
      expect(testHangmanGame1
        .player1ID)
        .toBe('1234567890');
      expect(testHangmanGame1
        .player1Username)
        .toBe('5500Student1');
    });
    it('should have the correct Player 1 ID/Username values', () => {
      const testHangmanGame1 = new HangmanGame(player1ID1, player1Username1,
        { word: finalWord }, townId);
      testHangmanGame1.initializeGame();
      expect(testHangmanGame1
        .player2ID)
        .toBe('');
      expect(testHangmanGame1
        .player2Username)
        .toBe('');
    });
  });




  describe('test move()', () => {
    it('should either tell user they guessed correctly, they already guessed that letter, or remove a limb', () => {
      const testHangmanGame1 = new HangmanGame(player1ID1, player1Username1,
        { word: finalWord }, townId);

      expect(testHangmanGame1
        .move({ letter: 'e' }))
        .toBe('Good job - you got a letter!');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(1);
      expect(testHangmanGame1.limbList.length).toBe(6);

      expect(testHangmanGame1
        .move({ letter: 'a' }))
        .toBe('Head');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(2);
      expect(testHangmanGame1.limbList.length).toBe(5);

      expect(testHangmanGame1
        .move({ letter:'a' }))
        .toBe('You already guessed that letter - make another guess!');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(2);
      expect(testHangmanGame1.limbList.length).toBe(5);

      expect(testHangmanGame1
        .move({ letter:'b' }))
        .toBe('Back');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(3);
      expect(testHangmanGame1.limbList.length).toBe(4);

      expect(testHangmanGame1
        .move({ letter:'c' }))
        .toBe('LeftArm');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(4);
      expect(testHangmanGame1.limbList.length).toBe(3);

      expect(testHangmanGame1
        .move({ letter:'d' }))
        .toBe('RightArm');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(5);
      expect(testHangmanGame1.limbList.length).toBe(2);

      expect(testHangmanGame1
        .move({ letter:'g' }))
        .toBe('LeftLeg');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(6);
      expect(testHangmanGame1.limbList.length).toBe(1);

      expect(testHangmanGame1
        .move({ letter:'d' }))
        .toBe('You already guessed that letter - make another guess!');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(6);
      expect(testHangmanGame1.limbList.length).toBe(1);

      expect(testHangmanGame1
        .move({ letter:'f' }))
        .toBe('RightLeg');
      expect(testHangmanGame1.alreadyGuessed.length).toBe(7);
      expect(testHangmanGame1.limbList.length).toBe(0);
    });
  });

  describe('test playerJoin()', () => {
    it('should return updated Player 2 ID/Username', () => {
      const testHangmanGame1 = new HangmanGame(player1ID1, player1Username1,
        { word: finalWord }, townId);
      testHangmanGame1.playerJoin(player2ID, player2Username);
      expect(testHangmanGame1.player2ID).toBe(player2ID);
      expect(testHangmanGame1.player2Username).toBe(player2Username);
      expect(async () => { await testHangmanGame1.playerJoin('345678912', 'anotherplayer');}).rejects.toThrow('Game is already full');
    });
  });
});






const option1Test1 = 'I am in graduate school';
const option2Test1 = 'I am in my 20s';
const option3Test1 = 'I play soccer';
const correctOptionTest1 = 3;



describe('TTLGame', () => {
  describe('test initializeGame()', () => {
    it('should list the three options', () => {
      const testGame1 = new TTLGame(player1ID1, player1Username1,
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1 }, townId);
      expect(testGame1
        .initializeGame())
        .toBe('Your two truths and a lie options are:\nOption 1: I am in graduate school\nOption 2: I am in my 20s\nOption 3: I play soccer\nGuess which is the lie!');
    });
    it('should have the correct Player 1 ID/Username values', () => {
      const testGame1 = new TTLGame(player1ID1, player1Username1,
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1 }, townId);
      testGame1.initializeGame();
      expect(testGame1
        .player1ID)
        .toBe('1234567890');
      expect(testGame1
        .player1Username)
        .toBe('5500Student1');
    });
    it('should have the correct Player 1 ID/Username values', () => {
      const testGame1 = new TTLGame(player1ID1, player1Username1,
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1 }, townId);
      testGame1.initializeGame();
      expect(testGame1
        .player2ID)
        .toBe('');
      expect(testGame1
        .player2Username)
        .toBe('');
    });
  });





  describe('test move()', () => {
    it('should add an element to alreadyGuessed', () => {
      const testGame1 = new TTLGame(player1ID1, player1Username1,
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1 }, townId);
      expect(testGame1.alreadyGuessed.length)
        .toBe(0);
      testGame1.move({ guess: option3Test1 });
      expect(testGame1.alreadyGuessed.length)
        .toBe(1);
    });
  });


  describe('test playerJoin()', () => {
    it('should return updated Player 2 ID/Username', () => {
      const testGame1 = new TTLGame(player1ID1, player1Username1,
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1 }, townId);
      testGame1.playerJoin(player2ID, player2Username);
      expect(testGame1.player2ID).toBe('123456789');
      expect(testGame1.player2Username).toBe('Player2');
      expect(async () => { await testGame1.playerJoin('345678912', 'anotherplayer');}).rejects.toThrow('Game is already full');

    });
  });

});
