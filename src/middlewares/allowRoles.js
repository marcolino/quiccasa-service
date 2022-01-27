/**
 * middleware for role protected routes
 */
module.exports = (...roles) => (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized", reason: "No user" }); // TODO: a better reason...
  }

  console.log("req.user.roles:", req.user.roles, typeof req.user.roles);
  console.log("roles:", roles, typeof roles);

  // check at least on of the requested roles is present in user's roles
  const hasRole = roles.some(role => req.user.roles.includes(role));
  //const hasRole = roles.find(role => req.user.roles === role);
  if (!hasRole) {
    return res.status(401).json({ message: "Unauthorized", reason: `User role (${req.user.roles}) is not sufficient to access this resource` }); 
  }

  return next();
};
