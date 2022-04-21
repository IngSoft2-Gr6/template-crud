const { Router } = require("express");
const db = require("../config/db.config");
const router = Router();

router
	.route("/")
	.get(async (req, res) => {
		let { page, limit } = req.query;
		// get all the viviendas
		limit = limit || 10;
		const offset = page ? page * limit : 0;
		const viviendas = await db.models.vivienda.findAndCountAll({
			limit,
			offset,
		});

		// send the viviendas as JSON response
		return res.json(viviendas);
	})
	.post(async (req, res) => {
		const { direccion, capacidad, niveles, id_municipio, owners } = req.body;
		// create a new vivienda
		const vivienda = await db.models.vivienda.create({
			direccion,
			capacidad,
			niveles,
			id_municipio,
		});

		// associate the vivienda with the owners
		let vivienda_id = vivienda.id;
		let promises = [];

		owners.forEach((owner) => {
			promises.push(
				db.models.persona_has_vivienda
					.create({
						id_persona: owner.id,
						id_vivienda: vivienda_id,
					})
					.catch((error) => {
						console.log({ error });
						return error;
					})
			);
		});

		await Promise.all(promises);

		// send the new vivienda as JSON response
		return res.json({ ...vivienda, owners: promises });
	});

router
	.route("/:id")
	.patch(async (req, res) => {
		const { id } = req.params;
		const { direccion, capacidad, niveles, id_municipio, owners } = req.body;
		// update the vivienda
		const update = await db.models.vivienda.update(
			{ direccion, capacidad, niveles, id_municipio },
			{ where: { id } }
		);

		// associate the vivienda with the owners
		let vivienda_id = id;
		let promises = [];

		// delete the old owners
		await db.models.persona_has_vivienda.destroy({
			where: { id_vivienda: vivienda_id },
		});

		// add the new owners
		owners.forEach((owner) => {
			promises.push(
				db.models.persona_has_vivienda
					.create({
						id_persona: owner.id,
						id_vivienda: vivienda_id,
					})
					.catch((error) => {
						console.log({ error });
						return error;
					})
			);
		});

		await Promise.all(promises);

		// send the updated vivienda as JSON response
		return res.json({ ...update, owners: promises });
	})
	.delete(async (req, res) => {
		const { id } = req.params;

		// delete the vivienda associations
		await db.models.persona_has_vivienda.destroy({
			where: { id_vivienda: id },
		});

		// delete the vivienda
		const deleteVivienda = await db.models.vivienda.destroy({
			where: { id },
		});

		// send the deleted vivienda as JSON response
		return res.json(deleteVivienda);
	})
	.get(async (req, res) => {
		const { id } = req.params;

		// FIXME: This might not work
		// get the vivienda
		const vivienda = await db.models.vivienda.findOne({
			where: { id },
			include: [
				{
					model: db.models.persona_has_vivienda,
					include: [
						{
							model: db.models.persona,
						},
					],
				},
			],
		});

		// send the vivienda as JSON response
		return res.json(vivienda);
	});

module.exports = router;
