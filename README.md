Ulbora Oauth2 
=============

ulbora-oauth2 is an Oauth2 node module for use with token validation on Ulbora Oauth2 Server.
The module makes securing REST services easy.

## Using

```
var oauth2 = require("ulbora-oauth2");
var mailManager = require("../managers/mailManager");
// a local version of Ulbora Oauth2 Server 
var validationUrl = "https://localhost:3000/rs/token/validate";

exports.sendMail = function (req, res) {
    if (req.is('application/json')) {
        // The url of the particular REST service must be mapped 
        // in the Ulbora Oauth2 Server to the role specified 
        // and the scope specified when scope is used.
        // If the url isn't mapped to the role and scope, a 401 will be sent.
        // If no url or role are passed, a 401 will be sent.
        // This provides an added level of security.
        var me = {
            role: "admin",
            uri: "/rs/mail/send",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            var bodyJson = JSON.stringify(reqBody);
            console.log("body: " + bodyJson);
            mailManager.sendMail(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


```