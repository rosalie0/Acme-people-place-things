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

const seedSmallDB = async () => {
	await db.sync({ force: true, logging: false });

	const moe = await Persons.create({ name: 'moe' });
	const ethyl = await Persons.create({ name: 'ethyl' });

	const hat = await Things.create({ name: 'hat' });
	const bag = await Things.create({ name: 'bag' });
	const shirt = await Things.create({ name: 'shirt' });

	const london = await Places.create({ name: 'london' });
	const paris = await Places.create({ name: 'paris' });
	const nyc = await Places.create({ name: 'nyc' });

	// New implementation which has models:
	// PersonsSouvenirs, PlacesSouvenirs, ThingsSouvenirs

	// Moe has a hat from london
	const souv1 = Souvenirs.create({});

	await PersonsSouvenirs.create({
		personId: moe.id,
		souvenirId: souv1.id,
	});

	await PlacesSouvenirs.create({
		placeId: london.id,
		souvenirId: souv1.id,
	});

	await ThingsSouvenirs.create({
		thingId: hat.id,
		souvenirId: souv1.id,
	});

	// Old implementation
	// Moe has a hat from london
	// Moe has a bag from paris
	// Ethyl has a shirt from nyc
	await Promise.all([
		Souvenirs.create({ personId: moe.id, thingId: hat.id, placeId: london.id }),
		Souvenirs.create({ personId: moe.id, thingId: bag.id, placeId: paris.id }),
		Souvenirs.create({
			personId: ethyl.id,
			thingId: shirt.id,
			placeId: nyc.id,
		}),
	]);
};

seedSmallDB();
