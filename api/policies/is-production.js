module.exports = async function (req, res, proceed) {
  if (req._sails.config.environment !== 'production') {
    return proceed();
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden();
};
