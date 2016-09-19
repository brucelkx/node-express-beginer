// dao/userSqlMapping.js
// CRUD SQL SCRIPT
var user = {
    insert:'insert into user(name, user_type,email,birthday) VALUES(?,?,?,?)',
    update:'update user set name=?, user_type=?, email=?,birthday=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select id,name, user_type,email,DATE_FORMAT(birthday,"%Y-%m-%d") as birthday from user where id=?',
    queryAll: 'select id,name, user_type,email,DATE_FORMAT(birthday,"%Y-%m-%d") as birthday from user',
    isCustomerUser: 'select id from user where id=? and user_type="customer" '
};

module.exports = user;