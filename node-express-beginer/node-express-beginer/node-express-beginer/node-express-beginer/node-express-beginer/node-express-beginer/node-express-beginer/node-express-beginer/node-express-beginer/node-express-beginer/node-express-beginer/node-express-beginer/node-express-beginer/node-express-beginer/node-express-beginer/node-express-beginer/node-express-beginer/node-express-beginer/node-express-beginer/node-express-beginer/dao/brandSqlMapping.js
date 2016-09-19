// dao/brandSqlMapping.js
// CRUD SQL SCRIPT
var brand = {
    insert:'insert into brand(name, description) VALUES(?,?)',
    update:'update brand set name=?, description=? where id=?',
    delete: 'delete from brand where id=?',
    queryById: 'select id,name, description from brand where id=?',
    queryAll: 'select id,name, description from brand'
};

module.exports = brand;