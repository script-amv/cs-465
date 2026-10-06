# Travlr Getaways

Module Six Travlr Getaways customer website and Angular admin SPA.

## Run the site

1. Install dependencies with `npm install`.
2. Start MongoDB and load the sample trips with `npm run seed`.
3. Start the server with `npm start`.
4. In a second terminal, run `cd app_admin`, `npm install`, and `npm start` with Node 20.
5. Open `http://localhost:3000/travel` for the public site and `http://localhost:4200` for the admin SPA.

For a quick local demo without a separate MongoDB installation, run `npm run demo` in the project folder instead of steps 2 and 3. It starts a temporary seeded database and the Express server. The demo database is cleared when the process stops. Keep the Express and Angular terminals running at the same time.

The `/travel` controller requests trip JSON from the REST API, then passes it to the Handlebars view. The view uses `{{#each trips}}` to render each trip with shared header and footer. Old `/travel.html` links redirect to `/travel`.

The database module is at `app_api/models/db.js`. It connects through `DB_URI`, or uses `mongodb://127.0.0.1:27017/travlr` by default. The Trip schema is in `app_api/models/travlr.js` and requires a code, name, length, start date, resort, price, image, and description. The API supports `GET /api/trips`, `GET /api/trips/:tripCode`, `POST /api/trips`, `PUT /api/trips/:tripCode`, and `DELETE /api/trips/:tripCode`. The Angular trip data service uses these routes for listing, adding, editing, and deleting trips. Missing trips return 404, malformed codes return 400, invalid trip data returns 400, and duplicate codes return 409. Seed the `trips` collection with `npm run seed` after MongoDB is running. Run `npm run inspect-db` to print the collection count and records.

Run `npm test` for integration tests using a temporary MongoDB. Run `npm run test:postman` to run the Module Six Postman collection through Newman against a temporary MongoDB. Run `npm run build` inside `app_admin` to check the Angular application. Node 20 and Angular 18 are used for this course project.
