/*seperate numbers and letters*/
var numLettersSplitRegex = /[a-z]+|[^a-z]+/gi
/*check for fraction regex*/


function ConvertHandler() {

  this.getNum = function(input) {
    var result;
    
    result = input.match(numLettersSplitRegex)[0]
    
    let numberRegex = /\d/
    
    if(numberRegex.test(result) === false){
      result = 1
    }
    
    if(result.toString().includes('/')){
      let values = result.toString().split('/')
      if(values.length != 2){
        return NaN
      }
      values[0] = parseFloat(values[0])
      values[1] = parseFloat(values[1])
      result = parseFloat((values[0]/values[1]).toFixed(5)) 
    }

    if(isNaN(result)){
      return NaN
    }
    
    return parseFloat(result);
  }

  this.getUnit = function(input) {
    let result;

    
    let len = input.match(numLettersSplitRegex).length
    
    if(len == 1)
      result = input.match(numLettersSplitRegex)[0]
    if(len == 2)
      result = input.match(numLettersSplitRegex)[1]

    result = result.toLowerCase()
    if(result.toUpperCase() === 'L')
      return result = 'L'
    
    return result 
  };

  
  this.getReturnUnit = function(initUnit) {
    let result;

    if (initUnit.toUpperCase() === 'GAL')
      return result = 'L';
    else if (initUnit.toUpperCase() === 'L')
      return result = 'gal'

    if (initUnit.toUpperCase() === 'KM')
      return result = 'mi';
    else if (initUnit.toUpperCase() === 'MI')
      return result = 'km'

    if (initUnit.toUpperCase() === 'LBS')
      return result = 'kg'
    else if (initUnit.toUpperCase() === 'KG')
      return result = 'lbs';

    return undefined;
  };

  this.spellOutUnit = function(unit) {
    let result;

    return result
  };


  

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;


    
    if (initUnit.toUpperCase() === 'GAL')
      result = (initNum * galToL).toFixed(5);
    else if (initUnit.toUpperCase() === 'L')
      result = (initNum / galToL).toFixed(5);

    if (initUnit.toUpperCase() === 'LBS')
     result = (initNum * lbsToKg).toFixed(5);
    else if (initUnit.toUpperCase() === 'KG')
      result = (initNum / lbsToKg).toFixed(5);

    if (initUnit.toUpperCase() === 'MI')
     result = (initNum * miToKm).toFixed(5);
    else if (initUnit.toUpperCase() === 'KM')
     result = (initNum / miToKm).toFixed(5);

    return result = parseFloat(result)

  }

    let translateObj = {
      KM: 'kilometers',
      GAL: 'gallons',
      MI: 'miles',
      KG: 'kilograms',
      LBS: 'pounds',
      L: 'liters'
    }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initUnitBig = initUnit.toUpperCase()
    let returnUnitBig = returnUnit.toUpperCase()
    console.log({ initUnitBig })

    if(translateObj.hasOwnProperty(initUnitBig)){
      let translatedInitUnit = translateObj[initUnitBig];
      let translatedReturnUnit = translateObj[returnUnitBig];
      console.log(translatedInitUnit)
      result = `${initNum} ${translatedInitUnit} converts to ${returnNum} ${translatedReturnUnit}`      
    }

    return result;
  };
  
}

module.exports = ConvertHandler;
