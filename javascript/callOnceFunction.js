function once(cb) {
  let called = false;

  return function (...args) {
    if (!called) {
      called = true;
      return cb.apply(this, args);
    }
  };
}

const init = once(() => {
  console.log("Initialized");
  return 42;
});

console.log(init()); // "Initialized \n 42"
console.log(init()); // undefined
console.log(init()); // undefined
