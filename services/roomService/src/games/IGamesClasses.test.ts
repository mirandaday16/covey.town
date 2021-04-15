import http from 'http';
import assert from 'assert';
import { AddressInfo } from 'net';
import { nanoid } from 'nanoid';
import CORS from 'cors';
import Express from 'express';
import TTLGame from './TTLGame';
import HangmanGame from './HangmanGame';


const player1ID1 = '1234567890';
const player1Username1 = '5500Student1'
const player1ID2 = '987654321';
const player1Username2 = '5500Student2'
const player2ID = '123456789';
const player2ID2 = '8675309';
const player2Username = 'Player2';


const gameStartMessage = `Choose a letter!`;
const HangmanPlayer1ID1 = '123456789';
const HangmanPlayer1Username1 = 'hangmanplayer1';
const finalWord = 'test';
const head = 'Head';
const back = 'Back';
const leftArm = 'LeftArm';
const rightArm = 'RightArm';
const leftLeg = 'LeftLeg';
const rightLeg = 'RightLeg';
const splitword = finalWord.split('');
const limbList = [Limb.RightLeg, Limb.LeftLeg, Limb.RightArm, Limb.LeftArm, Limb.Back, Limb.Head];



describe('HangmanGame', () =>
{
  describe('test initializeGame()', () =>
  {
    it('should tell user to choose a letter, also testing finalWord is correct', () =>
    {
      let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
        { word: finalWord});
      expect(testHangmanGame1
        .initializeGame())
        .toBe(`Choose a letter!`);
      expect(testHangmanGame1
        .finalWord)
        .toBe(`test`);
    });
    it('should have the correct Player 1 ID/Username values', () =>
    {
      let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
        { word: finalWord});
      testHangmanGame1.initializeGame();
      expect(testHangmanGame1
        .player1ID)
        .toBe(`1234567890`);
      expect(testHangmanGame1
        .player1Username)
        .toBe(`5500Student1`);
    });
    it('should have the correct Player 1 ID/Username values', () =>
    {
      let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
        { word: finalWord});
      testHangmanGame1.initializeGame();
      expect(testHangmanGame1
        .player2ID)
        .toBe('');
      expect(testHangmanGame1
        .player2Username)
        .toBe('');
    });
  });





  describe('HangmanGame', () =>
  {
    describe('test limbToString()', () =>
    {
      it('should return string version of the Limbs', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, { word: finalWord});
        expect(testHangmanGame1
          .limbToString(Limb.Head))
          .toBe('Head');
        expect(testHangmanGame1
          .limbToString(Limb.Back))
          .toBe('Back');
        expect(testHangmanGame1
          .limbToString(Limb.LeftArm))
          .toBe('LeftArm');
        expect(testHangmanGame1
          .limbToString(Limb.LeftLeg))
          .toBe('LeftLeg');
        expect(testHangmanGame1
          .limbToString(Limb.RightArm))
          .toBe('RightArm');
        expect(testHangmanGame1
          .limbToString(Limb.RightLeg))
          .toBe('RightLeg');
        });
      });
    });





  describe('test move()', () =>
    {
      it('should either tell user they guessed correctly, they already guessed that letter, or remove a limb', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
          { word: finalWord});
        expect(testHangmanGame1
          .move({letter: 'a'}))
          .toBe('Head');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);
        expect(testHangmanGame1.limbList.length).toBe(5);

        expect(testHangmanGame1
          .move({letter:'a'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);
        expect(testHangmanGame1.limbList.length).toBe(5);

        expect(testHangmanGame1
          .move({letter:'b'}))
          .toBe('Back');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(2);
        expect(testHangmanGame1.limbList.length).toBe(4);

        expect(testHangmanGame1
          .move({letter:'c'}))
          .toBe('LeftArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(3);
        expect(testHangmanGame1.limbList.length).toBe(3);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('RightArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(4);
        expect(testHangmanGame1.limbList.length).toBe(2);

        expect(testHangmanGame1
          .move({letter:'g'}))
          .toBe('LeftLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);
        expect(testHangmanGame1.limbList.length).toBe(1);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);
        expect(testHangmanGame1.limbList.length).toBe(1);

        expect(testHangmanGame1
          .move({letter:'f'}))
          .toBe('RightLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(6);
        expect(testHangmanGame1.limbList.length).toBe(0);
      });
    });






    describe('test isGameOver()', () =>
    {
      it('should return true because there are no more limbs, false before then', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
          { word: finalWord});
        expect(testHangmanGame1
          .move({letter: 'a'}))
          .toBe('Head');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);
        expect(testHangmanGame1.limbList.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'a'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'b'}))
          .toBe('Back');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(2);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'c'}))
          .toBe('LeftArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(3);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('RightArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(4);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'g'}))
          .toBe('LeftLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);
        
        expect(testHangmanGame1
          .move({letter:'f'}))
          .toBe('RightLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(6);

        expect(testHangmanGame1
          .isGameOver()).toBe(true);
      });
    });





    describe('test isGameOver()', () =>
    {
      it('should return true because all correct letters guessed, false before then', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
          { word: finalWord});
        expect(testHangmanGame1
          .move({letter: 'a'}))
          .toBe('Head');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);
        expect(testHangmanGame1.limbList.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'a'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(1);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'b'}))
          .toBe('Back');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(2);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'c'}))
          .toBe('LeftArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(3);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('RightArm');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(4);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'g'}))
          .toBe('LeftLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);

        expect(testHangmanGame1
          .move({letter:'d'}))
          .toBe('You already guessed that letter - make another guess!');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(5);

        expect(testHangmanGame1
          .isGameOver()).toBe(false);
        
        expect(testHangmanGame1
          .move({letter:'f'}))
          .toBe('RightLeg');
        expect(testHangmanGame1.alreadyGuessed.length).toBe(6);

        expect(testHangmanGame1
          .isGameOver()).toBe(true);
      });
    });







    describe('test finishGame()', () =>
    {
      it('should return corresponding player id', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
          { word: finalWord});
        expect(testHangmanGame1
          .finishGame(testHangmanGame1.player1ID))
          .toBe('1234567890 won!');
        testHangmanGame1.playerJoin(player2ID2, player2Username);
        expect(testHangmanGame1.finishGame(testHangmanGame1.player2ID))
        .toBe(`8675309 won!`);
      });
    });





    describe('test playerJoin()', () =>
    {
      it('should return updated Player 2 ID/Username', () =>
      {
        let testHangmanGame1 = new HangmanGame(player1ID1, player1Username1, 
          { word: finalWord});
        testHangmanGame1.playerJoin(player2ID, player2Username);
        expect(player2ID).toBe('123456789');
        expect(player2Username).toBe('Player2');
 
      });
    });
});



