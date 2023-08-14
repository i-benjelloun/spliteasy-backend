module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: 'This route does not exist' });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    const status = err.status || 500;
    res.status(status).json({ errorMessage: err.message });
  });
};
