const input1 = "()[]{}";
const input2 = "(]";
const input3 = "([{}])";
const input4 = "(((";
const input5 = "}";

function valid(input) {
  const stack = [];

  for (let c of input) {
    switch (c) {
      case "(":
      case "{":
      case "[":
        stack.push(c);
        break;

      case ")":
        if (stack.at(-1) === "(") stack.pop();
        else return false;
        break;

      case "}":
        if (stack.at(-1) === "{") stack.pop();
        else return false;
        break;

      case "]":
        if (stack.at(-1) === "[") stack.pop();
        else return false;
        break;
    }
  }

  return stack.length === 0;
}

console.log(valid(input1));
console.log(valid(input2));
console.log(valid(input3));
console.log(valid(input4));
console.log(valid(input5));
