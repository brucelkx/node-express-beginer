var express = require('express');
var router = express.Router();
var reviewDao = require('../dao/reviewDao');
var userDao = require('../dao/userDao');

/* review routers */
router.get('/', function (req, res, next) {
    reviewDao.queryAll(req, res, next).
        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
            res.statusCode = 400;
            res.json(err);
        });
});

router.post('/', function (req, res, next) {
    reviewDao.validate_param(req, 'body').
        then(function () {
            return userDao.isCustomerUser(req.body.user_id)
        }).
        then(function () {
            return reviewDao.add(req, res, next);
        }).
        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
            res.statusCode = 400;
            res.json(err);
        });
});

router.get('/:id/', function (req, res, next) {
    reviewDao.validate_param(req, 'param').
        then(function () {
            return reviewDao.queryById(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
            res.statusCode = 400;
            res.json(err);
        });
});

router.put('/:id/', function (req, res, next) {
    reviewDao.validate_param(req, 'body').
        then(function () {
            return reviewDao.update(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
            res.statusCode = 400;
            res.json(err);
        });
});
router.delete('/:id/', function (req, res, next) {
    reviewDao.validate_param(req, 'param').
        then(function () {
            return reviewDao.delete(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
            res.statusCode = 400;
            res.json(err);
        });
});
module.exports = router;
