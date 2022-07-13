var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Auth = require('../middlewares/auth');


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cfgfoodbank2022@gmail.com',
    pass: 'One2345@'
  }
});





router.route('/register')
  .get(async (req, res) => {
    res.render('signup', { title: "Onboard" })
  })
  .post(async (req, res) => {

    
    var mailOptions = {
      from: 'cfgfoodbank2022@gmail.com',
      to: req.body.email,
      subject: 'Hey NGO, Your Access Code',
      text: 'Please Onboard yourself at localhost:3000/ngo/register with Access Code'+req.body.passcode
    };
    var newNGO = new Ngo({
      email: req.body.email,
      passcode: req.body.passcode
    });
    await newNGO.save();
    res.redirect('/login') 
  })


router.route('/login')
  .get(async (req, res) => {
    res.render('login', { title: " Login" })
  })
  .post(async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      res.redirect('/dash');
    }
    else {
      user.token = uuidv4();
      await user.save();
      res.cookie("token", user.token);
      res.redirect('/dash');
    }
  })

router.route('/dash')
  .get(async (req, res) => {
    res.render('visual', { title: "Dashboard" })
  })

router.get('/logout', async (req, res) => {
  req.logout();
  await User.findOneAndUpdate({ token: req.cookies['token'].toString() }, { token: "" })
  res.clearCookie("token");
  res.redirect('/');
});

module.exports = router;
