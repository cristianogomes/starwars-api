describe('Route: /v1/auth', () => {
  describe('POST /v1/auth/logon', () => {
    it('should create a new user if doesnt exists', async () => {
      const newUser = {
        login: 'cris',
        password: '123456',
        email: 'cristiano@mail.com',
        name: 'Cristiano Alves'
      };

      const res = await chai
        .request(app)
        .post('/v1/auth/logon')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser);

      res.should.have.status(httpStatus.CREATED);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('createdAt');
    });

    it('should return an error if user already exists', async () => {
      const newUser = {
        login: 'cris',
        password: '123456',
        email: 'cristiano@mail.com',
        name: 'Cristiano Alves'
      };

      const res = await chai
        .request(app)
        .post('/v1/auth/logon')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser);

      res.should.have.status(httpStatus.CONFLICT);
      res.body.should.be.a('object');
      res.body.should.have.property('errmsg');
      res.body.should.not.have.property('createdAt');
    });

    it('should return an error when user informations are not provided', async () => {
      const res = await chai
        .request(app)
        .post('/v1/auth/logon')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({});

      res.should.have.status(httpStatus.BAD_REQUEST);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.be.a('array');
    });

    it('should return an error if email is invalid', async () => {
      const newUser = {
        login: 'cris',
        password: '123456',
        email: 'invalid email',
        name: 'Cristiano Alves'
      };

      const res = await chai
        .request(app)
        .post('/v1/auth/logon')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newUser);

      res.should.have.status(httpStatus.BAD_REQUEST);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.be.a('array');
      res.body.errors[0].field[0].should.be.eql('email');
    });
  });

  describe('POST /v1/auth/login', () => {
    it('should return a token when user exists', async () => {
      const user = {
        login: 'cris',
        password: '123456'
      };

      const res = await chai
        .request(app)
        .post('/v1/auth/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user);

      res.should.have.status(httpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.property('token');
      res.body.should.have.property('success');
      res.body.success.should.be.true;
    });

    it('should return an erro when user credentials are not provided', async () => {
      const res = await chai
        .request(app)
        .post('/v1/auth/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({});

      res.should.have.status(httpStatus.FORBIDDEN);
      res.body.should.be.a('object');
      res.body.should.not.have.property('token');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });

    it('should return an erro when user credentials doesnt exists', async () => {
      const fakeUser = {
        login: 'fake',
        password: 'abc123'
      };

      const res = await chai
        .request(app)
        .post('/v1/auth/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(fakeUser);

      res.should.have.status(httpStatus.FORBIDDEN);
      res.body.should.be.a('object');
      res.body.should.not.have.property('token');
      res.body.should.have.property('success');
      res.body.success.should.be.false;
    });
  });
});

// describe('Routes: Users', () => {
//   describe('GET /v1/user', () => {
//     it('it should GET all the users', done => {
//       chai
//         .request(app)
//         .get('/v1/user')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(0);
//           done();
//         });
//     });
//   });

//   // https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
//   // https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/

//   describe('POST /v1/user', () => {
//     it('it should not POST a user when participation is greater than 100%', done => {
//       const user = {
//         firstName: 'Cristiano',
//         lastName: 'Gomes',
//         participation: '10'
//       };
//       chai
//         .request(app)
//         .post('/v1/user')
//         .set('content-type', 'application/x-www-form-urlencoded')
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.should.be.a('object');
//           res.body.should.have.property('errors');
//           res.body.errors[0].should.have.property('messages');
//           res.body.errors[0].messages[0].should.be.eql(
//             '"participation" must be less than or equal to 100'
//           );
//           done();
//         });
//     });
//   });
// });
