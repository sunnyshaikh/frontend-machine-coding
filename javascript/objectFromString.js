function constructObject(str) {
  const [path, val] = str.split("=");
  const pathArr = path.split(".");

  // version 1 - for loop
  // let obj = val;
  // for (let i = pathArr.length - 1; i >= 0; i--) {
  //   obj = { [pathArr[i]]: obj };
  // }

  // return obj

  // version 2 - reduce right
  return pathArr.reduceRight((acc, curr) => ({ [curr]: acc }), val);
}

console.log(constructObject("a.b.c=10"));

// "a.b.c=10" → { a: { b: { c: 10 }}}
