// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect('/login');
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.userRole === 'admin') {
    return next();
  }
  return res.status(403).send('Access denied. Admin privileges required.');
};

// Middleware to check if user is staff
const isStaff = (req, res, next) => {
  if (req.session && req.session.userId && req.session.userRole === 'staff') {
    return next();
  }
  return res.status(403).send('Access denied. Staff privileges required.');
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isStaff
};

