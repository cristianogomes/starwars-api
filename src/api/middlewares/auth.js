const authService = require('../service/auth.service');

const checkToken = (req, res, next) => {
  let tokenToVerify;

  const headerAuth = req.header('authorization');

  if (headerAuth) {
    const parts = headerAuth.split(' ');

    if (parts.length === 2) {
      const [scheme, credentials] = parts;

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res.status(401).json({
          success: false,
          message: 'Erro na autorização.'
        });
      }
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({
      success: false,
      message: 'Token de autorização não encontrado.'
    });
  }

  const validToken = authService().verify(tokenToVerify, (err, thisToken) => {
    if (err) {
      return res.status(401).json({ err });
    }

    req.user = {
      id: thisToken.id
    };

    return next();
  });

  return validToken;
};

module.exports = {
  checkToken
};
