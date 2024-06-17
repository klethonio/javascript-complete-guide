// class User {
//   name: string;
//   private age: number;

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }

interface Greetable {
  name: string;
}

interface Printable {
  print(): void;
}

class User implements Greetable, Printable {
  constructor(public name: string, private age: number) {}

  print() {
    console.log(this.name);
  }
}

class Admin extends User {
  constructor(name: string, age: number, private permissions: string[]) {
    super(name, age);
  }
}

const user = new User('Dikaii', 29);
console.log(user.name);

const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const btnElement = document.querySelector('button')!;

function add(a: number, b: number) {
  return a + b;
}

type PrintMode = 'console' | 'alert';
enum OutputMode {
  CONSOLE,
  ALERT,
}

function printText(text: string | number, printMode: OutputMode) {
  if (printMode === OutputMode.CONSOLE) {
    console.log(text);
  } else if (printMode === OutputMode.ALERT) {
    alert(text);
  }
}

interface CalculationContainer {
  res: number;
  print(): void;
  // print: () => void;
}

type CalculationResults = CalculationContainer[];

// const results: CalculationResults = [];
// const results: CalculationContainer[] = [];
const results: Array<CalculationContainer> = [];
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

function logAndEcho<T>(val: T) {
  console.log(val);
  return val;
}

logAndEcho<string>('Hi there!').split(' ');

