const arr = [1, 2, 1, 3, 4, 1, 2, 5];

function mostRepeatedElements(arr) {
  const map = new Map();

  for (let e of arr) {
    map.set(e, (map.get(e) ?? 0) + 1);
  }

  let maxObj = { key: null, max: -1 };
  map.forEach((val, key) => {
    if (val > maxObj.max) {
      maxObj.max = val;
      maxObj.key = key;
    }
  });

  return maxObj.key;
}

console.log(mostRepeatedElements(arr));
