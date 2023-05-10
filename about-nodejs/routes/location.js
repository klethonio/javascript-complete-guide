const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();

// mongo user:password
const url =
  'mongodb+srv://user:password@cluster0.s1tqtno.mongodb.net/locations?retryWrites=true&w=majority';

const client = new MongoClient(url);

// It was used in a previous lecture
// const locationStorage = {
//   locations: [],
// };

router.post('/location', (req, res, next) => {
  client
    .connect()
    .then(() => {
      console.log('Connected correctly to server');
      const db = client.db('locations');

      // Insert a single location
      db.collection('user-locations')
        .insertOne({
          address: req.body.address,
          coords: { lat: req.body.lat, lng: req.body.lng },
        })
        .then((r) => {
          res.json({
            message: 'Location stored successfully',
            locationId: r.insertedId,
          });
        })
        .catch((err) => {
          console.error('Failed to store location', err);
        });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
    });

  // const id = Math.random();
  // locationStorage.locations.push({
  //   id: id,
  //   address: req.body.address,
  //   coords: { lat: req.body.lat, lng: req.body.lng },
  // });
  // res.json({ message: 'Stored location!', locationId: id });
});

router.get('/location/:locationId', async (req, res, next) => {
  let locationId;
  try {
    locationId = new ObjectId(req.params.locationId);
  } catch (err) {
    // return to make sure the other code does not execute
    return res.status(500).json({ message: err.message });
  }

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const db = client.db('locations');

    // Find a single location
    try {
      const loc = await db
        .collection('user-locations')
        .findOne({ _id: new ObjectId(locationId) });

      if (!loc) {
        return res.status(404).json({ message: 'Location not found' });
      }

      res.json({ address: loc.address, coordinates: loc.coords });
    } catch (err) {
      console.error('Failed to fetch location', err);
      res.status(404).json({ message: 'Failed to fetch location' });
    }
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }

  // const locationId = +req.params.locationId;
  // const location = locationStorage.locations.find(
  //   (location) => location.id === locationId
  // );
  // if (!location) {
  //   return res.status(404).json({ message: 'Location not found' });
  // }
  // res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
