const express = require('express');
const app = express();
const { Persons, Places, Things, Souvenirs } = require('./db');

const PORT = 3000;

app.get('/', async (req, res) => {
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
					`<li>${souv.person.name} purchased a ${souv.thing.name} in ${souv.place.name}.</li>`
			)
			.join('')}
	</ul>
	</body>
	`;
	res.send(html);
});

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`);
});
