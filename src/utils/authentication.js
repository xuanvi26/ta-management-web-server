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
      res.status(404).render("pages/landing/dashboard", {userTypes: req.session.user.userTypes});
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

//"student", "ta", "prof", "sysop", "admin"
module.exports = {
  checkAuthentication,
  checkAuthenticationWithUserType,
};
