const memo = (cb) => {
  const map = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (map.has(key)) return map.get(key);
    const res = cb.apply(this || {}, args);
    map.set(key, res);
    return res;
  };
};

const sum = (n1, n2) => {
  for (let i = 0; i < 1000000000; i++);
  return n1 + n2;
};

const memoSum = memo(sum);

console.time("first");
const res = memoSum(10, 20);
console.log("res", res);
console.timeEnd("first");

console.time("second");
const res1 = memoSum(10, 20);
console.log("res1", res1);
console.timeEnd("second");
