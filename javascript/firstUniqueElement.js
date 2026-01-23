const arr = [1, 2, 3, 4, 1, 2, 5];

function firstUnique(arr) {
  const map = arr.reduce(
    (map, n) => map.set(n, (map.get(n) || 0) + 1),
    new Map(),
  );

  for (let [key, value] of map.entries()) {
    if (value === 1) return key;
  }
  return null;
}

console.log(firstUnique(arr));
