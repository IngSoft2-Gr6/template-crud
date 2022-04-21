// export all routes
const { Router } = require("express");
const router = Router();

// import all routes
const municipioRoutes = require("./municipioRouter");
const viviendaRoutes = require("./viviendaRouter");
const personaRoutes = require("./personaRouter");

// use all routes
router.use("/municipio", municipioRoutes);
router.use("/vivienda", viviendaRoutes);
router.use("/persona", personaRoutes);

// export router
module.exports = router;
