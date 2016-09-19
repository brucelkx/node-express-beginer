// operate with mysql table of brand
var mysql = require('promise-mysql');
var Promise = require('promise');
var $conf = require('../config/db');
var $sql = require('./brandSqlMapping');


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

    'description': {
        notEmpty: {
            errorMessage: 'description required'
        }
    }
};

var validator_param_schema = {
    'id': {
        notEmpty: {
            errorMessage: 'url param brand id required'
        },
        isInt: {errorMessage: 'url param brand id must be int type'}
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
            pool.getConnection().then(function (connection) {
                var param = req.body;
                connection.query($sql.insert, [param.name, param.description]).
                    then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'add band success',
                            result: result
                        });
                    }).
                    catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'add brand fail',
                            result: err
                        });
                    })
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'add brand fail',
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
                        msg: 'delete brand success',
                        result: result
                    });
                }).catch(function (err) {
                    return reject({
                        code: 500,
                        msg: 'delete brand fail',
                        result: err
                    });

                });
            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'delete brand fail',
                    result: err
                });
            });
        });
    },
    update: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            var param = req.body;
            var id = +req.params.id;
            pool.getConnection().then(function (connection) {
                connection.query($sql.update, [param.name, param.description, id]).then(
                    function (result) {
                        return resolve({
                            code: 200,
                            msg: 'update brand success',
                            result: result
                        });
                    }).
                    catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'delete brand fail',
                            result: err
                        });

                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'delete brand fail',
                            result: err
                        });
                    });
            });
        });
    },
    queryById: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            var id = +req.params.id; //
            pool.getConnection().then(function (connection) {
                connection.query($sql.queryById, id).then(
                    function (result) {
                        return resolve({
                            code: 200,
                            msg: 'get brand success',
                            result: result
                        });
                    }
                ).catch(
                    function (err) {
                        return reject({
                            code: 500,
                            msg: 'get brand fail',
                            result: err
                        });
                    }
                );


            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get brand fail',
                    result: err
                });
            });

        });
    },
    queryAll: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            pool.getConnection().then(function (connection) {
                connection.query($sql.queryAll).then(
                    function (result) {
                        return resolve({
                            code: 200,
                            msg: 'get brand success',
                            result: result
                        });
                    }).catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'get brand fail',
                            result: err
                        });
                    });

            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'get brand fail',
                    result: err
                });
            });

        });
    }

};
