const bcrypt = require("bcrypt");
const Admin = require("../../models/adminModel");

const dashboardMaster = async (req, res) => {
    try {
        const session = req.session.admin;
        const username = session ? session.username : null;

        const readAdmin = await Admin.find({ role: 'admin' });
        console.log(readAdmin)
        res.render('dashboard-master', {
            username: username,
            data : readAdmin
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const adminRegister = async (req, res) => {
    try {
        const { usernameRegister, emailRegister, passwordRegister, roleRegister } = req.body;

        // Check if the user already exists
        const checkExistingUser = await Admin.findOne({
            $or: [{ email: emailRegister }, { username: usernameRegister }],
        });

        if (checkExistingUser) {
            req.flash("error", "User already exists");
            console.log(error.message);
            return res.redirect('/dashboard/master');
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwordRegister, saltRounds);

        // Create new user with hashed password
        const newAdmin = await Admin.create({
            username: usernameRegister,
            email: emailRegister,
            password: hashedPassword,
            role: roleRegister,
        });

        // Redirect to login page with success message
        req.flash("success", "Registration successful");
        console.log("Registration successful");
        res.redirect('/dashboard/master');
    } catch (error) {
        req.flash("error", error.message);
        console.error(error);
        res.redirect('/register'); // Redirect to registration page or appropriate page
    }
}

module.exports = { dashboardMaster, adminRegister }