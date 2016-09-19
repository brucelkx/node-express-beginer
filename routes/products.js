var express = require('express');
var router = express.Router();
var productDao = require('../dao/productDao');

/*  products routers. */
router.get('/', function (req, res, next) {
   productDao.queryAll(req, res, next).
        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
           res.statusCode = 400;
           res.json(err);
        });
});

router.post('/', function (req, res, next) {
    productDao.validate_param(req, 'body').
        then(function () {
            return productDao.add(req, res, next)
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
    productDao.validate_param(req, 'param').
        then(function () {
            return productDao.queryById(req, res, next);
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
    productDao.validate_param(req, 'body').
        then(function () {
            return productDao.update(req, res, next);
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
    productDao.validate_param(req, 'param').
        then(function () {
            return productDao.delete(req, res, next);
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
