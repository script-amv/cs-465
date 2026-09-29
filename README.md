# Travlr Getaways

Module Five Express, Mongoose, MongoDB, and REST API application.

## Run the site

1. Install dependencies with `npm install`.
2. Start MongoDB and load the sample trips with `npm run seed`.
3. Start the server with `npm start`.
4. Open `http://localhost:3000/travel` in a browser.

The `/travel` controller requests trip JSON from the REST API, then passes it to the Handlebars view. The view uses `{{#each trips}}` to render each trip with shared header and footer. Old `/travel.html` links redirect to `/travel`.

The database module is at `app_api/models/db.js`. It connects through `DB_URI`, or uses `mongodb://127.0.0.1:27017/travlr` by default. The Trip schema is in `app_api/models/travlr.js` and requires a code, name, length, start date, resort, price, image, and description. `GET /api/trips` returns all stored trips as JSON. `GET /api/trips/:tripCode` returns one trip by code (for example, `/api/trips/GR001`). Missing trips return 404 and malformed codes return 400. Seed the `trips` collection with `npm run seed` after MongoDB is running. Run `npm run inspect-db` to print the collection count and records.

Run `npm test` for integration tests using a temporary MongoDB. Run `npm run test:postman` to run the supplied Postman collection through Newman against a temporary MongoDB. Other pages and assets remain in `public/` for this course stage.
