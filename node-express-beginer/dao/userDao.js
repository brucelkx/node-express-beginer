// dao/userDao.js
// operate with mysql table of user
var mysql = require('promise-mysql');
var Promise = require('promise');
var $conf = require('../config/db');
var $sql = require('./userSqlMapping');


// using pool to improve performance
var pool = mysql.createPool($conf.mysql);

var validator_body_schema = {
    'name': {
        notEmpty: {
            errorMessage: 'name required'
        },
        isLength: {
            options: [{min: 1, max: 20}],
            errorMessage: 'name must be between 1 and 20 chars long'
        }
    },
    'user_type': {
        notEmpty: {
            errorMessage: 'user_type required'
        },
        isValidUser: {
            errorMessage: 'user_type must be one of (customer,merchant)'
        }
    },
    'birthday': {
        notEmpty: {
            errorMessage: 'birthday required'
        },
        isDate: {
            errorMessage: 'invalid date format'
        }
    },
    'email': {
        notEmpty: {
            errorMessage: 'email required'
        },
        isEmail: {errorMessage: 'invalid email'}
    }
};

var validator_param_schema = {
    'id': {
        notEmpty: {
            errorMessage: 'url param product id required'
        },
        isInt: {errorMessage: 'url param product id must be int type'}
    }
};


function validate_param(req, type) {
    return new Promise(function (resolve, reject) {
        if (type == 'body') {
            req.checkBody(validator_body_schema);
        }
        else if (type == 'param') {
            req.checkParams(validator_param_schema);
        }

        var errors = req.validationErrors();
        if (errors) {
            return reject({
                code: 400,
                msg: 'invalid params',
                result: errors
            });
        }

        return resolve();
    });
}

module.exports = {
    validate_param: function (req, valid_type) {
        return validate_param(req, valid_type);
    },
    isCustomerUser: function (user_id) {
        return new Promise(function (resolve, reject) {
            pool.getConnection().then(function (connection) {
                connection.query($sql.isCustomerUser, user_id).then(
                    function(result){
                    return resolve({
                            code: 200,
                            msg: 'user exists and type is customer',
                            result: result
                        });
                }).catch(function(err){
                        return reject({
                            code: 400,
                            msg: 'user not exists or type is not customer',
                            result: err
                        });

                    });

            }).catch(function(err){
                        return reject({
                            code: 400,
                            msg: 'user not exists or type is not customer',
                            result: err
                        });

                    });

        });
    },
    add: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // get parameters from request
            var param = req.body;
            pool.getConnection().then(function (connection) {
                // create review
                connection.query($sql.insert, [param.name, param.user_type, param.email, param.birthday])
                    .then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'add user success',
                            result: result
                        });
                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'add user fail',
                            result: err
                        });
                    });

            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'add user fail',
                    result: err
                });
            });
        });
    },
    delete: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // delete by Id
            pool.getConnection().then(function (connection) {
                var id = +req.params.id;
                connection.query($sql.delete, id).then(function (result) {
                    return resolve({
                        code: 200,
                        msg: 'delete user success',
                        result: result
                    });
                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'delete user fail',
                        result: err
                    });
                });

            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'delete user fail',
                    result: err
                });
            });
        });
    },
    update: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            var param = req.body;
            pool.getConnection().then(function (connection) {
                // get parameters from request

                var id = +req.params.id;

                // update review data
                connection.query($sql.update, [param.name, param.user_type, param.email, param.birthday,id])
                    .then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'update user success',
                            result: result
                        });
                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'update user fail',
                            result: err
                        });
                    });


            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'update user fail',
                    result: err
                });
            });

        });
    },
    queryById: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            var id = +req.params.id; //
            pool.getConnection().then(function (connection) {
                connection.query($sql.queryById, id).then(function (result) {
                    return resolve({
                        code: 200,
                        msg: 'get user success',
                        result: result
                    });

                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'get user fail',
                        result: err
                    });
                });
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get user fail',
                    result: err
                });
            });

        });
    },
    queryAll: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            pool.getConnection().then(function (connection) {
                connection.query($sql.queryAll).then(function (result) {
                    return resolve({
                        code: 200,
                        msg: 'get users success',
                        result: result
                    });
                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'get users fail',
                        result: err
                    });
                });
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get users fail',
                    result: err
                });
            });

        });
    }


};
