const express = require('express');
const app = express();

// Import Databases
const { Persons, Places, Things, Souvenirs } = require('./db');

// Import Viewsg
const listEverything = require('./views/listEverything');
const purchaseForm = require('./views/purchaseForm');

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

// Method Override: Allows DELETE reqest from an html form
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
		const html = listEverything(people, places, things, souvs);
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
		const html = purchaseForm(people, places, things);
		res.send(html);
	} catch (err) {
		next(err);
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});
