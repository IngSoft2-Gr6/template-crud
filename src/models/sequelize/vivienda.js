const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"vivienda",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			direccion: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			capacidad: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
				comment: "Cuantas personas pueden habitarla",
			},
			niveles: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_municipio: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "municipio",
					key: "id",
				},
			},
		},
		{
			sequelize,
			tableName: "vivienda",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "vivienda_pk",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
