const Planet = require('../models/planet');
const PlanetRepository = require('../repositories/planet.repository');
const swapiService = require('./swapi.service');

const planetRepository = new PlanetRepository(Planet);

module.exports = {
  async getPlanetsByUser(userId, filters) {
    return await planetRepository.findByUser(userId, filters);
  },

  async getPlanetByUser(id, userId) {
    return await planetRepository.findById(id, userId);
  },

  async createPlanet(planet) {
    const { name, weather, climate, terrain, userId } = planet;

    const filmsCount = await swapiService.getFilmsCount(name);

    return await planetRepository.createPlanet({
      name,
      weather,
      climate,
      terrain,
      filmsCount,
      _user: userId
    });
  },

  async updatePlanet(id, userId, planet) {
    const { name, weather, climate, terrain } = planet;

    const filmsCount = await swapiService.getFilmsCount(name);

    return await planetRepository.updatePlanet(id, userId, {
      name,
      weather,
      climate,
      terrain,
      filmsCount
    });
  },

  async deletePlanet(id, userId) {
    const affected = await planetRepository.deletePlanet(id, userId);
    return !!affected;
  }
};
