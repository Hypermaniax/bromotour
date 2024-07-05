const userDashboardPage = (req, res) => {
  const session = req.session.user;
  const username = session ? session.username : null;
  if (!username) {
    return res.redirect('/login');
  }

  res.render("dashboard-user", {
    name: username,
    succeededLog: true
  });
};

module.exports = { userDashboardPage };

//