const arr = [1, [2, 3], [4, [5]], 6];

function arrayFlat(arr, depth = 1) {
  let res = [];
  for (let e of arr) {
    if (Array.isArray(e) && depth > 0) {
      res.push(...arrayFlat(e, depth - 1));
    } else {
      res.push(e);
    }
  }
  return res;
}

console.log(arrayFlat(arr));
console.log(arrayFlat(arr, 0));
console.log(arrayFlat(arr, 1));
console.log(arrayFlat(arr, Infinity));

/* // output
  [ 1, 2, 3, 4, [ 5 ], 6 ]
  [ 1, [ 2, 3 ], [ 4, [ 5 ] ], 6 ]
  [ 1, 2, 3, 4, [ 5 ], 6 ]
  [ 1, 2, 3, 4, 5, 6 ]
*/
