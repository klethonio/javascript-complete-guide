const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

const renderMovies = (filter = null) => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }

  // 1 - try to take a different aproach here, like previous module
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) =>
        movie.info.title.toLowerCase().includes(filter.toLowerCase())
      );

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie;
    // const { title: movieTitle } = info;
    let { getFormmatedTitle } = movie; // it throws an error (this = window)
    // getFormmatedTitle = getFormmatedTitle.bind(movie);
    // let text = getFormmatedTitle() + ' - ';
    // let text = movie.getFormmatedTitle() + ' - ';
    let text = getFormmatedTitle.call(movie) + ' - ';

    // obs
    // if (!('info' in movie)) {}
    // if (movie.info === undefined) {}
    Object.defineProperties(info, {
      title: {
        enumerable: false
      },
      _title: {
        enumerable: false
      }
    });
    for (const key in info) {
      // replaced by the method above
      // if (key !== 'title' && key !== '_title') {
      //   text += `${key}: ${info[key]}`;
      // }
      text += `${key}: ${info[key]}`;
    }

    movieEl.textContent = text;
    movieList.appendChild(movieEl);
  });
};

const addMovieHadler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (extraName.trim() === '' || extraValue.trim() === '') {
    alert('Fill in all the inputs');
    return;
  }

  const newMovie = {
    info: {
      set title(value) {
        if (value.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = value;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    // if you intend to use this, don't use arrow function
    getFormmatedTitle() {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  console.log(newMovie);

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHadler = () => {
  const filter = document.getElementById('filter-title').value;

  renderMovies(filter);
};

addMovieBtn.addEventListener('click', addMovieHadler);
searchBtn.addEventListener('click', searchMovieHadler);
