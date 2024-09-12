function Mission1(numbers) {
  const evenNumbers = numbers.filter((num) => num % 2 === 0);
  return evenNumbers;
}

function Mission2(str) {
  const sumWordWith4 = str.split(" ").filter((word) => word.length == 4);
  return sumWordWith4.length;
}

function Mission3(mat) {
  const arr = mat.flat();
  return arr;
}

function Mission5(keysArray, valuesArray) {
  let result = {};

  for (let i = 0; i < keysArray.length; i++) {
    result[keysArray[i]] = valuesArray[i];
  }

  return result;
}
