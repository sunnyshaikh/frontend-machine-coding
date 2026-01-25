function debounce(cb, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
}

const log = debounce(() => console.log("Hello"), 300);

log();
log();
log();
