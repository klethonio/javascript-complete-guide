// this two imports
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

// import 'core-js/features/promise';
// you need to install core-js manually, but after that, you can config babel

const button = document.querySelector('button');
const textParagraph = document.querySelector('p');

button.addEventListener('click', () => {
  const text = textParagraph.textContent;
  const promise = new Promise(() => {});
  console.log(promise);

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert('Feature not available, please copy manually!');
  }
});
