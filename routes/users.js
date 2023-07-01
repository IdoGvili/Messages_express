const express = require("express")
const router = express.Router()

router.use(logger)

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];
router.get("/", (req, res) => {
  console.log(req.query.name)
  res.render('myFile', { title: "Mini Messageboard", messages: messages })
})

router.get("/new", (req, res) => {
  res.render("users/new")
})

router.post("/", (req, res) => {
 
  messages.push({text: req.body.messageText, user: req.body.messageUser, added: new Date()});
  res.redirect('/users')
})

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
  })

const users = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()
})

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

module.exports = router
