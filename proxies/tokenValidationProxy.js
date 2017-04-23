/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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