const option1Test1 = 'I am in graduate school';
const option2Test1 = 'I am in my 20s';
const option3Test1 = 'I play soccer';
const option1Test2 = 'I have siblings';
const option2Test2 = 'I have a cat';
const option3Test2 = 'I live in California';
const correctOptionTest1 = 3;
const correctOptionTest2 = 3;
const gameState1 = {option1Test1, option2Test1, option3Test1, correctOptionTest1};
const gameState2 = {option1Test2, option2Test2, option3Test2, correctOptionTest2};



describe('TTLGame', () =>
{
  describe('test initializeGame()', () =>
  {
    it('should list the three options', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      expect(testGame1
      .initializeGame())
      .toBe(`Your two truths and a lie options are:\nOption 1: I am in graduate school\nOption 2: I am in my 20s\nOption 3: I play soccer\nGuess which is the lie!`);
    });
    it('should have the correct Player 1 ID/Username values', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      testGame1.initializeGame();
      expect(testGame1
        .player1ID)
        .toBe(`1234567890`);
      expect(testGame1
        .player1Username)
        .toBe(`5500Student1`);
    });
    it('should have the correct Player 1 ID/Username values', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      testGame1.initializeGame();
      expect(testGame1
        .player2ID)
        .toBe('');
      expect(testGame1
        .player2Username)
        .toBe('');
    });
  });





  describe('test move()', () =>
  {
    it('should add an element to alreadyGuessed', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      expect(testGame1.alreadyGuessed.length)
        .toBe(0);
        testGame1.move({guess: option3Test1});
      expect(testGame1.alreadyGuessed.length)
      .toBe(1);
    });
  });





  describe('test isGameOver()', () =>
  {
    it('should call if the game is over', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      expect(testGame1.isGameOver())
        .toBe(false);
      testGame1.move({guess: option2Test1});
      expect(testGame1.alreadyGuessed.length).toBe(1);
      expect(testGame1.isGameOver())
      .toBe(true);
    });
  });






  describe('test finishGame()', () =>
  {
    it('should return message saying game is over and the id of the winning player', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      expect(testGame1.isGameOver())
        .toBe(false);
      testGame1.move({guess: option2Test1});
      expect(testGame1.finishGame(testGame1.player1ID))
      .toBe(`1234567890 won!`);
      testGame1.playerJoin(player2ID2, player2Username);
      expect(testGame1.finishGame(testGame1.player2ID))
      .toBe(`8675309 won!`);
    });
  });





  describe('test playerJoin()', () =>
  {
    it('should return updated Player 2 ID/Username', () =>
    {
      let testGame1 = new TTLGame(player1ID1, player1Username1, 
        { choice1: option1Test1, choice2: option2Test1, choice3: option3Test1, correctLie: correctOptionTest1});
      testGame1.playerJoin(player2ID, player2Username);
      expect(player2ID).toBe('123456789');
      expect(player2Username).toBe('Player2');
      expect(testGame1.playerJoin('345678912', 'anotherplayer')).toThrow(new Error('Game is already full'));
      
    });
  });

});

const testGame2: TTLGame = new TTLGame(player1ID2, player1Username2, 
    {choice1: option1Test2, choice2: option2Test2, choice3: option3Test2, correctLie: correctOptionTest2});

