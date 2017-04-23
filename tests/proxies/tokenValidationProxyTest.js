var assert = require('assert');
var tokenValidationProxy = require("../../proxies/tokenValidationProxy");

describe('tokenValidationProxy', function () {
    this.timeout(20000);
    var validationUrl = "http://localhost:3000/rs/token/validate";


    describe('#validateAccessToken()', function () {
        it('should fail to validateAccess token', function (done) {

            var json = {
                accessToken: "dadsfndslknfds",
                userId: "kaff4",
                clientId: 333,
                role: "admin",
                uri: "http://localhost/rs/role/add",
                scope: "write"
            };            
            setTimeout(function () {
                tokenValidationProxy.validateAccessToken(json, validationUrl, function (result) {
                    console.log('validateAccessToken: ', JSON.stringify(result));
                    if (!result.valid) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    /*
    describe('#validateAccessToken()', function () {
        it('should validateAccess token', function (done) {

            var json = {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MiLCJncmFudCI6ImNsaWVudF9jcmVkZW50aWFscyIsImNsaWVudElkIjo0MDMsInJvbGVVcmlzIjpbeyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoyMDAsInVyaSI6Ii9ycy9yb2xlL2xpc3QiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE2OCwidXJpIjoiL3JzL3VzZXIvYWRkIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoyMDEsInVyaSI6Ii9ycy9tYWlsL3NlbmQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE5MiwidXJpIjoiL3JzL3VzZXIvdXBkYXRlIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoxOTMsInVyaSI6Ii9ycy91c2VyL2dldCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk0LCJ1cmkiOiIvcnMvdXNlci9kZWxldGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjE5NSwidXJpIjoiL3JzL3VzZXIvbGlzdCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6NjIsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvYWRkQ2xpZW50IiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjEsInJvbGUiOiJhZG1pbiIsInVyaUlkIjoxOTYsInVyaSI6Ii9ycy9yb2xlL2FkZCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk4LCJ1cmkiOiIvcnMvcm9sZS9nZXQiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjYzLCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL3VwZGF0ZUNsaWVudCIsImNsaWVudElkIjo0MDN9LHsiY2xpZW50Um9sZUlkIjoxLCJyb2xlIjoiYWRtaW4iLCJ1cmlJZCI6MTk5LCJ1cmkiOiIvcnMvcm9sZS9kZWxldGUiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6MSwicm9sZSI6ImFkbWluIiwidXJpSWQiOjc3LCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL2FkZENsaWVudFNjb3BlIiwiY2xpZW50SWQiOjQwM30seyJjbGllbnRSb2xlSWQiOjIsInJvbGUiOiJ1c2VyIiwidXJpSWQiOjY4LCJ1cmkiOiJodHRwOi8vbG9jYWxob3N0L3JzL2RlbGV0ZUNsaWVudEFsbG93ZWRVcmkiLCJjbGllbnRJZCI6NDAzfSx7ImNsaWVudFJvbGVJZCI6Miwicm9sZSI6InVzZXIiLCJ1cmlJZCI6ODAsInVyaSI6Imh0dHA6Ly9sb2NhbGhvc3QvcnMvYWRkQ2xpZW50Um9sZVVyaSIsImNsaWVudElkIjo0MDN9XSwiZXhwaXJlc0luIjozNjAwLCJpYXQiOjE0OTI5NzgwODcsInRva2VuVHlwZSI6ImFjY2VzcyIsImV4cCI6MTQ5Mjk4MTY4NywiaXNzIjoiVWxib3JhIE9hdXRoMiBTZXJ2ZXIifQ.-pNpEhWCfZGs9wOYUdJcZm8R6zvTOjjhR6ztPeoAtHM",
                clientId: 403,
                role: "admin",
                uri: "/rs/role/add",
                scope: "write"
            };
            setTimeout(function () {
                tokenValidationProxy.validateAccessToken(json, validationUrl, function (result) {
                    console.log('validateAccessToken: ', JSON.stringify(result));
                    if (result.valid) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    */
});



