const Sequelize = require('sequelize');
const db = new Sequelize(
	'postgres://localhost:5432/acme_people_places_things',
	{ logging: false }
);

// This should prevent sequelize logging to console all its queries?
// Error: Dialect needs to be explicitly supplied as of v4.0.0
// const sequelize = new Sequelize(
// 	'db',
// 	'Persons',
// 	'Places',
// 	'Things',
// 	'Souvenirs',
// 	{
// 		dialect: 'postgres',
// 		logging: false,
// 	}
// );

const Persons = db.define(
	'persons',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			get() {
				const firstLetter = this.getDataValue('name')[0].toUpperCase();
				return firstLetter + this.getDataValue('name').slice(1);
			},
		},
	},
	{ timestamps: false }
);
const Places = db.define(
	'places',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			get() {
				const firstLetter = this.getDataValue('name')[0].toUpperCase();
				return firstLetter + this.getDataValue('name').slice(1);
			},
		},
	},
	{ timestamps: false }
);

const Things = db.define(
	'things',
	{
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{ timestamps: false }
);

const Souvenirs = db.define(
	'souvenirs',
	{
		count: {
			type: Sequelize.INTEGER,
			defaultValue: 1,
		},
		purchasedOn: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
	},
	{ timestamps: false }
);

// Associations
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
