const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
  const password = user => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    return hash;
  };

  const comparePassword = (password, hash) =>
    bcrypt.compareSync(password, hash);

  return {
    password,
    comparePassword
  };
};

module.exports = bcryptService;
