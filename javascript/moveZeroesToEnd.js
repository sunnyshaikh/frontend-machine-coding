function moveZeroes(arr) {
  let pos = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[pos++] = arr[i];
    }
  }
  while (pos < arr.length) {
    arr[pos++] = 0;
  }

  return arr;
}

console.log(moveZeroes([0, 1, 0, 3, 12]));
