const checkAuthentication = (cb) => {
  return (req, res, ...params) => {
    if (!req.session.authenticated) {
      res.status(404).json({ errors: ["No session"], reason: "Auth" });
    } else {
      cb(req, res, ...params);
    }
  };
};

module.exports = {
  checkAuthentication,
};
