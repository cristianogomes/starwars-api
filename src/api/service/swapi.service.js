const axios = require('axios');

const countFilms = (accumulator, planet) => accumulator + planet.films.length;

module.exports = {
  async getFilmsCount(planetName) {
    const retorno = await axios.get(
      `https://swapi.co/api/planets?search=${planetName}`
    );

    if (retorno.data) {
      const planets = retorno.data.results;
      return planets.reduce(countFilms, 0);
    }

    return 0;
  }
};
