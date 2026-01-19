const chunk = (arr, size = 1) => {
  if (size <= 0) throw new Error("Size must be greater than 0");
  let res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
};

try {
  console.log(chunk([1, 2, 3, 4, 5], 2));
} catch (e) {
  console.log(e.message);
}
// output - [[1, 2], [3, 4], [5]]
