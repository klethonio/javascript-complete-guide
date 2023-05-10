const costumers = ['Max', 'Manuel', 'Anna'];
const activeCostumers = ['Max', 'Manuel'];

const inactiveCustomers = _.difference(costumers, activeCostumers);

console.log(inactiveCustomers);