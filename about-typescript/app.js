"use strict";
// class User {
//   name: string;
//   private age: number;
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    print() {
        console.log(this.name);
    }
}
class Admin extends User {
    constructor(name, age, permissions) {
        super(name, age);
        this.permissions = permissions;
    }
}
const user = new User('Dikaii', 29);
console.log(user.name);
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const btnElement = document.querySelector('button');
function add(a, b) {
    return a + b;
}
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
function printText(text, printMode) {
    if (printMode === OutputMode.CONSOLE) {
        console.log(text);
    }
    else if (printMode === OutputMode.ALERT) {
        alert(text);
    }
}
// const results: CalculationResults = [];
// const results: CalculationContainer[] = [];
const results = [];
const names = ['Dikaii']; // TS assumes the type of data here
btnElement.addEventListener('click', () => {
    const num1 = +num1Input.value;
    const num2 = +num2Input.value;
    const result = add(num1, num2);
    const resultContainer = {
        res: result,
        print() {
            console.log(this.res);
        },
    };
    results.push(resultContainer);
    // results.push(5);
    // printText(results);
    // results[0].print();
    printText(result, OutputMode.CONSOLE);
    printText(result, OutputMode.ALERT);
});
function logAndEcho(val) {
    console.log(val);
    return val;
}
logAndEcho('Hi there!').split(' ');
