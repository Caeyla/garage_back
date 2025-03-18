const rolesBasedOnPath = {
  CUSTOMER: '/customer',
  MECHANIC: '/mechanic',
  MANAGER: '/manager'
}
const authorizationMiddleware = (req, res, next) => {
  const userRole = req.userType; // Implement this function to retrieve user role.
  if (rolesBasedOnPath[userRole].includes(req.path)) {
    next();
  } else {
    res.status(403).send({ message: 'Forbidden: You do not have access to this resource' });
  }
};
module.exports = authorizationMiddleware;