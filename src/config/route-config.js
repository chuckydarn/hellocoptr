module.exports = {
  init(app){
    const staticRoutes = require('../routes/static');
    const userRoutes = require('../routes/users');
    const adminRoutes = require('../routes/admin');
    const companyRoutes = require('../routes/company');
    const employeeRoutes = require('../routes/employees');
    const visitorRoutes = require('../routes/visitors');

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(adminRoutes);
    app.use(companyRoutes);
    app.use(employeeRoutes);
    app.use(visitorRoutes);
  }
}
