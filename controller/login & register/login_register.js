const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const Admin = require("../../models/adminModel");
const jwt = require("jsonwebtoken");

const loginPage = (req, res) => {
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  res.render("login", { successMessage, errorMessage });
};

const registerSubmit = async (req, res) => {
  try {
    const { usernameregist, emailregist, passwordregist, confirmpasswordregist } = req.body;

    // Check if all fields are filled
    if (!usernameregist || !emailregist || !passwordregist || !confirmpasswordregist) {
      req.flash("error", "Please fill in all fields");
      return res.status(400).redirect("/login");
    }

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ email: emailregist }, { username: usernameregist }],
    });

    if (checkExistingUser) {
      req.flash("error", "User already exists");
      return res.status(400).redirect("/login");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordregist, saltRounds);

    // Create new user with hashed password
    const newUser = await User.create({
      username: usernameregist,
      email: emailregist,
      password: hashedPassword,
    });

    // Redirect to login page with success message
    req.flash("success", "Registration successful");
    res.redirect("/login");
  } catch (error) {
    req.flash("error", error.message);
    res.status(500).redirect("/login");
  }
};

const isMatch = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

const generateAccessToken = (user_id, username, email) => {
  return jwt.sign({
    user_id,
    username,
    email,
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7s",
    });
};

const generateRefreshToken = (user_id, username, email) => {
  return jwt.sign({
    user_id,
    username,
    email,
  },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30m",
    });
};

const loginSubmit = async (req, res) => {
  const { usernamelogin, passwordlogin } = req.body;
  try {

    const user = await User.findOne({
      $or: [{ email: usernamelogin }, { username: usernamelogin }],
    });

    const admin = await Admin.findOne({
      $or: [{ email: usernamelogin }, { username: usernamelogin }],
    });

    if (user) {
      const match = await isMatch(passwordlogin, user.password);
      if (!match) {
        req.flash("error", "Invalid Password");
        return res.status(400).redirect("/login");
      }
      const accessToken = generateAccessToken(user._id, user.username, user.email);
      const refreshToken = generateRefreshToken(user._id, user.username, user.email);
      console.log(refreshToken);
      req.session.auth = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: 'user'
      };
      res.redirect("/dashboard/user");
    } else if (admin) {
      const match = await isMatch(passwordlogin, admin.password);
      if (!match) {
        req.flash("error", "Invalid Password");
        return res.status(400).redirect("/login");
      }
      const accessToken = generateAccessToken(admin._id, admin.username, admin.email);
      const refreshToken = generateRefreshToken(admin._id, admin.username, admin.email);
      req.session.auth = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: 'admin'
      };
      if (admin.role === "master") {
        res.redirect("/dashboard/master");
      } else if (admin.role === "admin") {
        res.redirect("/dashboard/admin");
      } else {
        req.flash("error", "Not Allowed");
        res.redirect("/login");
      }
    } else {
      req.flash("error", "Invalid User");
      return res.status(400).redirect("/login");
    }
  } catch (error) {
    req.flash("error", "naon");
    res.status(500).redirect("/login");
  }
};


module.exports = {
  loginPage,
  registerSubmit,
  loginSubmit,
};
