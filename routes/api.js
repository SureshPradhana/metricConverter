'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {

  let convertHandler = new ConvertHandler();


  app.route('/api/convert')
    .get(function(req, res) {
      var input = req.query.input;  
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = parseFloat(convertHandler.convert(initNum, initUnit));
      var returnUnit = convertHandler.getReturnUnit(initUnit);


      if((isNaN(initNum) || initNum <= 0) && returnUnit != undefined)
        res.json('invalid number')
      else if(returnUnit == undefined && !(isNaN(initNum) || initNum <= 0))
        res.json('invalid unit')
      else if(returnUnit == undefined && (isNaN(initNum) || initNum <= 0))
        res.json('invalid number and unit')
      
      

      
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      let resObj = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      }

      
      
      
      res.json(resObj)
      
    })
};

