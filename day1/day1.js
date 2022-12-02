const fs = require('fs');

const allFileContents = fs.readFileSync('numbers', 'utf-8');

const numberOrArrayOfNumbersArray = [];
// extracting all lines, when finding a line break (\n)
const lines = allFileContents.split(/\r?\n/);
let numbersArray = [];

for (let i = 0; i < lines.length; i++) {
  const previousLine = lines[i - 1];
  const nextLine = lines[i + 1];
  const currentLine = lines[i];

  // first positon
  if (i === 0 && !isNaN(parseInt(currentLine))) {
    if (isNaN(parseInt(nextLine))) {
      numberOrArrayOfNumbersArray.push(parseInt(currentLine));
    } else {
      numbersArray.push(parseInt(currentLine));
    }

    continue;
  }

  // last position
  if (i === lines.length - 1 && !isNaN(parseInt(currentLine))) {
    if (isNaN(parseInt(previousLine))) {
      numberOrArrayOfNumbersArray.push(parseInt(currentLine));
    } else {
      numbersArray.push(parseInt(currentLine));
      numberOrArrayOfNumbersArray.push(numbersArray);
    }

    continue;
  }

  // TODO: skip current iteration if current line is empty
  if (isNaN(currentLine)) {
    continue;
  }

  if (isNaN(parseInt(previousLine)) && isNaN(parseInt(nextLine))) {
    // currentLine is a number not part of a sequence
    // we can push it as is in numberOrArrayOfNumbersArray
    numberOrArrayOfNumbersArray.push(parseInt(currentLine));
  } else if (isNaN(parseInt(previousLine)) && !isNaN(parseInt(nextLine))) {
    numbersArray = [];
    numbersArray.push(parseInt(currentLine));
  } else if (!isNaN(parseInt(previousLine)) && !isNaN(parseInt(nextLine))) {
    numbersArray.push(parseInt(currentLine));
  } else if (!isNaN(parseInt(previousLine)) && isNaN(parseInt(nextLine))) {
    numbersArray.push(parseInt(currentLine));
    numberOrArrayOfNumbersArray.push(numbersArray);
  }
}

const sumsArray = [];
for (let i = 0; i < numberOrArrayOfNumbersArray.length; i++) {
  if (numberOrArrayOfNumbersArray[i].length > 1) {
    const initialValue = 0;
    const sum = numberOrArrayOfNumbersArray[i]
      .filter((currentNumber) => !isNaN(currentNumber))
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
    sumsArray.push(sum);
  } else sumsArray.push(numberOrArrayOfNumbersArray[i]);
}
console.log(sumsArray.length);
console.log(Math.max(...sumsArray));

// Premier max
const max1 = Math.max(...sumsArray);
console.log(max1, 'max1');
sumsArray.splice(sumsArray.indexOf(max1), 1);
console.log(sumsArray.length);
// 2eme max
const max2 = Math.max(...sumsArray);
console.log(max2, 'max2');
sumsArray.splice(sumsArray.indexOf(max2), 1);
console.log(sumsArray.length);
// 3eme max
const max3 = Math.max(...sumsArray);
console.log(max3, 'max3');
sumsArray.splice(sumsArray.indexOf(max3), 1);
console.log(sumsArray.length);
// 3eme max
const max4 = Math.max(...sumsArray);
console.log(max4, 'max4');
sumsArray.splice(sumsArray.indexOf(max4), 1);
console.log(sumsArray.length);

// Somme des 3 max
const sumOfMax1Max2Max3 = max1 + max2 + max4;
console.log(sumOfMax1Max2Max3);
