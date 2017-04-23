//var constants = require("../constants/constants");
var request = require('request');

exports.validateAccessToken = function (authJson, validationUrl, callback) {
    var rtn = {
        valid: false,
        message: ""
    };
    //var url = process.env.OAUTH2_VALIDATION_URI || constants.OAUTH2_VALIDATION_URI;
    var options = {
        method: 'post',
        body: authJson,
        json: true,
        url: validationUrl
    };
    request(options, function (err, res, body) {
        if (!err && body) {
            var statusCode = res.statusCode;
            if(statusCode === 200){
                console.log('body: ', body);
                console.log('body.valid: ', body.valid);
                if(body.valid){
                    rtn.valid = true;
                }                
                callback(rtn);
            }else{
                callback(rtn);
            }
        }else{
            console.error('error posting json: ', err)
            callback(rtn);
        } 
    });
};