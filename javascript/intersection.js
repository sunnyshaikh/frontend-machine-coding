const one = [1, 2, 3, 4, 5];
const two = [1, 7, 3, 4, 8, 9, 10, 5];

function intersection(arr1, arr2) {
  let intersect = [];

  // for (n of arr1) {
  //   if (arr2.includes(n)) intersect.push(n);
  // }

  const set1 = new Set(arr1);

  for (n of arr2) {
    if (set1.has(n)) intersect.push(n);
  }

  return intersect;
}

console.log(intersection(one, two));
