// dao/productDao.js
// operate with mysql table of user
var mysql = require('promise-mysql');
var Promise = require('promise');
var $conf = require('../config/db');
var $sql = require('./productSqlMapping');
//var validator=require('validator')

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
    'price': {
        notEmpty: {
            errorMessage: 'price required'
        },
        isDecimal: {
            errorMessage: 'price must be decimal type'
        }
    },
    'color': {
        notEmpty: {
            errorMessage: 'color required'
        },
        isValidColor: {
            errorMessage: 'color must be one of (red,green,black)'
        }
    },
    'status': {
        notEmpty: {
            errorMessage: 'status required'
        },
        isValidProductStatus: {
            errorMessage: 'status must be one of (in-stock,out-stock,archived)'
        }
    },
    'description': {
        notEmpty: {
            errorMessage: 'description required'
        }
    },
    'brand_id': {
        notEmpty: {
            errorMessage: 'brand_id required'
        },
        isInt: {errorMessage: 'brand_id must be int type'}
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

var validator_query_schema = {
    'brand_id': {
        isInt: {errorMessage: 'query param brand_id must be int type'}
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
        else {
            req.checkQuery(validator_query_schema);
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
                // get parameters from request
                var param = req.body;
                // add new product
                connection.query($sql.insert, [param.name, param.price, param.color, param.status,
                    param.description, param.brand_id]).
                    then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'add product success',
                            result: result
                        });
                    }).
                    catch(function (err) {

                        return reject({
                            code: 500,
                            msg: 'add product fail',
                            result: err
                        });
                    });


            }).catch(function (err) {
                return reject({
                    code: 500,
                    msg: 'add product fail',
                    result: err
                });
            });
        });

    },
    delete: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // delete by Id
           pool.getConnection().then(function (connection)
           {
                var id = +req.params.id;
                connection.query($sql.delete, id).
                    then(function(result){
                        return resolve({
                            code: 200,
                            msg: 'delete product success',
                            result: result
                        });}).
                    catch(function(err){ return reject({
                            code: 500,
                            msg: 'delete product fail',
                            result: err
                        });
                    });


           }).catch(function(err){
               return reject({
                            code: 500,
                            msg: 'delete product fail',
                            result: err
                        });
               });
        });
    },
    update: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // get parameters from request
            var param = req.body;
            pool.getConnection().then(function (connection)
            {
                var id = +req.params.id;
                connection.query($sql.update, [param.name, param.price, param.color, param.status,
                            param.description, param.brand_id, id]).
                    then(function(result){
                        return resolve({
                            code: 200,
                            msg: 'update product success',
                            result: result
                        });
                    }).
                    catch(function(err){ return reject({
                            code: 500,
                            msg: 'update product fail',
                            result: err
                        });
                    });


            }).catch(function(err){
               return reject({
                            code: 500,
                            msg: 'update product fail',
                            result: err
                        });
               });
        });

    },
    queryById: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            // delete by Id
           pool.getConnection().then(function (connection)
           {
                var id = +req.params.id;
                connection.query($sql.queryById, [id,id]).
                    then(function(result){
                        return resolve({
                            code: 200,
                            msg: 'get product by id success',
                            result: result
                        });}).
                    catch(function(err){ return reject({
                            code: 500,
                            msg: 'get product by id fail',
                            result: err
                        });
                    });


           }).catch(function(err){
               return reject({
                            code: 500,
                            msg: 'get product by id fail',
                            result: err
                        });
               });
        });
    },
    queryAll: function (req, res, next) {
        return new Promise(function (resolve, reject) {
            if (req.query.brand_id) {
                req.checkQuery(validator_query_schema);
                var errors = req.validationErrors();
                if (errors) {
                    return reject({
                        code: 400,
                        msg: 'invalid params',
                        result: errors
                    });
                }
            }
            pool.getConnection().then(function (connection) {
                var brand_id = req.query.brand_id ? req.query.brand_id : null;
                var limit = req.query.limit ? req.query.limit : 10;
                var limit_product =' (select * from product   ';
                var brand_on=' inner join brand as b on p.brand_id=b.id ';
                var last_comment=' left join last_review_product r on r.product_id=p.id '
                if (brand_id) {
                    limit_product = limit_product + ' where brand_id=' + brand_id + ' order by id desc limit ' + limit
                    brand_on=brand_on + ' and  b.id= ' + brand_id
                }
                else {
                    limit_product = limit_product + ' order by id desc limit ' + limit

                }
                limit_product=limit_product + ') as p '
                var sql=$sql.queryAll + limit_product + brand_on + last_comment

                //console.log(sql)
                connection.query(sql).
                    then(function (result) {
                        return resolve({
                            code: 200,
                            msg: 'get product success',
                            result: result
                        });
                    }).
                    catch(function (err) {
                        return reject({
                            code: 500,
                            msg: 'get product fail',
                            result: err
                        });
                    });

            }).catch(function (err) {
                reject({
                    code: 500,
                    msg: 'get product fail',
                    result: err
                });
            })
        });
    }

};
