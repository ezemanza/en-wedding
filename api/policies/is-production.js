module.exports = async function (req, res, proceed) {
  if (req._sails.config.environment !== 'development') {
    return proceed();
  }

  //--•
  // Otherwise, this request did not come from a logged-in user.
  return res.notFound();
};
