const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3,2,1],[],[]];
  }

  promptMove(callback){
    console.log(this.stacks);
    reader.question('Start tower index: !', function(answer){
      const startTowerIdx = parseInt(answer);
      reader.question('End tower index: !', function(answer2){
        const endTowerIdx = parseInt(answer2);
        return callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx){
    const startTower = this.stacks[startTowerIdx];
    const endTower = this.stacks[endTowerIdx];
    if (startTowerIdx > 2 || startTowerIdx < 0 || endTowerIdx > 2 || endTowerIdx < 0) {
      return false;
    } else if (startTower.length === 0) {
      return false;
    } else if (endTower.length === 0) {
      return true;
    } else if (startTower[startTower.length-1] > endTower[endTower.length-1]) {
      return false;
    } else {
      return true;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      // console.log(this.stacks);
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(JSON.stringify(this.stacks));
  }

  isWon () {
    if (this.stacks[0].length === 0 && (this.stacks[1].length === 0 ^ this.stacks[2].length === 0)) {
      return true;
    } else {
      return false;
    }
  }
}

Game.prototype.run = function () {
  if (this.promptMove(this.move)) {
    this.print();
  } else {
    console.log('error, invalid move');
  }
  if (this.isWon) {
    console.log('game over!');
    reader.close();
    return;
  } else {
    this.run();
  }
};




const g = new Game();
g.run();
// g.promptMove((s, e) => console.log(`${s} ${e}`));
// console.log(g.isValidMove(0, 2));
// console.log(g.isValidMove(1, 0));
// console.log(g.isValidMove(1, 2));
// g.move(0,2);
// g.move(0,1);
// g.move(2,1);
// g.move(0,2);
// g.move(1,0);
// g.move(1,2);
// g.move(0,2);
// console.log(g.isWon());
