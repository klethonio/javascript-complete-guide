const button = document.querySelector('button');

const buttonClickHadler = (event) => {
  // event.target.disabled = true;
  console.log(event);
};

// the major problem of using this is that you can only add one function
// you can create one function that hadle two, it'd be difficult to work with
// also it'd be difficult impossible to remove one function from the listner
// button.onclick = buttonClickHadler;

button.addEventListener('click', buttonClickHadler);

// setTimeout(() => button.removeEventListener('click', buttonClickHadler), 2000);

// button.addEventListener('click', () => {
//   alert('Another success!');
// });

// // won't work!
// setTimeout(() => button.removeEventListener('click'), 5000);

// // if you want to bind sth, you need to storage the function so you can remove it later
// const boundFunction = buttonClickHadler.bind(this);

// setTimeout(() => {
//   button.addEventListener('click', boundFunction);

//   setTimeout(() => button.removeEventListener('click', boundFunction), 5000);
// }, 2000);

// just joking
const buttonMouseEnterHadler = buttonClickHadler;

// button.addEventListener('mouseenter', buttonMouseEnterHadler);

// window.addEventListener('scroll', event => {
//   console.log(event);
// });

let curElementNumber = 0;

function scrollHandler() {
  const distanceToBottom = document.body.getBoundingClientRect().bottom;

  if (distanceToBottom < document.documentElement.clientHeight + 150) {
    const newDataElement = document.createElement('div');
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

window.addEventListener('scroll', scrollHandler);

const form = document.querySelector('form');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   console.log(event);
// });

// interesting fact: if you lose the param event, you can access by using event var
form.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector('div');

// this event goes last by default
// if you set the second param to true, it goes first!
div.addEventListener('click', (event) => {
  console.log('EVENT DIV');
});

button.addEventListener('click', (event) => {
  // if the listner above is set to capturing, this will not stop its execution
  event.stopPropagation();
  // this here stops listeners of the own element
  // but in this case you sould put it in the first function added in the listener
  event.stopImmediatePropagation();
  console.log('EVENT BUTTON');
});

const listItems = document.querySelectorAll('li');

// listItems.forEach((listItem) => {
//   listItem.addEventListener('click', (event) => {
//     event.target.classList.toggle('highlighted');
//   });
// });

const list = document.querySelector('ul');

list.addEventListener('click', function (event) {
  // target is the element clicked and currentTarget is the element of the listener
  // console.log(event.currentTarget, event.target);

  // event.currentTarget.querySelector('li').classList.toggle('highlighted');
  event.target.closest('li').classList.toggle('highlighted');

  form.querySelector('button').submit();
  // this below doesn't trigger the event listener created before to the form
  // form.submit();

  // its binded to the currentTarget, therefor the ul in this case
  console.log(this);
});
