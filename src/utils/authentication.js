const checkAuthenticationWithUserType = (userTypes, cb) => {
  return (req, res, ...params) => {
    if (
      req.session.authenticated &&
      userTypes.some((type) => req.session.user.userType === type)
    ) {
      cb(req, res, ...params);
    } else if (req.session.authenticated) {
      res.status(404).render("pages/landing/dashboard");
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
