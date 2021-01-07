# Stylish Web

### Deployment

1. Install packages: ```npm install```
2. Start MySQL server
3. Import database:
    1. ```mysql -u <user_name> -p <stylish_db_name> < stylish_backend.sql```
    2. ```mysql -u <user_name> -p <stylish_test_db_name> < stylish_test.sql``` (Optional)
4. Create config: ```.env``` for backend (You can copy the schema from template: ```.env-template```)
    1. set `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` for MySQL server (`DB_DATABASE_TEST` is Optional)
    2. set `NODE_ENV` to `development` for development
    3. set `TAPPAY_PARTNER_KEY` for cash flow (copy from your STYLiSH project)
    4. set `AUTHENTICATION_CODE` for creating products & campaigns, you can choose arbitrary value for it. (look at `product_controller.js` and `marketing_controller.js` for more detail)
    5. set `BCRYPT_SALT` for password encryption (Optional)
5. Start a redis server in `localhost` at port `6379` (Optional, the server can still work without this, see ```marketing_controller.js``` for more detail)
6. Start server: ```nodemon app.js```
7. Clear Browser localStorage if needed. The same address will use the same space to records localStorage key-value pairs and it may conflict with mine. (Optional)

### Integration Test (Optional)

1. Import ```stylish_test.sql``` into database 
2. Set  ```DATABASE_TEST``` key to ```stylish_test``` 

#### For Macbook or Linux
3. Run integration test: ```npm run test```

#### For Windows:
3. Run integration test: ```npm run test_windows```