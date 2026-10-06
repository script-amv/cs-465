const Trip = require('../models/travlr');
const tripFields = ['code', 'name', 'length', 'start', 'resort', 'perPerson', 'image', 'description'];

function tripPayload(body) {
  return Object.fromEntries(tripFields.filter(field => body?.[field] !== undefined)
    .map(field => [field, body[field]]));
}

function tripCode(param) {
  const code = String(param || '').toUpperCase();
  return /^[A-Z]{2}\d{3}$/.test(code) ? code : null;
}

function writeError(res, error) {
  if (error.code === 11000) return res.status(409).json({ message: 'Trip code already exists.' });
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: error.message });
  }
  console.error('Unable to save trip:', error);
  return res.status(500).json({ message: 'Unable to save trip.' });
}

async function tripsList(req, res) {
  try {
    const trips = await Trip.find().sort({ start: 1 }).lean();
    if (!trips.length) return res.status(404).json({ message: 'No trips found.' });
    return res.status(200).json(trips);
  } catch (error) {
    console.error('Unable to retrieve trips:', error);
    return res.status(500).json({ message: 'Unable to retrieve trips.' });
  }
}

async function tripsFindByCode(req, res) {
  const code = tripCode(req.params.tripCode);
  if (!code) {
    return res.status(400).json({ message: 'Invalid trip code.' });
  }

  try {
    const trips = await Trip.find({ code }).limit(1).lean();
    if (!trips.length) return res.status(404).json({ message: 'Trip not found.' });
    return res.status(200).json(trips[0]);
  } catch (error) {
    console.error('Unable to retrieve trip:', error);
    return res.status(500).json({ message: 'Unable to retrieve trip.' });
  }
}

async function tripsAddTrip(req, res) {
  try {
    const trip = await Trip.create(tripPayload(req.body));
    return res.status(201).json(trip);
  } catch (error) {
    return writeError(res, error);
  }
}

async function tripsUpdateTrip(req, res) {
  const code = tripCode(req.params.tripCode);
  if (!code) return res.status(400).json({ message: 'Invalid trip code.' });

  try {
    const trip = await Trip.findOne({ code });
    if (!trip) return res.status(404).json({ message: 'Trip not found.' });
    trip.set(tripPayload(req.body));
    await trip.save();
    return res.status(200).json(trip);
  } catch (error) {
    return writeError(res, error);
  }
}

async function tripsDeleteTrip(req, res) {
  const code = tripCode(req.params.tripCode);
  if (!code) return res.status(400).json({ message: 'Invalid trip code.' });

  try {
    const trip = await Trip.findOneAndDelete({ code });
    if (!trip) return res.status(404).json({ message: 'Trip not found.' });
    return res.status(204).end();
  } catch (error) {
    console.error('Unable to delete trip:', error);
    return res.status(500).json({ message: 'Unable to delete trip.' });
  }
}

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip, tripsDeleteTrip };
