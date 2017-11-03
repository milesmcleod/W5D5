class Clock {
  constructor() {
    let now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.printTime();
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    // setInterval(this._tick.bind(this), 1000);
    setInterval( () => {
      this._tick();
    }, 1000);
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    // Format the time in HH:MM:SS
    // Use console.log to print it.
  }

  _tick() {
    // 1. Increment the time by one second.
    // debugger
    this.seconds += 1;
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes +=1;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours +=1;
    }

    if (this.hours === 24) {
      this.hours =0;
    }

    // 2. Call printTime.
    this.printTime();
  }
}

// const clock = new Clock();

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const addNumbers = function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question('Input a number!', function (answer) {
      const num = parseInt(answer);
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft -1, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
};

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

const askIfGreaterThan = function askIfGreaterThan(el1, el2, callback){
  reader.question(`${el1} > ${el2}?`, function(answer){
    if (answer === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
};

// askIfGreaterThan(2,1, sum => console.log(`answer: ${sum}`));

const innerBubbleSortLoop = function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
  if (i < arr.length -1) {
    askIfGreaterThan(arr[i], arr[i+1], isGreaterThan => {
      if (isGreaterThan) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }
};

// innerBubbleSortLoop([3,2,1], 0, false, () => {console.log(`in outerBubbleSortLoop`);});
const absurdBubbleSort = function (arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
};

// absurdBubbleSort([3,2,1], arr => {
//   console.log(`${arr}`);
//   reader.close();
// });


Function.prototype.myBind = function myBind (context) {
  // const that = this;
  // return function () {
  //   that.apply(context);
  // };
  return () => {
    this.apply(context);
  };
};
