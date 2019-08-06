class PlanetRepository {
  constructor(Planet) {
    this.Planet = Planet;
  }

  async findByUser(userId, filters) {
    const { id, name } = filters;

    const query = this.Planet.find();
    query.where('_user').equals(userId);

    if (id) {
      query.where('_id').equals(id);
    }

    if (name) {
      query.where('name').equals(name);
    }

    return await query.exec();
  }

  async createPlanet(planetInfo) {
    const planet = new this.Planet(planetInfo);
    return await planet.save();
  }

  async updatePlanet(planetId, userId, planetInfo) {
    return await this.Planet.updateOne(
      { _id: planetId, _user: userId },
      planetInfo
    );
  }

  async deletePlanet(planetId, userId) {
    return await this.Planet.findOneAndDelete({
      _id: planetId,
      _user: userId
    });
  }
}

module.exports = PlanetRepository;
