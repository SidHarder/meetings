var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/meeting';
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var expressJWT = require('express-jwt');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressJWT({ secret: 'hello world' }).unless({ path: ['/login'] }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', function(req, res) {
    if(!req.body.emailAddress) {
        res.status(401).send('Email Address is required.');
    }
    else if(!req.body.password) {
        res.status(401).send('Password is requred.');
    }
    else {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } 
            else {
                var collection = db.collection('member');
                collection.findOne({ emailAddress : req.params.emailAddress }, function (err, data) {
                    if(err) {
                        res.status(401).send({ status: 400, data: 'Email address not found.' });
                    }
                    else {
                        res.status(200).send({ status: 200, data: null });
                    }
                });
            }
        });   
    }
});

app.post('/slackoutgoingwebhook', function(req, res) {
    res.status(200).send({ "text" : "This is awesome." });
});

app.post('/slackintegration', function(req, res) {
    request({
        url: "https://hooks.slack.com/services/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",
        method: "POST",
        json: true,
        body: req.body
    }, function (error, response, body){
        console.log(response);
    });
    res.status(200).send({ status: 200, data: null });
});

app.get('/list/:collectionName', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            console.log('Connection established to', url);
            var collection = db.collection(req.params.collectionName);

            collection.find({organization: 'YPI'}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }  
                else {
                    console.log("List Sent:" + req.params.collectionName);
                    res.send(result);
                }
                db.close();
            });
        }
    });
});

app.get('/document/:collectionName/:_id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            console.log('Connection established to', url);
            var collection = db.collection(req.params.collectionName);
            
            collection.findOne({ _id: req.params._id }, function(err, result) {
                if(err) {
                    cosole.log(err);
                }
                else {
                    res.send(result)
                }
                db.close();
            });
        }
    });
});

app.get('/insert/:collectionName', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            console.log('Connection established to', url);
            var objectId = new mongodb.ObjectID();
    
            var newMeeting = {
                _id: objectId,
                organization: "YPI",
                name: "Unnamed",
                date: "1/1/2016"
            };
            
            var collection = db.collection('meeting');
            collection.insert(newMeeting);    
            res.send(newMeeting);
        }
    });
});

app.post('/delete/:collectionName/:_id', function(req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            console.log(req.params._id);
            var collection = db.collection(req.params.collectionName);
            collection.deleteOne({ _id : req.params._id }, function (err, data) {
                if(err) {
                    res.status(400).send({ status: 400, data: err });
                }
                else {
                    res.status(200).send({ status: 200, data: null });
                }
            });
        }
    });
});

app.post('/insert/:collectionName/', function(req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            var collection = db.collection(req.params.collectionName);
            collection.insertOne(req.body, function (err, data) {
                if(err) {
                    res.status(400).send({ status: 400, data: err });
                }
                else {
                    res.status(200).send({ status: 200, data: null });
                }
            });
        }
    });
});

app.post('/save/:collectionName/:_id', function(req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } 
        else {
            var collection = db.collection(req.params.collectionName);
            collection.update({ _id: req.params._id }, req.body, { upsert: false }, function (err, data) {
                if(err) {
                    res.status(400).send({ status: 400, data: err });
                }
                else {
                    res.status(200).send({ status: 200, data: null });
                }
            });
        }
    });
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});