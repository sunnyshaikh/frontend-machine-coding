function debounce(cb, delay = 300, immediate = false) {
  let timer = null;

  return function (...args) {
    const context = this;
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null; // reset after delay
      if (!immediate) {
        cb.apply(context, args);
      }
    }, delay);

    if (callNow) {
      cb.apply(context, args);
    }
  };
}

const log = debounce(() => console.log("fire"), 300, true);

log();
log();
log();
