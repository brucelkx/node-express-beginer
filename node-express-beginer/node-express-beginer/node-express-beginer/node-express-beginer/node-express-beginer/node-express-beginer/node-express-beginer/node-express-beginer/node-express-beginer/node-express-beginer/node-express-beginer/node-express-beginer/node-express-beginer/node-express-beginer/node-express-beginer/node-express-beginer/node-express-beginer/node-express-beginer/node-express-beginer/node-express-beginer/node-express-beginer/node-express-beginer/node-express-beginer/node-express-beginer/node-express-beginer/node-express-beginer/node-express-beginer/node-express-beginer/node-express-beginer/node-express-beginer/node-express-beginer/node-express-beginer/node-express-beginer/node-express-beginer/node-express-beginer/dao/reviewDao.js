// dao/reviewDao.js
// operate with mysql table of user
var mysql = require('promise-mysql');
var Promise = require('promise');
var $conf = require('../config/db');
var $sql = require('./reviewSqlMapping');


// using pool to improve performance
var pool = mysql.createPool($conf.mysql);

var validator_body_schema = {
    'rating': {
        notEmpty: {
            errorMessage: 'name required'
        },
        isInt: {
            options: [{min: 0, max: 10}],
            errorMessage: 'rating value must be between 0 and 10 '
        }
    },
    'comment': {
        notEmpty: {
            errorMessage: 'comment required'
        }
    },
    'user_id': {
        notEmpty: {
            errorMessage: 'user_id required'
        },
        isInt: {errorMessage: 'user_id must be int type'}
    },
    'product_id': {
        notEmpty: {
            errorMessage: 'product_id required'
        },
        isInt: {errorMessage: 'product_id must be int type'}
    }
};

var validator_param_schema = {
    'id': {
        notEmpty: {
            errorMessage: 'url param review id required'
        },
        isInt: {errorMessage: 'url param review id must be int type'}
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
    add: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // get parameters from request
            var param = req.body;

            pool.getConnection().then(function (connection) {
                // create review
                connection.query($sql.insert, [param.rating, param.comment, param.product_id, param.user_id])
                    .then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'add review success',
                            result: result
                        });
                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'add review fail',
                            result: err
                        });
                    });

            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'add review fail',
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
                        msg: 'delete review success',
                        result: result
                    });
                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'delete review fail',
                        result: err
                    });
                });

            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'delete review fail',
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
                connection.query($sql.update, [param.rating, param.comment, id])
                    .then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'update review success',
                            result: result
                        });
                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'update review fail',
                            result: err
                        });
                    });


            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'update review fail',
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
                        msg: 'get review success',
                        result: result
                    });

                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'get review fail',
                        result: err
                    });
                });
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get review fail',
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
                        msg: 'get all review success',
                        result: result
                    });
                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'get all review fail',
                        result: err
                    });
                });
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get all review fail',
                    result: err
                });
            });

        });
    }

};
