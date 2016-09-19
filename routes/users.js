var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userDao.queryAll(req,res,next).
      then(function(result){
        res.json(result);
      }).
      catch(function(err) {
          res.statusCode = 400;
          res.json(err);
      });
});

router.post('/', function(req, res, next) {
  userDao.validate_param(req, 'body').
        then(function () {
            return userDao.add(req, res, next);
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
  userDao.validate_param(req, 'param').
        then(function () {
            return userDao.queryById(req, res, next);
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
  userDao.validate_param(req, 'body').
        then(function () {
            return userDao.update(req, res, next);
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
  userDao.validate_param(req, 'param').
        then(function () {
            return userDao.delete(req, res, next);
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
