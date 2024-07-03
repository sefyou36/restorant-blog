module.exports = (req, res, next) => {
    try {
      decodeURIComponent(req.url);
      next();
    } catch (e) {
      res.status(400).send('Bad Request');
    }
  };
  