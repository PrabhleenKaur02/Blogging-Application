const path = require("path");
const express = require("express");
const multer = require("multer");

const Blog = require("../models/blog");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      console.log(fileName);
      cb(null, fileName);
    }
  })

  const upload = multer({ storage: storage });

router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        user: req.user
    });
});

router.get('/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id); 
    return res.render("blog", {
        user: req.user,
        blog
    })
})

router.post('/', upload.single("coverImage"), async(req, res) => {
   const { title, body } = req.body;
   const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`
   })

    return res.redirect('/');
})
module.exports = router;