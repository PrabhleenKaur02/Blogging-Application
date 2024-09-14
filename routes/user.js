const { Router } = require("express");
const path = require("path");
const User = require('../models/user');
const multer = require("multer");
const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      console.log(fileName);
      cb(null, fileName);
    }
  })

  const upload = multer({ storage: storage });

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie('token', token).redirect("/"); 
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect email or password"
        });
    }
})

router.post('/signup',upload.single("coverImage"), async(req, res) => {
    const { fullName, email, password } = req.body;
    const user = await User.create({
        fullName,
        email,
        password,
        profileImage: `/images/${req.file.filename}`
    });
    return res.redirect('/');
})

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
})


module.exports = router;