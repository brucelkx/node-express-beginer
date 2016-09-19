
# node express demo for beginer 

## Build API Service Environment:

* os: mac 10.11.5
* node:v6.3.0
* mysql:5.7.14

## Sample To RUN
notes: need install nodejs, express,express-generator global first

* **step1: create database**
    create database schema and init data by execute sql script file:

    ```console
    mysql>source your_path/techTest/sql_script/ddl_sql;
    mysql>source your_path/techTest/sql_script/dml_sql;
    ```
    notes:if any issues happen please try to execute each sql segment from ddl_sql and dml_sql files;

* **step2: install dependence package**
    ```console
    npm install express -g
    npm install express-generator -g
    npm install
    ```

    notes: need install nodejs, express,express-generator global first


*  **step3: run server**
   ```consolw
   command: npm start
        will start api server at: http://localhost:3000
   ```

*  **step4: test api by using:**
      mocha and supertest:
    ```console
    1.install
        npm install --save-dev supertest
        npm install --save-dev mocha
    2.run test:
     command:
        npm test
            or
        node_modules/.bin/mocha -R spec tests/spec.js
    ```

