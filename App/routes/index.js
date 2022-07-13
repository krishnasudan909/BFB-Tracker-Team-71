var express = require('express');
var router = express.Router();
const Auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
  var user = null;
  if (req.cookies['token']) {
    user = await User.findOne({ token: req.cookies['token'].toString() });
  }
  res.render('index', { title: 'Admin - Main', user: user });
});

router.get('/error', async (req, res) => {
  res.render('error', { title: "Suraksha", user: req.user });
})


module.exports = router;
