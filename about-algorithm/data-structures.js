const age = [30, 29, 54];

// [30, 29, 54] => [30, 29, 54, _]
// [{0}, {1}, {2}] => [{0}, {1}, {2}, {3}]
age.push(60); // Constant Time Complexity => O(1)

// [30, 29, 54] => [_, 30, 29, 54]
// [{0}, {1}, {2}] => [{0}, {1=>30}, {2=>29}, {3=>54}]
age.unshift(60); // Constant Time Complexity => O(n)

const myAge = age[1]; // Constant Time Complexity => O(1)

const namePopularity = [
  {
    userName: 'Klethonio',
    usages: 5,
  },
  {
    userName: 'Dikaii',
    usages: 13,
  },
];

const dikaiiUsages = namePopularity.find(pers => pers.userName === 'Dikaii').usages;
// BEST CASE: Constant Time Complexity => O(1)
// WORST CASE: Liner Time Complexity => O(n)
// AVERAGE CASE: Liner Time Complexity => O(n)

const nameMap = {
  'Klethonio': 5,
  'Dikaii': 13,
}

const dikaiiUsages2 = nameMap['Klethonio']; // Constant Time Complexity => O(1)

// const nameRealMap = new Map();