const express = require('express');
const router = express.Router();
const PlanetController = require('../../controllers/planet.controller');
const planetService = require('../../service/planet.service');
const asyncHandler = require('../../utils/asyncHandler');
const {
  createPlanet,
  updatePlanet,
  deletePlanet
} = require('../../validations/planet.validation');
const validate = require('express-validation');

const planetController = new PlanetController(planetService);

router.get('/', (req, res) => planetController.get(req, res));

router.post(
  '/',
  validate(createPlanet),
  asyncHandler((req, res) => planetController.post(req, res))
);

router.put(
  '/:id',
  validate(updatePlanet),
  asyncHandler((req, res) => planetController.put(req, res))
);

router.delete(
  '/:id',
  validate(deletePlanet),
  asyncHandler((req, res) => planetController.delete(req, res))
);

module.exports = router;
