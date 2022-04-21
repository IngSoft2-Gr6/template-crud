const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"persona_has_vivienda",
		{
			id_persona: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "persona",
					key: "id",
				},
			},
			id_vivienda: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "vivienda",
					key: "id",
				},
			},
		},
		{
			sequelize,
			tableName: "persona_has_vivienda",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "persona_has_vivienda_pkey",
					unique: true,
					fields: [{ name: "id_persona" }, { name: "id_vivienda" }],
				},
			],
		}
	);
};
