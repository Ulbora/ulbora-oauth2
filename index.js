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

var tokenValidationProxy = require("./proxies/tokenValidationProxy");



exports.authorize = function (req, res, me, validationUrl, callback) {
    var tokenHeader = req.header("Authorization");
    var userId = req.header("userId");
    var clientIdStr = req.header("clientId");
    var clientId = getClientId(clientIdStr);    
    if (tokenHeader !== undefined && tokenHeader !== null && me) {
        var tokenArray = tokenHeader.split(' ');
        if (tokenArray !== undefined && tokenArray !== null && tokenArray.length === 2) {
            var token = tokenArray[1];            
            var role = me.role;           
            var uri =  me.uri;
            console.log("uri: " + uri);
            var scope = me.scope;
            var authJson = {
                accessToken: token,
                userId: userId,
                clientId: clientId,
                role: role,
                uri: uri,
                scope: scope
            };
            tokenValidationProxy.validateAccessToken(authJson, validationUrl, function (result) {
                if (result.valid) {
                    callback();
                } else {
                    res.status(401);
                    res.send();
                }
            });
        } else {
            res.status(401);
            res.send();
        }
    } else {
        res.status(401);
        res.send();
    }
};




getClientId = function (clientIdStr) {
    var clientId;
    if (clientIdStr) {
        try {
            clientId = parseInt(clientIdStr);
        } catch (err) {
            clientId = clientIdStr;
        }
    } else {
        clientId = clientIdStr;
    }
    return clientId;
};

