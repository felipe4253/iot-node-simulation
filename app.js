var express = require("express");
var myParser = require("body-parser");

var app = express();

//Systolic Blood Pressure Range
const MINIMAL_SYSTOLIC_BLOOD_PRESSURE = 10;
const MAX_SYSTOLIC_BLOOD_PRESSURE = 14;

//Diastolic Blood Pressure Range
const MINIMAL_DIASTOLIC_BLOOD_PRESSURE = 7;
const MAX_DIASTOLIC_BLOOD_PRESSURE = 9;

//Heartbeat Range
const MINIMAL_HEART_BEAT = 50;
const MAX_HEART_BEAT = 210;

app.use(myParser.urlencoded({extended : true}));

app.post("/v1/monitor", function(request, response) {

    console.log("Receiving data from patient");
    console.log(request.body);

    try {
        evaluateNumericalValue(MINIMAL_SYSTOLIC_BLOOD_PRESSURE, 
            MAX_SYSTOLIC_BLOOD_PRESSURE,
            request.body.systolicBloodPressure,
            "Abnormal systolic blood pressure");

        evaluateNumericalValue(MINIMAL_DIASTOLIC_BLOOD_PRESSURE, 
            MAX_DIASTOLIC_BLOOD_PRESSURE,
            request.body.diastolicBloodPressure,
            "Abnormal diastolic blood pressure");

        evaluateNumericalValue(MINIMAL_HEART_BEAT, 
            MAX_HEART_BEAT,
            request.body.heartBeatsPerMinute,
            "Abnormal heartbeat frequency");

        response.send("Patient is healthy");
    } catch (err) {
        console.error(err);
        response.status(500).send(err);
    }

    
    
    
});
 
app.listen(8080);


/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @param {number} actual 
 * @param {string} alertMessage 
 */
var evaluateNumericalValue = function(min, max, actual, alertMessage) {
    console.log(min);
    console.log(max);
    console.log(actual);

    if (actual > max || actual < min) {
        throw alertMessage;
    }
}