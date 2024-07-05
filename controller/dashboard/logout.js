const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/login");
    });
};

module.exports = { logout }