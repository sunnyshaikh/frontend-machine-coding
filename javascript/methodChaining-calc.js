/* // method 1: Function constructor
function Calculator() {
  this.sum = 0;
}

Calculator.prototype.add = function (num) {
  this.sum += num;
  return this;
};

Calculator.prototype.subtract = function (num) {
  this.sum -= num;
  return this;
};

Calculator.prototype.multiply = function (num) {
  this.sum *= num;
  return this;
};

Calculator.prototype.result = function () {
  return this.sum;
};

console.log(new Calculator().add(10).multiply(5).subtract(10).result());
*/

/* // method 2: Class
class Calculator {
  #sum = 0;

  add(num) {
    this.#sum += num;
    return this;
  }
  subtract(num) {
    this.#sum -= num;
    return this;
  }
  multiply(num) {
    this.#sum *= num;
    return this;
  }
  result() {
    return this.#sum;
  }
}

console.log(new Calculator().add(10).multiply(5).subtract(10).result());
*/

// method 3: Factory function
function calculator() {
  let sum = 0;

  return {
    add(num) {
      sum += num;
      return this;
    },
    subtract(num) {
      sum -= num;
      return this;
    },
    multiply(num) {
      sum *= num;
      return this;
    },
    result() {
      return sum;
    },
  };
}

console.log(calculator().add(10).multiply(5).subtract(10).result());
