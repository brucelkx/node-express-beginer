
node express demo for beginer 
=============================

Build api service base environment:

os: mac 10.11.5
node:v6.3.0
mysql:5.7.14

step1: create database
    create database schema and init data by execute sql script file:
    start mysql server then use command line as below:
    mysql>source your_path/techTest/sql_script/ddl_sql;
    mysql>source your_path/techTest/sql_script/dml_sql;

    notes:if any issues happen please try to execute each sql segment from ddl_sql and dml_sql files;

step2: install dependence package
    npm install express -g
    npm install express-generator -g
    npm install

    notes: need install nodejs, express,express-generator global first


step3: run server

   command: npm start
        will start api server at: http://localhost:3000


step4: test api by using: mocha and supertest:
    1.install
        npm install --save-dev supertest
        npm install --save-dev mocha
    2.run test:
     command:
        npm test
            or
        node_modules/.bin/mocha -R spec tests/spec.js



code change logs for feedback:

    • missing error handling in some callbacks, also beware code that executes after reject
        fix by return immediately

    • refactor in code validations
        fix by using express-validator package

    • demonstrate test cases
        fix by using mocha and supertest package

    • Optimize list sql query or refactor db structure.
        fix by refactor db structure and move db constrain check to node js code

    • stretch: try to wrap a promise friendly db connection wrapper
        fix by using promise-mysql package


