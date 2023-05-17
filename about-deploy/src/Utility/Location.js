const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';

async function geocodeUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Google Maps API. Please try again!');
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  return data;
}

export async function getAddressFromCoords(coords) {
  const data = await geocodeUrl(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
  );

  return data.results[0].formatted_address;
}

export async function searchAddress(address) {
  const data = await geocodeUrl(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
  );

  return [data.results[0].geometry.location, data.results[0].formatted_address];
}
