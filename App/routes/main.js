var express = require('express');
var router = express.Router();
const Auth = require('../middlewares/auth');
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
router.get('/', Auth, async (req, res) => {
  const data = await Main.find({});
  console.log(data)
  res.render('manage', { title: 'Suraksha - Manage', rendata: data, user: req.user });
})

router.get('/register', Auth, async (req, res) => {
  res.render("register", { title: 'Suraksha - Register', user: req.user });
})
router.get('/getHash', Auth, async (req, res) => {
  res.render("getHash", { title: 'Suraksha - Gen Hash', user: req.user });
})

router.route('/upload')
  .post(Auth, async (req, res) => {
    var newData = await Main.findOneAndUpdate({ ofUser: req.user._id }, { $set: { identifier: req.body.identifier } });
    await newData.save();
    res.redirect('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#send')
  })

  router.route('/value')
  .post(Auth, async (req, res) => {
    var newData = await Main.findOneAndUpdate({ ofUser: req.user._id }, { $set: { value: req.body.value } });
    await newData.save();
    const data = await Main.find({});
    res.render('payload', { title: 'Suraksha - Payload', rendata:data});
  }) 

router.route('/hash')
  .post(Auth, async (req, res) => {
    const str = req.body.name + req.body.ipadress + req.body.description + req.body.macaddress;
    const secret = "Privacy J Comp Harsh Gulati";
    var ciphertext = CryptoJS.AES.encrypt(str, secret).toString();
    var bytes = CryptoJS.AES.decrypt(ciphertext, secret);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(ciphertext);
    console.log(originalText);
    var newData = new Main({
      name: req.body.name,
      ipaddress: req.body.ipadress,
      description: req.body.description,
      macaddress: req.body.macaddress,
      ofUser: req.user._id,
      metadataHash: ciphertext,
    });
    await newData.save();
    res.render('metavalue', { title: 'Suraksha -  MetaValue', meta: ciphertext });
  })
router.get('/getdata', async (req, res) => {
  const data = await Main.find({});
  res.status(200).json(data);
});
router.get('/simulate', async (req, res) => {
  res.render('simulate', { title: 'Suraksha - Simulate',name:"Temp Sensor"});
});


module.exports = router;