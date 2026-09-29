async function travel(req, res) {
  const endpoint = `http://127.0.0.1:${req.socket.localPort}/api/trips`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    const trips = response.ok && Array.isArray(data) ? data : [];
    const message = response.status === 404
      ? 'No trips are available right now.'
      : response.ok ? null : 'Trips could not be loaded right now.';

    if (!response.ok && response.status !== 404) res.status(503);
    return res.render('travel', { title: 'Travel | Travlr Getaways', trips, message });
  } catch (error) {
    console.error('Unable to load trips for the travel page:', error);
    return res.status(503).render('travel', {
      title: 'Travel | Travlr Getaways',
      trips: [],
      message: 'Trips could not be loaded right now.',
    });
  }
}

module.exports = { travel };
