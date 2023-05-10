const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const openModalButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelModalButton = addMovieModal.querySelector('.btn--passive');
const addModalButton = cancelModalButton.nextElementSibling;
const cancelDeletionModalButton =
  deleteMovieModal.querySelector('.btn--passive');
let confirmDeletionModalButton = cancelDeletionModalButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    // entryTextSection.style.display = 'block';
    // movieList.parentElement.insertBefore(entryTextSection, movieList);
    movieList.replaceWith(entryTextSection);
  } else if (entryTextSection.parentElement === movieList.parentElement) {
    // entryTextSection.style.display = 'none';
    // entryTextSection.parentElement.removeChild(entryTextSection);
    entryTextSection.replaceWith(movieList);
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const hideMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const hideMovieDeletionModal = () => {
  deleteMovieModal.classList.remove('visible');
};

const clearModalInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const cancelModal = () => {
  toggleBackdrop();
  hideMovieModal();
  hideMovieDeletionModal();
  clearModalInputs();
};

const addModalHandler = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();

  cancelModalButton.addEventListener('click', cancelModalHadler);
  addModalButton.addEventListener('click', addMovieHadler);
};

const cancelModalHadler = () => {
  cancelModal();
};

const deleteMovieHadler = (id) => {
  let index = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    index++;
  }

  movies.splice(index, 1);
  movieList.removeChild(movieList.children[index]);
  // movieList.remove(); // more modern approach

  cancelModal();
  updateUI();
};

const confirmDeletionMovieHadler = (id) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();

  cancelDeletionModalButton.removeEventListener('click', cancelModalHadler);
  // will not work
  // confirmDeletionModalButton.addEventListener('click', deleteMovieHadler.bind(null, id));
  confirmDeletionModalButton.replaceWith(
    confirmDeletionModalButton.cloneNode(true)
  );
  confirmDeletionModalButton = cancelDeletionModalButton.nextElementSibling;

  cancelDeletionModalButton.addEventListener('click', cancelModalHadler);
  confirmDeletionModalButton.addEventListener(
    'click',
    deleteMovieHadler.bind(null, id)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.classList.add('movie-element');
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" title="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener(
    'click',
    confirmDeletionMovieHadler.bind(null, id)
  );
  movieList.appendChild(newMovieElement);
};

const addMovieHadler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue === '' ||
    ratingValue === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);

  console.log(movies);

  cancelModal();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.imageUrl,
    newMovie.rating
  );
};

openModalButton.addEventListener('click', addModalHandler);
backdrop.addEventListener('click', cancelModalHadler);
