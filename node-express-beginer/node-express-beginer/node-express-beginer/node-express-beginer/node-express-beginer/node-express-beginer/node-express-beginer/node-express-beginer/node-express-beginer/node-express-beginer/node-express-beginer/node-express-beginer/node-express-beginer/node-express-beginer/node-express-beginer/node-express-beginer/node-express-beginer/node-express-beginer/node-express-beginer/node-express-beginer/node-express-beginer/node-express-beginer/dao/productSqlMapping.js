// dao/productSqlMapping.js
// CRUD SQL SCRIPT
var product = {
    insert:'insert into product(name,price,color,status,description,brand_id) VALUES(?,?,?,?,?,?)',
    update:'update product set name=?, price=?, color=?,status=?,description=?,brand_id=? where id=?',
    delete: 'delete from product where id=?',
    queryById: 'select p.id ,p.name,p.price,p.color,p.status,b.name as brand_name , ' +
            ' IFNULL(r.user_name,"") as reviewer,IFNULL(r.comment,"") as comment ,p.description,p.create_date ' +
            ' from product as p inner join brand as b on p.brand_id=b.id ' +
            ' left join last_review_product r on r.product_id=p.id and r.product_id=?' +
            ' where p.id=?',
    queryAll: 'select p.id ,p.name,p.price,p.color,p.status,b.name as brand_name , ' +
        ' IFNULL(r.user_name,"") as reviewer,IFNULL(r.comment,"") as comment ,p.description,p.create_date ' +
        ' from '
};

module.exports = product;
