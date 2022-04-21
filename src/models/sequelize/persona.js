const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"persona",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			cedula: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			nombre: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			telefono: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			edad: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sexo: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			id_vivienda: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Can be null because of homeless people",
				references: {
					model: "vivienda",
					key: "id",
				},
			},
			cdf: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "Cabeza de familia",
				references: {
					model: "persona",
					key: "id",
				},
			},
		},
		{
			sequelize,
			tableName: "persona",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "persona_cedula_uindex",
					unique: true,
					fields: [{ name: "cedula" }],
				},
				{
					name: "persona_pk",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
