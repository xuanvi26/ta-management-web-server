const checkAuthenticationWithUserType = (paramUserTypes, cb) => {
  return (req, res, ...params) => {
    if (
      req.session.authenticated &&
      paramUserTypes.some((paramUserType) =>
        req.session.user.userTypes.some(
          (dbUserType) => dbUserType === paramUserType
        )
      )
    ) {
      cb(req, res, ...params);
    } else if (req.session.authenticated) {
      res.status(404).render("pages/landing/home");
    } else {
      res.status(404).render("pages/landing/login");
    }
  };
};

const checkAuthentication = (cb) => {
  return (req, res, ...params) => {
    if (req.session.authenticated) {
      cb(req, res, ...params);
    } else {
      res.status(404).render("pages/landing/login");
    }
  };
};

module.exports = {
  checkAuthentication,
  checkAuthenticationWithUserType,
};
