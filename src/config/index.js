module.exports = {
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: (60 * 60 * 24 * 30 * 1), // 1 month

  /* TEST ONLY */
  jwtExpiration: 60, // 1 minute
  jwtRefreshExpiration: 120, // 2 minutes
};
