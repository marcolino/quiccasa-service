module.exports = (err, req, res, next) => {
  console.log("GLOBAL ERROR HANDLER", err, typeof err, Object.keys(err));
  
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: `Authentication error: ${err.message}` });
  }

  // defaults to 500 server error
  return res.status(500).json({ message: `System error: ${err.message}` });
};
