const Trip = require('../models/travlr');

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
  const code = req.params.tripCode.toUpperCase();
  if (!/^[A-Z]{2}\d{3}$/.test(code)) {
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

module.exports = { tripsList, tripsFindByCode };
