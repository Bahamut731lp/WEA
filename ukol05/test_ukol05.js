// soubor pro testovaní ukol05 
// node test_ukol05.js

const ukol05 = require('./ukol05');

let testObject = {
    prvni: "ja",
    druhy: "ty",
    treti: "on",
    nahoda: 444
};

//true
console.log(ukol05.hasKey(testObject, "treti"));
//false
console.log(ukol05.hasKey(testObject, "deset"));
//true
console.log(ukol05.hasValue(testObject, 444));
//false
console.log(ukol05.hasValue(testObject, "treti"));

//můžete si přidat i vlastní testy