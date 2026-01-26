function constructObject(str) {
  const [path, val] = str.split("=");
  const pathArr = path.split(".");
  let obj = val;
  for (let i = pathArr.length - 1; i >= 0; i--) {
    obj = { [pathArr[i]]: obj };
  }
  return obj;
}

console.log(constructObject("a.b.c=10"));

// "a.b.c=10" → { a: { b: { c: 10 }}}
