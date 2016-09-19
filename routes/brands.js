var express = require('express');
var router = express.Router();
var brandDao = require('../dao/brandDao');

/* brand routers */
router.get('/', function(req, res, next) {
  brandDao.queryAll(req,res,next).
      then(function(result){
        res.json(result);
      }).
      catch(function(err) {
          res.statusCode = 400;
          res.json(err);
      });
});

router.post('/', function(req, res, next) {
  brandDao.validate_param(req, 'body').
        then(function () {
            return brandDao.add(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
          res.statusCode = 400;
            res.json(err);
        });
});

router.get('/:id/', function(req, res, next) {
  brandDao.validate_param(req, 'param').
        then(function () {
            return brandDao.queryById(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
          res.statusCode = 400;
            res.json(err);
        });
});

router.put('/:id/', function(req, res, next) {
  brandDao.validate_param(req, 'body').
        then(function () {
            return brandDao.update(req, res, next);
        }).

        then(function (result) {
            res.json(result);
        }).
        catch(function (err) {
          res.statusCode = 400;
            res.json(err);
        });
});

router.delete('/:id/', function(req, res, next) {
  brandDao.validate_param(req, 'param').
        then(function () {
            return brandDao.delete(req, res, next);
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
