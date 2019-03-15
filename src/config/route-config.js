module.exports = {
  init(app){
    const staticRoutes = require('../routes/static');
    const userRoutes = require('../routes/users');
    const adminRoutes = require('../routes/admin');

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(adminRoutes);
  }
}
