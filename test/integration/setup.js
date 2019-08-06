const mongoose = require('../../src/config/mongoose');

before(done => {
  mongoose.connect();
  mongoose.clearDB();
  return done();
});

// beforeEach(done => {
//   console.log('antes');
//   done();
// });

// afterEach(done => {
//   console.log('depois');
//   done();
// });

after(done => {
  mongoose.close();
  // mongoose.clearDB();
  return done();
});
