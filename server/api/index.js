function routes(app, { urlencodedParser }) {
  app.use('/user', urlencodedParser, require('./user'));
  app.use('/auth', urlencodedParser, require('./auth'));
  app.use('/songs', urlencodedParser, require('./songs'));
}
module.exports = routes;
