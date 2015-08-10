var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

    req.db.collection('users').find({}).toArray(function (err, docs) {

        if (err) res.send(err);
        else res.send(docs);
    });
});

/* POST add user */
router.post('/', function (req, res, next) {

    // add to database
    req.db.collection('users').insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, function(err, result) {

        if (err) res.send(err);
        else {

            req.db.collection('users').find({}).toArray(function (err, docs) {

                if (err) res.send(err);
                else res.send(docs);
            });
        }
    });
});

/* DELETE delete user */
router.delete('/:id', function (req, res, next) {

    // try to create an ObjectID
    try {
        var objectId = new req.ObjectID(req.params.id);
    } catch (e) {
        throw e;
    }

    // add to database
    req.db.collection('users').remove({
        _id: objectId
    }, function(err, result) {

        if (err) res.send(err);
        else {

            req.db.collection('users').find({}).toArray(function (err, docs) {

                if (err) res.send(err);
                else res.send(docs);
            });
        }
    });
});

module.exports = router;
