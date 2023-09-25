
var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function(done) {
      var input = "3.25mi";
      assert.equal(convertHandler.getNum(input), 3.25);
      done();
    });

    test("Fractional Input", function(done) {
      var input = "12/8mi";
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = "27/5.4mi";
      assert.equal(convertHandler.getNum(input), 5);
      done();
    });

    test("Invalid Input (double fraction)", function(done) {
      var input = "3/7.2/4L";
      assert.equal(isNaN(convertHandler.getNum(input)), true);
      done();
    });

    test("No Numerical Input", function(done) {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), "kg");
      done();
    });
    suite("Function convertHandler.getUnit(input)", function() {
      test("For Each Valid Unit Inputs", function(done) {
        var input = [
          "gal",
          "l",
          "mi",
          "km",
          "lbs",
          "kg",
          "GAL",
          "L",
          "MI",
          "KM",
          "LBS",
          "KG"
        ];
        input.forEach(function(ele) {
          assert.notEqual(convertHandler.getUnit(ele), undefined);
        });
        done();
      });
    
      test("Unknown Unit Input", function(done) {
        let input = "32g";
        assert.equal(convertHandler.getUnit(input), 'g');
        done();
      });
  });
   suite("Function convertHandler.getReturnUnit(initUnit)", function() {
      test("For Each Valid Unit Inputs", function(done) {
        var input = ["gal", "l", "mi", "km", "lbs", "kg"];
        var expect = ["L", "gal", "km", "mi", "kg", "lbs"];
        input.forEach(function(ele, i) {
          assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
        });
        done();
      });
    });
    suite("Function convertHandler.getString(unit)", function() {
      test("For Each Valid Unit Inputs", function(done) {

          assert.equal(convertHandler.getString(3.1, 'mi', 4.98895, 'km'), '3.1 miles converts to 4.98895 kilometers');

        done();
      });
    });
    
    suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var expected = 11.35623;
      assert.approximately(
        convertHandler.convert(3, 'gal'),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      var input = [5, "l"];
      var expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function(done) {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function(done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [5, "lbs"];
      var expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });


    
  });
});