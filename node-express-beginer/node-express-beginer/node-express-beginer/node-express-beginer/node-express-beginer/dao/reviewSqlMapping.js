// dao/reviewSqlMapping.js
// CRUD SQL SCRIPT
var review = {
    insert:'insert into review(rating,comment,product_id,user_id) VALUES(?,?,?,?)',
    update:'update review set rating=?, comment=? where id=?',
    delete: 'delete from review where id=?',
    queryById: 'select id,rating,comment,product_id,user_id from review where id=?',
    queryAll: 'select id,rating,comment,product_id,user_id from review'
};

module.exports = review;