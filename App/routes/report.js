var express = require('express');
var router = express.Router();
const bodyParser=require('body-parser');
const { MongoClient } = require("mongodb");
const PDFDocument = require('pdfkit');
const fs=require("fs");
const doc = new PDFDocument();
async function run() {
  try {
    doc.pipe(fs.createWriteStream('example.pdf'));
    cursor = [
        {
        "_id": "629b785996ba8391307bec1d",
        "name": "1",
        "program": "1",
        "location": "1",
        "rep_name": "1",
        "beneficiary_18": 1,
        "beneficiary_60": 1,
        "beneficiary_female": 1,
        "rep_id": 1,
        "amount_kgs": 1,
        "beneficiary_total": 1,
        "food_distributed": "1",
        "__v": 0
        },
        {
        "_id": "629b79e8e9f91af95b99b4f5",
        "name": "11",
        "program": "nva",
        "location": "pune",
        "rep_name": "sa",
        "beneficiary_18": 5,
        "beneficiary_60": 45,
        "beneficiary_female": 100,
        "rep_id": 12,
        "amount_kgs": 45,
        "beneficiary_total": 87,
        "food_distributed": "yes",
        "__v": 0
        }
        ]
    
    await cursor.forEach(function(d){
        doc
            .fontSize(27)
            .font('Courier')
            .fillColor('green')
            .text("NGO " + d.name)
            .moveDown(0.5);
        doc
            .fontSize(17)
            .fillColor('black')
            .text("Program :" + " " + d.program)
            .text("Location :" + " " + d.location)
            .text("Representative Name :" + " " + d.rep_name)
            .text("Beneficiary less under 18 :" + " " + d.beneficiary_18)
            .text("Beneficiary greater over 60 :" + " " + d.beneficiary_60)
            .text("Registered ID :" + " " + d.rep_id)
            .text("Amount of Food received in KG :" + " " + d.amount_kgs)
            .text("Total Beneficiaries impacted :" + " " + d.beneficiary_total)
            .text("Food distributed by any partner :" + " " + d.food_distributed)
            .moveDown(1);
        console.log(d);
    });
    
    doc.end();

  } finally {
    //await client.close();
  }
}

router.get('/', async (req, res) => {
    run().catch(console.dir);
  });



  module.exports = router;
