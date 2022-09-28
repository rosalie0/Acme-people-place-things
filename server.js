const express = require('express');

const app = express();

// Volleyball Middleware
const volleyball = require('volleyball');
app.use(volleyball);

// Static Middleware
const path = require('path');
// eslint-disable-next-line no-undef
const staticMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticMiddleware);

// Body Parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database imports
const { Persons, Places, Things, Souvenirs } = require('./db');

// Method Override
// To allow DELETE reqest from an html form
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Deletes souv of given ID, uses method-override, from form:
// 	<form method='POST' action='/${souv.id}?_method=DELETE'>
app.delete('/:id', async (req, res, next) => {
	try {
		const id = +req.params.id;
		const foundSouv = await Souvenirs.findByPk(id); // Find it
		await foundSouv.destroy(); // Delete it
		res.redirect('/');
	} catch (err) {
		next(err);
	}
});

// Creates new souv with user-submitted POST
app.post('/', async (req, res, next) => {
	try {
		await Souvenirs.create(req.body);
		res.redirect('/');
	} catch (err) {
		next(err);
	}
});

app.get('/', async (req, res, next) => {
	try {
		const people = await Persons.findAll();
		const places = await Places.findAll();
		const things = await Things.findAll();

		// Use include: so we can do souv.person.name
		const souvs = await Souvenirs.findAll({
			include: [Persons, Things, Places],
		});
		const html = `
			<body>
				<h1>Acme People, Places, and Things</h1>
				<h2>People</h2>
				<ul>
						${people.map((person) => `<li>${person.name}</li>`).join('')}
				</ul>
				<h2>Places</h2>
				<ul>
						${places.map((place) => `<li>${place.name}</li>`).join('')}
				</ul>
				<h2>Things</h2>
				<ul>
						${things.map((thing) => `<li>${thing.name}</li>`).join('')}
				</ul>
				<h2> Souvenir Purchases </h2>
				<ul>
					${souvs
						.map(
							(souv) =>
								`<li>${souv.person.name} purchased a ${souv.thing.name} in ${souv.place.name}.
								<form method='POST' action='/${souv.id}?_method=DELETE'>
                <button> Delete </button>
              	</form>
								</li>`
						)
						.join('')}
				</ul>
				<a href="/purchase"> Purchase a souvenir? </a>
			</body>
		`;
		res.send(html);
	} catch (err) {
		next(err);
	}
});

// Give them a form to fill out for new souv purchase
// Drop down menu for each 'person' 'place' 'thing' selection
app.get('/purchase', async (req, res, next) => {
	try {
		const people = await Persons.findAll();
		const places = await Places.findAll();
		const things = await Things.findAll();
		res.send(`
		<form method='POST' action="/">
            <select name='personId'>
              ${people
								.map(
									(person) => `
                    <option value=${person.id}>
                      ${person.name}
                    </option>
                  `
								)
								.join('')}
            </select>

            <select name='placeId'>
              ${places
								.map(
									(place) => `
                    <option value=${place.id}>
                      ${place.name}
                    </option>
                  `
								)
								.join('')}
            </select>

            <select name='thingId'>
									${things.map(
										(thing) => `
									<option value=${thing.id}>
										${thing.name}
									</option>`
									)}
						</select>

            <button>Purchase</button>
          </form>`);
	} catch (err) {
		next(err);
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});
