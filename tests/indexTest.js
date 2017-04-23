var assert = require('assert');
var oauth2 = require("../index");

describe('oauth2', function () {
    this.timeout(20000);
    var validationUrl = "http://localhost:3000/rs/token/validate";
    describe('#authorize()', function () {
        it('should fail to authorize a request', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + "slldndngggg";
                    } else if (val === "userId") {
                        return "admin";
                    } else if (val === "clientId") {
                        return "544";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function () {
                    if (this.statusCode === 401) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                var me = {
                    role: "admin",
                    uri: "/rs/addUser",
                    scope: "read"
                };
                oauth2.authorize(req, res, me, validationUrl, function () {
                    console.log("In authorization callback");
                    assert(false);
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#authorize()', function () {
        it('should to authorize a request', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MiLCJncmFudCI6ImNsaWVudF9jcmVkZW50aWFscyIsImNsaWVudElkIjo0MDMsInJvbGVVcmlzIjpbeyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoyMDEsInVyaSI6Ii9ycy9tYWlsL3NlbmQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE5MiwidXJpIjoiL3JzL3VzZXIvdXBkYXRlIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoxOTMsInVyaSI6Ii9ycy91c2VyL2dldCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk0LCJ1cmkiOiIvcnMvdXNlci9kZWxldGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE5NSwidXJpIjoiL3JzL3VzZXIvbGlzdCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk2LCJ1cmkiOiIvcnMvcm9sZS9hZGQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjYyLCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL2FkZENsaWVudCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk4LCJ1cmkiOiIvcnMvcm9sZS9nZXQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjYzLCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL3VwZGF0ZUNsaWVudCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk5LCJ1cmkiOiIvcnMvcm9sZS9kZWxldGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjc3LCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL2FkZENsaWVudFNjb3BlIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoyMDAsInVyaSI6Ii9ycy9yb2xlL2xpc3QiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE2OCwidXJpIjoiL3JzL3VzZXIvYWRkIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjIsInJvbGUiOiJ1c2VyIiwidXJpSWQiOjY4LCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL2RlbGV0ZUNsaWVudEFsbG93ZWRVcmkiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6Miwicm9sZSI6InVzZXIiLCJ1cmlJZCI6ODAsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvYWRkQ2xpZW50Um9sZVVyaSIsImNsaWVudElkIjo0MDN9XSwiZXhwaXJlc0luIjozNjAwLCJpYXQiOjE0OTI5ODQxMjcsInRva2VuVHlwZSI6ImFjY2VzcyIsImV4cCI6MTQ5Mjk4NzcyNywiaXNzIjoiVWxib3JhIE9hdXRoMiBTZXJ2ZXIifQ.gyME0125ii8_pwDGgayC08kPzge9yHOBVcsDvcCthdI";
                        
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function () {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                };
                var me = {
                    role: "admin",
                    uri: "/rs/user/add",
                    scope: "read"
                };
                oauth2.authorize(req, res, me, validationUrl, function () {
                    console.log("In authorization callback");
                    assert(true);
                    done();
                });
            }, 1000);
        });
    });


});


