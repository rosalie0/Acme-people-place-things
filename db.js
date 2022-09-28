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
const Souvenirs = db.define('souvenirs');
Souvenirs.belongsTo(Persons);
Souvenirs.belongsTo(Places);
Souvenirs.belongsTo(Things);

module.exports = {
	db,
	Persons,
	Places,
	Things,
	Souvenirs,
};
