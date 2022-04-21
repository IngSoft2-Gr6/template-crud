const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"municipio",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			nombre: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			area: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			presupuesto: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "municipio",
			schema: "public",
			timestamps: false,
			indexes: [
				{
					name: "municipio_pk",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
