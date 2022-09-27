const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/acme_people_places_things');

const Persons = db.define('persons', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});
const Places = db.define('places', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});
const Things = db.define('things', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
});

// Old implementation:
// const Souvenirs = db.define('souvenirs');
// Souvenirs.belongsTo(Persons);
// Souvenirs.belongsTo(Places);
// Souvenirs.belongsTo(Things);

// New implementation:
// Because souv is many-to-many with all three models.
const Souvenirs = db.define('souvenirs');
Souvenirs.belongsToMany(Persons, { through: 'PersonsSouvenirs' });
Persons.belongsToMany(Souvenirs, { through: 'PersonsSouvenirs' });

Souvenirs.belongsToMany(Places, { through: 'PlacesSouvenirs' });
Places.belongsToMany(Souvenirs, { through: 'PlacesSouvenirs' });

Souvenirs.belongsToMany(Things, { through: 'ThingsSouvenirs' });
Things.belongsToMany(Souvenirs, { through: 'ThingsSouvenirs' });

module.exports = {
	db,
	Persons,
	Places,
	Things,
	Souvenirs,
};
