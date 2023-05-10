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

const queryParams = new URLSearchParams(window.location.search);
const locationId = queryParams.get('location_id');

if (!locationId) {
  window.location.replace('/');
}

// about NodeJS module
// fetch('http://localhost:3000/location/' + locationId)
//   .then(async (response) => {
//     if (response.status === 404) {
//       const res = await response.json();
//       throw new Error(res.message || 'Location not found');
//     }
//     return response.json();
//   })
//   .then((data) => {
//     new LoadedPlace(data.coordinates, data.address);
//   })
//   .catch((err) => {
//     alert('Error: ' + err.message);
//     window.location.replace('/');
//   });

(async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/location/${locationId}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Location not found');
    }

    new LoadedPlace(data.coordinates, data.address);
  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
    window.location.replace('/');
  }
})();
// end NodeJS module
