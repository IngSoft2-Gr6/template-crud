const { Router } = require("express");
const db = require("../config/db.config");
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let { page, limit } = req.query;
		// get all the personas
		limit = limit || 10;
		const offset = page ? page * limit : 0;
		const personas = await db.models.persona.findAndCountAll({
			limit,
			offset,
		});

		// send the personas as JSON response
		return res.json(personas);
	})
	.post(async (req, res) => {
		const { cedula, nombre, telefono, edad, sexo, id_vivienda, cdf } = req.body;
		// create a new persona
		const persona = await db.models.persona.create({
			cedula,
			nombre,
			telefono,
			edad,
			sexo,
			id_vivienda,
			cdf,
		});

		// send the new persona as JSON response
		return res.json(persona);
	});

router
	.route("/:id")
	.patch(async (req, res) => {
		const { id } = req.params;
		const { cedula, nombre, telefono, edad, sexo, id_vivienda, cdf } = req.body;
		// update the persona
		const update = await db.models.persona.update(
			{ cedula, nombre, telefono, edad, sexo, id_vivienda, cdf },
			{ where: { id } }
		);

		// send the updated persona as JSON response
		return res.json(update);
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		// delete the persona
		const deletePersona = await db.models.persona.destroy({
			where: { id },
		});
		// send the deleted persona as JSON response
		return res.json(deletePersona);
	})
	.get(async (req, res) => {
		const { id } = req.params;
		// get the persona
		const persona = await db.models.persona.findOne({ where: { id } });
		// send the persona as JSON response
		return res.json(persona);
	});

module.exports = router;
