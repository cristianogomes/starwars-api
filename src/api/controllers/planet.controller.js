const httpStatus = require('http-status');

class PlanetController {
  constructor(planetService) {
    this.planetService = planetService;
  }

  async get(req, res) {
    const userId = req.user.id;
    const filters = req.query;

    const planets = await this.planetService.getPlanetsByUser(userId, filters);

    return res.json(planets);
  }

  async getById(req, res) {
    const userId = req.user.id;
    const { id } = req.params;

    const planet = await this.planetService.getPlanetByUser(id, userId);
    return res.json(planet);
  }

  async post(req, res) {
    const userId = req.user.id;
    const { name, climate, terrain } = req.body;
    const planetData = {
      name,
      climate,
      terrain,
      userId
    };

    const planet = await this.planetService.createPlanet(planetData);

    return res.status(httpStatus.CREATED).json(planet);
  }

  async put(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, climate, terrain } = req.body;
    const planetData = {
      name,
      climate,
      terrain
    };

    const planet = await this.planetService.updatePlanet(
      id,
      userId,
      planetData
    );

    if (planet && planet.nModified === 0) {
      return res.status(httpStatus.NO_CONTENT).json(planet);
    }

    return res.json(planet);
  }

  async delete(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await this.planetService.deletePlanet(id, userId);

    if (!deleted) {
      return res.status(httpStatus.NO_CONTENT).json({});
    }

    return res.json({ success: deleted });
  }
}

module.exports = PlanetController;
