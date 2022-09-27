const express = require('express');
const app = express();
const { Persons, Places, Things, Souvenirs } = require('./db');

const PORT = 3000;

app.get('/souv/:id', async (req, res) => {
	const souv = await Souvenirs.findByPk(+req.params.id, {
		include: [Persons, Places, Things],
	});
	const person = await souv.getPersons();
	console.log(`Magic methods are in here: ${Object.keys(Souvenirs.prototype)}`);
	res.send(`${souv}`);
});
app.get('/souvOldStyle', async (req, res) => {
	const souv = await Souvenirs.findByPk(1);
	const relPerson = await Persons.findByPk(souv.personId);
	const relThing = await Things.findByPk(souv.thingId);
	const relPlace = await Places.findByPk(souv.placeId);

	res.send(`${relPerson.name} has a 
    ${relThing.name} from ${relPlace.name}.`);
});

app.get('/', async (req, res) => {
	const relPerson = await souv.getPerson();
	const relThing = await souv.getThing();
	const relPlace = await souv.getPlace();
	const people = await Persons.findAll();
	const places = await Places.findAll();
	const things = await Things.findAll();

	const html = `
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
	`;
});

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});
