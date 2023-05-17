import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    this.setHeaderTitle(address);
  }

  setHeaderTitle(title) {
    document.querySelector('header h1').textContent = title;
  }
}

// const url = new URL(location.href);
// const queryParams = url.searchParams;
// const coords = {
//   lat: +queryParams.get('lat'),
//   lng: +queryParams.get('lng'),
// };
// const address = queryParams.get('address');

// new LoadedPlace(coords, address);

// ? optimized by ChatGPT ?
const queryParams = new URLSearchParams(window.location.search);
const lat = +queryParams.get('lat');
const lng = +queryParams.get('lng');
const address = queryParams.get('address');

if (!lat || !lng || !address) {
  window.location.replace('/');
}

new LoadedPlace({ lat, lng }, address);
