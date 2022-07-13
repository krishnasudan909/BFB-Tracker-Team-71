var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Auth = require('../middlewares/auth');
const csvwriter=require('csv-writer');
var createCsvWriter = csvwriter.createObjectCsvWriter
  
// Passing the column names intp the module


router.route('/register')
  .get(async (req, res) => {
    res.render('ngosignup', { title: "NGO Sign up" })
  })
  .post(async (req, res) => {
    const ngo = await Ngo.findOne({ email: req.body.email, passcode: req.body.passcode });
    console.log("here",ngo);
    if (!ngo) {
      res.redirect('/error');
    }
    else {
      await Ngo.findOneAndUpdate({
        email: req.body.email
      }, {
        name: req.body.name,
        contact: req.body.contact,
        password: req.body.password,
        passcode: req.body.passcode
      });
      res.redirect('/ngo/login')
    }
  })
router.route('/input')
  .get(async (req, res) => {
    res.render("input")})
  .post(async (req, res) => {

    var newData = new Data({
      name: req.body.orgname,
      program:req.body.prog,
      rep_name: req.body.repname,
      beneficiary_18: req.body.under18,
      beneficiary_60: req.body.under60,
      beneficiary_total: req.body.total,
      beneficiary_female: req.body.female,
      rep_id:req.body.repid,
      amount_kgs:req.body.foodamount,
      food_distributed:req.body.was,
      location:req.body.location,
    });
    console.log(newData);
    await newData.save();
    res.redirect('/ngo/gethist')
  })


  router.route('/login')
  .get(async (req, res) => {
    res.render('ngologin', { title: " Login" })
  })
  .post(async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    const user = await Ngo.findOne({ email: email, password: password });
    if (!user) {
      res.redirect('/login');
    }
    else {
      user.token = uuidv4();
      await user.save();
      res.cookie("token", user.token);
      res.redirect('/ngo/input');
    }
  })

router.get('/getalldata', async (req, res) => {
    const data = await Data.find({});
    res.status(200).json(data);
  });


router.get('/getline_chart', async (req, res) => {
    const data = await Data.find({});
    const beneficiary=[];
    for (const type of data) {  
      beneficiary.push(type.beneficiary_18);
      beneficiary.push(type.beneficiary_60);
      beneficiary.push(type.beneficiary_female);
      beneficiary.push(type.beneficiary_total);
      break;
    }
    res.status(200).json(beneficiary);
  });

router.get('/getamount_kg', async (req, res) => {
    const data = await Data.find({});
    const amount_kg=[];
    for (const type of data) {  
      amount_kg.push(type.amount_kgs);
    }
    res.status(200).json(amount_kg);
  });

  router.get('/getname', async (req, res) => {
    const data = await Data.find({});
    const names=[];
    for (const type of data) {  
      names.push(type.name);
    }
    res.status(200).json(names);
  });

  router.get('/getprogram', async (req, res) => {
    const data = await Data.find({});
    const prog=[];
    for (const type of data) {  
      prog.push(type.program);
    }
    res.status(200).json(prog);
  });
  router.get('/getlocation', async (req, res) => {
    const data = await Data.find({});
    const loc=[];
    for (const type of data) {  
      loc.push(type.location);
    }
    res.status(200).json(loc);
  });
  router.get('/getrep_name', async (req, res) => {
    const data = await Data.find({});
    const rep=[];
    for (const type of data) {  
      rep.push(type.rep_name);
    }
    res.status(200).json(rep);
  });
  router.get('/getbeneficiary_18', async (req, res) => {
    const data = await Data.find({});
    const b18=[];
    for (const type of data) {  
      b18.push(type.beneficiary_18);
    }
    res.status(200).json(b18);
  });
  router.get('/getbeneficiary_60', async (req, res) => {
    const data = await Data.find({});
    const b60=[];
    for (const type of data) {  
      b60.push(type.beneficiary_60);
    }
    res.status(200).json(b60);
  });
  router.get('/getbeneficiary_female', async (req, res) => {
    const data = await Data.find({});
    const bf=[];
    for (const type of data) {  
      bf.push(type.beneficiary_female);
    }
    res.status(200).json(bf);
  });
  router.get('/getrep_id', async (req, res) => {
    const data = await Data.find({});
    const repid=[];
    for (const type of data) {  
      repid.push(type.rep_id);
    }
    res.status(200).json(repid);
  });
  router.get('/getbeneficiary_total', async (req, res) => {
    const data = await Data.find({});
    const btotal=[];
    for (const type of data) {  
      btotal.push(type.beneficiary_total);
    }
    res.status(200).json(btotal);
  });
  router.get('/getfood_distributed', async (req, res) => {
    const data = await Data.find({});
    const food_dist=[];
    for (const type of data) {  
      food_dist.push(type.food_distributed);
    }
    res.status(200).json(food_dist);
  });

  router.get('/gethist', async (req, res) => {
    const data = await Data.find({});
    res.render('ngohist', { title: 'NGO Desc', rendata:data});
  });


router.get('/getCSV',async(req,res)=>{
  const csvWriter = createCsvWriter({
  
    // Output csv file name is geek_data
    path: 'ngo_input_data.csv',
    header: [
    
      // Title of the columns (column_names)
      {id: 'name', title: 'Name'},
      {id: 'program', title: 'Program'},
      {id: 'beneficiary_18', title: 'beneficiary_18'},
      {id: 'beneficiary_60', title: 'beneficiary_60'},
      {id: 'beneficiary_female', title: 'beneficiary_female'},
      {id: 'beneficiary_total', title: 'beneficiary_total'},
      {id: 'amount_kgs', title: 'amount_kgs'},
    ]
  });
    
  const data = await Data.findOne({});
  console.log(data);
  const results = [
    {
      name: data.name,
      program: data.program,
      beneficiary_18: data.beneficiary_18,
      beneficiary_60:data.beneficiary_60,
      beneficiary_female:data.beneficiary_female,
      beneficiary_total:data.beneficiary_total,
      amount_kgs:data.amount_kgs
    }
  ];
  // Writerecords function to add records
  csvWriter
    .writeRecords(results)
    .then(()=> console.log('Data uploaded into csv successfully'));
    res.redirect('/');
})


router.get('/logout', async (req, res) => {
  req.logout();
  await Ngo.findOneAndUpdate({ token: req.cookies['token'].toString() }, { token: "" })
  res.clearCookie("token");
  res.redirect('/');
});


module.exports = router;
