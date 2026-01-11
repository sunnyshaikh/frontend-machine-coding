function sumFn(a) {
  return function (b) {
    if (b === undefined) return a;
    return sumFn(a + b);
  };
}

console.log(sumFn(10)(20)(30)(40)());
