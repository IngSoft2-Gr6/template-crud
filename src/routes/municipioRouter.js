const { Router } = require("express");
const db = require("../config/db.config");
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let { page, limit } = req.query;
		// get all the municipios

		limit = limit || 10;
		const offset = page ? page * limit : 0;
		const municipios = await db.models.municipio.findAndCountAll({
			limit: limit,
			offset: offset,
		});

		// send the municipios as JSON response
		return res.json(municipios);
	})
	.post(async (req, res) => {
		const { nombre, area, presupuesto } = req.body;
		// create a new municipio
		const municipio = await db.models.municipio.create({
			nombre,
			area,
			presupuesto,
		});
		// send the new municipio as JSON response
		return res.json(municipio);
	});

router
	.route("/:id")
	.patch(async (req, res) => {
		const { id } = req.params;
		const { nombre, area, presupuesto } = req.body;
		// update the municipio
		const update = await db.models.municipio.update(
			{ nombre, area, presupuesto },
			{ where: { id } }
		);

		// send the updated municipio as JSON response
		return res.json(update);
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		// delete the municipio
		const deleteMunicipio = await db.models.municipio.destroy({
			where: { id },
		});
		// send the deleted municipio as JSON response
		return res.json(deleteMunicipio);
	})
	.get(async (req, res) => {
		const { id } = req.params;
		// get the municipio
		const municipio = await db.models.municipio.findOne({ where: { id } });
		// send the municipio as JSON response
		return res.json(municipio);
	});

module.exports = router;
