const { db, Persons, Places, Things, Souvenirs } = require('./db');

const seedDB = async () => {
	await db.sync({ force: true, logging: false });

	// Basic three table seeding
	const people = [
		{ name: 'moe' },
		{ name: 'larry' },
		{ name: 'lucy' },
		{ name: 'ethyl' },
	];
	let Promises = people.map((person) => Person.create(person));
	Promise.all(Promises);
	const places = [
		{ name: 'paris' },
		{ name: 'nyc' },
		{ name: 'chicago' },
		{ name: 'london' },
	];
	Promises = places.map((place) => Place.create(place));
	Promise.all(Promises);
	const things = [
		{ name: 'hat' },
		{ name: 'bag' },
		{ name: 'shirt' },
		{ name: 'cup' },
	];
	Promises = things.map((thing) => Thing.create(thing));
	Promise.all(Promises);
};

// TODO:
// Moe has a bag from paris
// Ethyl has a shirt from nyc
const seedSmallDB = async () => {
	await db.sync({ force: true, logging: false });

	const moe = await Persons.create({ name: 'moe' });

	const flag = await Things.create({ name: 'flag' });
	const hat = await Things.create({ name: 'hat' });

	const nyc = await Places.create({ name: 'nyc' });
	const tokyo = await Places.create({ name: 'tokyo' });
	const london = await Places.create({ name: 'london' });

	// New implementation which feels very wrong
	// Moe has a hat from london
	await PersonsSouvenirs.create({
		personId: moe.id,
		souvenirId: 1,
	});

	// Old implementation
	// Moe has a hat from london
	// const souv1 = await Souvenirs.create({
	// 	personId: moe.id,
	// 	thingId: hat.id,
	// 	placeId: london.id,
	// });
};

seedSmallDB();
