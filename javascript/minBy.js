function minBy(arr, cb) {
  if (typeof cb !== "function") return undefined;

  let min = Infinity;
  let minEle = undefined;

  for (let e of arr) {
    const res = cb(e);
    if (res === undefined) return undefined;
    if (res < min) {
      min = res;
      minEle = e;
    }
  }
  return minEle;
}

console.log(minBy([2, 1, 3, 4, 5], (num) => num)); // 1
console.log(minBy([{ n: 2 }, { n: 1 }, { n: 4 }], (obj) => obj.n)); // { n: 1 }
console.log(minBy([{ n: 2 }, { n: 1 }], (obj) => obj.m)); // undefined
