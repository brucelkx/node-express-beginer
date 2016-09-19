/**
 * Created by bruce on 16/9/15.
 */
var supertest = require('supertest'),
    assert = require('assert'),
    app = require('../app');

describe('user api test', function () {
    var user_id;
    beforeEach(function () {

    });
    afterEach(function () {

    });

    it('get user list:request to get /users/', function testUserList(done) {
        supertest(app)
            .get('/users/')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('add user:request to post  /users/', function testAddUser(done) {
        supertest(app)
            .post('/users/')
            .send({"name": "bruce1", "user_type": "customer", "email": "test991@user.com", "birthday": "2016-10-11"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                user_id=res.body.result.insertId;
                return done();
          });
    });

    it('update user:request to put  /users/:id', function testAddUser(done) {
        supertest(app)
            .put('/users/' + user_id + '/')
            .send({"name": "bruce1upate", "user_type": "customer", "email": "test991@user.com", "birthday": "2016-10-11"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                return done();
          });
    });

    it('get user by id :request to get /users/:id/', function testUserList(done) {
        supertest(app)
            .get('/users/' + user_id + '/')
            .expect(200)
            .end(function(err,res){
                assert.equal(res.body.code,200);
                assert.equal(res.body.result[0].name,'bruce1upate');
                return done();
            });
    });

     it('delete user by id :request to delete /users/:id/', function testUserList(done) {
        supertest(app)
            .delete('/users/' + user_id + '/')
            .expect(200, done);
    });

    it('invalid param test user_type:request to post  /users/', function testAddUser(done) {
        supertest(app)
            .post('/users/')
            .send({"name": "bruce1", "user_type": "xxxxx", "email": "test991@user.com", "birthday": "2016-10-11"})
            .expect(400,done);

    });

    it('invalid param test email:request to post  /users/', function testAddUser(done) {
        supertest(app)
            .post('/users/')
            .send({"name": "bruce1", "user_type": "customer", "email": "test991user.com", "birthday": "2016-10-11"})
            .expect(400,done);

    });

    it('invalid param test birthday:request to post  /users/', function testAddUser(done) {
        supertest(app)
            .post('/users/')
            .send({"name": "bruce1", "user_type": "customer", "email": "test991user.com", "birthday": "2016-10-11:11:22"})
            .expect(400,done);

    });
});


describe('brand api test', function () {
    var brand_id;
    var prefix='/brands/'
    beforeEach(function () {

    });
    afterEach(function () {

    });

    it('get brand list:request to get /brands/', function testBrandList(done) {
        supertest(app)
            .get(prefix)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('add brand:request to post  /brands/', function testAddBrand(done) {
        supertest(app)
            .post(prefix)
            .send({"name": "brandtest", "description":"test001"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                brand_id=res.body.result.insertId;
                return done();
          });
    });

    it('update brand:request to put  /brands/:id', function testUpdateBrand(done) {
        supertest(app)
            .put(prefix + brand_id + '/')
            .send({"name": "brandtest01", "description":"test001"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                return done();
          });
    });

    it('get brand by id :request to get /brands/:id/', function testGetBrand(done) {
        supertest(app)
            .get(prefix + brand_id + '/')
            .expect(200)
            .end(function(err,res){
                assert.equal(res.body.code,200);
                assert.equal(res.body.result[0].name,'brandtest01');
                return done();
            });
    });

     it('delete brand by id :request to delete /brands/:id/', function testDelBrand(done) {
        supertest(app)
            .delete(prefix + brand_id + '/')
            .expect(200, done);
    });

});



describe('product api test', function () {
    var brand_id;
    var product_id;
    var prefix='/products/'
    beforeEach(function () {

    });
    afterEach(function () {

    });

    it('get product list:request to get /products/', function testProductList(done) {
        supertest(app)
            .get(prefix)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('add brand:request to post  /brands/', function testAddBrand(done) {
        supertest(app)
            .post('/brands/')
            .send({"name": "brandtest", "description":"test001"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                brand_id=res.body.result.insertId;
                return done();
          });
    });

    it('add product:request to post  /products/', function testAddProduct(done) {
        supertest(app)
            .post(prefix)
            .send({"name": "product002",
                "price": 100.5,
                "color": "red",
                "status": "in-stock",
                "description":"dddddd",
                "brand_id": brand_id})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                product_id=res.body.result.insertId;
                return done();
          });
    });

    it('update product:request to put  /products/:id', function testUpdateProduct(done) {
        supertest(app)
            .put(prefix + product_id + '/')
            .send({"name": "product002update",
                "price": 100.5,
                "color": "red",
                "status": "in-stock",
                "description":"update",
                "brand_id": brand_id})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                return done();
          });
    });

    it('get product by id :request to get /products/:id/', function testGetProduct(done) {
        supertest(app)
            .get(prefix + product_id + '/')
            .expect(200)
            .end(function(err,res){
                assert.equal(res.body.code,200);
                assert.equal(res.body.result[0].name,'product002update');
                return done();
            });
    });

     it('delete product by id :request to delete /products/:id/', function testDelProduct(done) {
        supertest(app)
            .delete(prefix + product_id + '/')
            .expect(200, done);
    });

    it('invalid param price :request to put  /products/:id', function testInvalidPrice(done) {
        supertest(app)
            .put(prefix + product_id + '/')
            .send({"name": "product002update",
                "price": "100.5a",
                "color": "red",
                "status": "in-stock",
                "description":"update",
                "brand_id": brand_id})
            .expect(400,done);

    });

    it('invalid param color :request to put  /products/:id', function testInvalidColor(done) {
        supertest(app)
            .put(prefix + product_id + '/')
            .send({"name": "product002update",
                "price": "100.5a",
                "color": "color",
                "status": "in-stock",
                "description":"update",
                "brand_id": brand_id})
            .expect(400,done);

    });

    it('invalid param status :request to put  /products/:id', function testInvalidStatus(done) {
        supertest(app)
            .put(prefix + product_id + '/')
            .send({"name": "product002update",
                "price": "100.5a",
                "color": "color",
                "status": "in-stock-aaa",
                "description":"update",
                "brand_id": brand_id})
            .expect(400,done);

    });

     it('delete test data brand by id :request to delete /brands/:id/', function testDelBrand(done) {
        supertest(app)
            .delete(prefix + brand_id + '/')
            .expect(200, done);
    });

});


describe('review api test', function () {
    var user_id;
    var product_id;
    var review_id;
    var prefix='/reviews/'
    beforeEach(function () {

    });
    afterEach(function () {

    });

    it('get review list:request to get /reviews/', function testReviewtList(done) {
        supertest(app)
            .get(prefix)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('add user:request to post  /users/', function testAddUser(done) {
        supertest(app)
            .post('/users/')
            .send({"name": "bruce1", "user_type": "customer", "email": "test9911@user.com", "birthday": "2016-10-11"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                user_id=res.body.result.insertId;
                return done();
          });
    });
    it('add brand:request to post  /brands/', function testAddBrand(done) {
        supertest(app)
            .post('/brands/')
            .send({"name": "brandtest", "description":"test001"})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                brand_id=res.body.result.insertId;
                return done();
          });
    });
    it('add product:request to post  /products/', function testAddProduct(done) {
        supertest(app)
            .post('/products/')
            .send({"name": "product002",
                "price": 100.5,
                "color": "red",
                "status": "in-stock",
                "description":"dddddd",
                "brand_id": brand_id})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                product_id=res.body.result.insertId;
                return done();
          });
    });

    it('add review:request to post  /reviews/', function testAddReview(done) {
        supertest(app)
            .post(prefix)
            .send({"rating": 1,
                  "comment": "great product 23232",
                  "product_id": product_id,
                  "user_id": user_id})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                review_id=res.body.result.insertId;
                return done();
          });
    });

    it('update review:request to put  /reviews/:id', function testUpdateReview(done) {
        supertest(app)
            .put(prefix + review_id + '/')
            .send({"rating": 1,
                  "comment": "update comment",
                  "product_id": product_id,
                  "user_id": user_id})
            .expect(200).end(function(err, res){
                assert.ok(!err);
                assert.equal(res.body.code,200);
                return done();
          });
    });

    it('get review by id :request to get /reviews/:id/', function testGetReview(done) {
        supertest(app)
            .get(prefix + review_id + '/')
            .expect(200)
            .end(function(err,res){
                assert.equal(res.body.code,200);
                assert.equal(res.body.result[0].comment,'update comment');
                return done();
            });
    });

     it('delete review by id :request to delete /reviews/:id/', function testDelReview(done) {
        supertest(app)
            .delete(prefix + review_id + '/')
            .expect(200, done);
    });

    it('invalid param rating :request to put  /review/:id', function testUpdateProduct(done) {
        supertest(app)
            .put(prefix + review_id + '/')
            .send({"rating": 111,
                  "comment": "update comment",
                  "product_id": product_id,
                  "user_id": user_id})
            .expect(400,done);

    });

    it('delete test data user by id :request to delete /users/:id/', function testUserList(done) {
            supertest(app)
                .delete('/users/' + user_id + '/')
                .expect(200, done);
        });

    it('delete test data product by id :request to delete /products/:id/', function testDelProduct(done) {
        supertest(app)
            .delete('/products/' + product_id + '/')
            .expect(200, done);
    });

    it('delete test data brand by id :request to delete /brands/:id/', function testDelBrand(done) {
        supertest(app)
            .delete('/brands/' + brand_id + '/')
            .expect(200, done);
    });
});



app.close;