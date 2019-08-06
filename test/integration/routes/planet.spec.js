describe('Route: /v1/planet', () => {
  let token;

  before(async () => {
    const newUser = {
      login: 'cris1',
      password: '123456',
      email: 'cristiano1@mail.com',
      name: 'Cristiano Alves'
    };

    const res1 = await chai
      .request(app)
      .post('/v1/auth/logon')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newUser);

    const user = {
      login: 'cris1',
      password: '123456'
    };

    const res2 = await chai
      .request(app)
      .post('/v1/auth/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user);

    token = res2.body.token;
  });

  describe('GET /v1/planet', () => {
    it('should return an error when not authenticated', async () => {
      const res = await chai.request(app).get('/v1/planet');

      res.should.have.status(httpStatus.UNAUTHORIZED);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });

    it('should return an error send a invalid token', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .set('Authorization', 'Bearer abc123');

      res.should.have.status(httpStatus.UNAUTHORIZED);
      res.body.should.be.a('object');
      res.body.should.have.property('err');
    });

    it('should return an empty list when authenticated', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });
  });

  describe('GET /v1/planet', () => {
    let savedPlanetGeonosis;

    before(async () => {
      const newPlanetGeonosis = {
        name: 'Geonosis',
        climate: 'temperate, arid',
        terrain: 'rock, desert, mountain, barren'
      };

      const res1 = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`)
        .send(newPlanetGeonosis);

      savedPlanetGeonosis = res1.body;
    });

    it('should return one planet when search by name', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .query({ name: savedPlanetGeonosis.name })
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(1);
      res.body[0].should.have.property('name');
      res.body[0].name.should.be.eql('Geonosis');
    });

    it('should return one planet when search by ID', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .query({ id: savedPlanetGeonosis._id })
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(1);
      res.body[0].should.have.property('_id');
      res.body[0]._id.should.be.eql(savedPlanetGeonosis._id);
    });

    it('should return one planet when search by ID and Name', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .query({ id: savedPlanetGeonosis._id, name: savedPlanetGeonosis.name })
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(1);
      res.body[0].should.have.property('_id');
      res.body[0]._id.should.be.eql(savedPlanetGeonosis._id);
      res.body[0].should.have.property('name');
      res.body[0].name.should.be.eql('Geonosis');
    });

    it('should return a empty array when search by name that doesnt exists', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .query({ name: 'teste' })
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });

    it('should return a empty array when search by ID that doesnt exists', async () => {
      const res = await chai
        .request(app)
        .get('/v1/planet')
        .query({ id: 'aaaaaaaaaaaaaaaaaaaaaaaa' })
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });
  });

  describe('POST /v1/planet', () => {
    it('should return an error when not authenticated', async () => {
      const res = await chai.request(app).post('/v1/planet');

      res.should.have.status(httpStatus.UNAUTHORIZED);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });

    it('should return an error when planet details are not provided', async () => {
      const res = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.BAD_REQUEST);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
    });

    it('should create a new planet when details are provided', async () => {
      const planet = {
        name: 'Endor',
        climate: 'temperate',
        terrain: 'forests, mountains, lakes'
      };

      const res = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`)
        .send(planet);

      res.should.have.status(httpStatus.CREATED);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('createdAt');
    });

    it('should return an error when planet already exists', async () => {
      const planet = {
        name: 'Endor',
        climate: 'temperate',
        terrain: 'forests, mountains, lakes'
      };

      const res = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`)
        .send(planet);

      res.should.have.status(httpStatus.CONFLICT);
      res.body.should.be.a('object');
      res.body.should.have.property('errmsg');
      res.body.should.not.have.property('createdAt');
    });
  });

  describe('PUT /v1/planet', () => {
    let savedPlanet;

    before(async () => {
      const newPlanet = {
        name: 'Naboo',
        climate: 'temperate',
        terrain: 'grassy hills, swamps, forests, mountains'
      };

      const res = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`)
        .send(newPlanet);

      savedPlanet = res.body;
    });

    it('should return an error when not authenticated', async () => {
      const res = await chai.request(app).put('/v1/planet');

      res.should.have.status(httpStatus.UNAUTHORIZED);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });

    it('should update the planet details', async () => {
      const newPlanetInfo = {
        name: 'Naboo 2',
        climate: 'temperate 2',
        terrain: 'grassy hills, swamps, forests, mountains 2'
      };

      const res = await chai
        .request(app)
        .put(`/v1/planet/${savedPlanet._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPlanetInfo);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.property('nModified');
      res.body.nModified.should.be.eql(1);
    });

    it('should not update when ID doenst exists', async () => {
      const newPlanetInfo = {
        name: 'Naboo 2',
        climate: 'temperate 2',
        terrain: 'grassy hills, swamps, forests, mountains 2'
      };

      const res = await chai
        .request(app)
        .put(`/v1/planet/aaaaaaaaaaaaaaaaaaaaaaaa`)
        .set('Authorization', `Bearer ${token}`)
        .send(newPlanetInfo);

      res.should.have.status(httpStatus.NO_CONTENT);
      res.body.should.be.empty;
    });

    it('should not update when planet details are not provided', async () => {
      const res = await chai
        .request(app)
        .put(`/v1/planet/${savedPlanet._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});

      res.should.have.status(httpStatus.BAD_REQUEST);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
    });
  });

  describe('DELETE /v1/planet', () => {
    let planeteToDelete;

    before(async () => {
      const newPlanet = {
        name: 'Coruscant',
        climate: 'temperate',
        terrain: 'cityscape, mountains'
      };

      const res = await chai
        .request(app)
        .post('/v1/planet')
        .set('Authorization', `Bearer ${token}`)
        .send(newPlanet);

      planeteToDelete = res.body;
    });

    it('should return an error when not authenticated', async () => {
      const res = await chai.request(app).delete('/v1/planet');

      res.should.have.status(httpStatus.UNAUTHORIZED);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });

    it('should delete a planet when a valid ID is provided', async () => {
      const res = await chai
        .request(app)
        .delete(`/v1/planet/${planeteToDelete._id}`)
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.success.should.be.true;
    });

    it('should return code 204 when a non existent ID is provided', async () => {
      const res = await chai
        .request(app)
        .delete(`/v1/planet/${planeteToDelete._id}`)
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.NO_CONTENT);
      res.body.should.be.empty;
    });

    it('should return an error when a invalid ID is provided', async () => {
      const res = await chai
        .request(app)
        .delete('/v1/planet/abc123')
        .set('Authorization', `Bearer ${token}`);

      res.should.have.status(httpStatus.BAD_REQUEST);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
    });
  });
});
