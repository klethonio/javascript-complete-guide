import { Map } from './UI/Map';
import { Modal } from './UI/Modal';
import { getAddressFromCoords, searchAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressFrom = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.shareLinkInput = document.getElementById('share-link');
    this.modal = new Modal('loading-modal-content', 'Loading - please wait!');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
    addressFrom.addEventListener('submit', this.finAddressHandler.bind(this));
  }

  async sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.shareLinkInput.select();
      return;
    }

    try {
      await navigator.clipboard.writeText(this.shareLinkInput.value);
      alert('Copied into clipboard!');
    } catch (error) {
      this.shareLinkInput.select();
      console.log(error);
    }
  }

  selectPlace({ lat, lng }, address) {
    if (!this.map) {
      this.map = new Map();
    }

    this.map.render({ lat, lng });

    // about NodeJS module
    fetch('http://localhost:3000/location', {
      method: 'POST',
      body: JSON.stringify({
        address,
        lat,
        lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const locationId = data.locationId;
        this.shareBtn.disabled = false;
        this.shareLinkInput.value = `${
          location.origin
        }/my-place?location_id=${locationId}`;
      });
    // end NodeJS module
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location feature is not available in your browser. Please use a more modern browser or manually enter an address.'
      );
      return;
    }

    this.modal.show();

    navigator.geolocation.getCurrentPosition(
      async (response) => {
        // create another Class to guarantee the latitude and longitude params names
        const coordinates = {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        this.modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        this.modal.hide();
        alert(
          'Could not locate you unfortunately. Prese enter an address manually!'
        );
        console.log(error);
      }
    );
  }

  async finAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value.trim();

    if (!address) {
      alert('Invalid address entered. Please try again!');
      return;
    }

    this.modal.show();

    try {
      const [coordinates, formattedAddress] = await searchAddress(address);
      this.selectPlace(coordinates, formattedAddress);
    } catch (error) {
      alert(error.message);
    }

    this.modal.hide();
  }
}

const placeFinder = new PlaceFinder();

console.log(placeFinder);
