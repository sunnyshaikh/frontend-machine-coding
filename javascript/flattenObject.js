const input = {
  a: [1, 2],
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};

const flattenObject = (obj, prefix = "") => {
  let res = {};

  for (let key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // res = { ...res, ...flattenObject(obj[key], newKey) };
      Object.assign(res, flattenObject(obj[key], newKey)); // better
    } else {
      res[newKey] = obj[key];
    }
  }

  return res;
};

console.log(flattenObject(input));

/*
Output:
{
  "a": 1,
  "b.c": 2,
  "b.d.e": 3
}
*/
