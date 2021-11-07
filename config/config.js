require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.HOST,
        "dialect": process.env.DB_DIALECT,
        "underscore":true,
        "define": {
          "timestamps": false
        },
        "logging": false   
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.HOST,
        "dialect": process.env.DB_DIALECT
    },
    "production": {
        "use_env_variable": "DATABASE_URL",
        "dialect": "postgres",
        "define": {
          "timestamps": false
        },             
        "dialectOptions": {
           "ssl": {
             "require": true,
             "rejectUnauthorized": false
           }
         }
       }    
}