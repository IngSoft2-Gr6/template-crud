const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const initModels = require("../models/sequelize/init-models");

dotenv.config();

const host = process.env.HOST;
const dbUser = process.env.SQL_USER;
const dbPassword = process.env.SQL_PASSWORD;
const dbName = process.env.DB_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host,
	dialect: "postgres",
	define: {
		timestamps: false,
	},
	pool: {
		max: 10,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.models = initModels(sequelize);

module.exports = db;
