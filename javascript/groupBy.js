// Object.groupBy() polyfill

function myGroupBy(arr, cb) {
  const result = Object.create(null);
  for (let item of arr) {
    const key = cb(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }

  return result;
}

const inventory = [
  { name: "asparagus", type: "vegetables", quantity: 9 },
  { name: "bananas", type: "fruit", quantity: 5 },
  { name: "goat", type: "meat", quantity: 23 },
  { name: "cherries", type: "fruit", quantity: 12 },
  { name: "fish", type: "meat", quantity: 22 },
];

const result = myGroupBy(inventory, ({ type }) => type);

console.log(result);

// output
/*
{
  vegetables: [ { name: 'asparagus', type: 'vegetables', quantity: 9 } ],
  fruit: [
    { name: 'bananas', type: 'fruit', quantity: 5 },
    { name: 'cherries', type: 'fruit', quantity: 12 }
  ],
  meat: [
    { name: 'goat', type: 'meat', quantity: 23 },
    { name: 'fish', type: 'meat', quantity: 22 }
  ]
}
*/
