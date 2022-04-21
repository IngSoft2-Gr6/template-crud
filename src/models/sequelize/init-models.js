var DataTypes = require("sequelize").DataTypes;
var _municipio = require("./municipio");
var _persona = require("./persona");
var _persona_has_vivienda = require("./persona_has_vivienda");
var _vivienda = require("./vivienda");

function initModels(sequelize) {
	var municipio = _municipio(sequelize, DataTypes);
	var persona = _persona(sequelize, DataTypes);
	var persona_has_vivienda = _persona_has_vivienda(sequelize, DataTypes);
	var vivienda = _vivienda(sequelize, DataTypes);

	persona.belongsToMany(vivienda, {
		as: "id_vivienda_viviendas",
		through: persona_has_vivienda,
		foreignKey: "id_persona",
		otherKey: "id_vivienda",
	});
	vivienda.belongsToMany(persona, {
		as: "id_persona_personas",
		through: persona_has_vivienda,
		foreignKey: "id_vivienda",
		otherKey: "id_persona",
	});
	vivienda.belongsTo(municipio, {
		as: "id_municipio_municipio",
		foreignKey: "id_municipio",
	});
	municipio.hasMany(vivienda, { as: "viviendas", foreignKey: "id_municipio" });
	persona.belongsTo(persona, { as: "cdf_persona", foreignKey: "cdf" });
	persona.hasMany(persona, { as: "personas", foreignKey: "cdf" });
	persona_has_vivienda.belongsTo(persona, {
		as: "id_persona_persona",
		foreignKey: "id_persona",
	});
	persona.hasMany(persona_has_vivienda, {
		as: "persona_has_viviendas",
		foreignKey: "id_persona",
	});
	persona.belongsTo(vivienda, {
		as: "id_vivienda_vivienda",
		foreignKey: "id_vivienda",
	});
	vivienda.hasMany(persona, { as: "personas", foreignKey: "id_vivienda" });
	persona_has_vivienda.belongsTo(vivienda, {
		as: "id_vivienda_vivienda",
		foreignKey: "id_vivienda",
	});
	vivienda.hasMany(persona_has_vivienda, {
		as: "persona_has_viviendas",
		foreignKey: "id_vivienda",
	});

	return {
		municipio,
		persona,
		persona_has_vivienda,
		vivienda,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
