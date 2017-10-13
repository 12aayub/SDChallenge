'use strict';

var crypto = require('crypto')
var uuid = require('uuid/v1')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    salt: DataTypes.STRING,
    authToken: DataTypes.STRING,
    authTokenExpiration: DataTypes.DATE
  },
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.CompletedActivity,{
          foreignKey: 'userID'})
      }
    },
    setterMethods:{
          // Virtual method for password
          // Password does not exist in the database, but rather
          // it is transformed to the 'encryptedPassword' value and stored as that
      password(value){
        if(value){
          const salt = uuid()
          this.setDataValue('salt', salt)
          const hash = this.encrypt(value)
          this.setDataValue('encryptedPassword', hash)
        }
      }
    },
    instanceMethods:{
      toJSON(){
        return {
          id: this.get('id'),
          name: this.get('name'),
          email: this.get('email'),
          authToken: this.get('authToken'),
          authTokenExpiration: this.get('authTokenExpiration')
        }
      },
      setAuthToken(){
        const token = uuid()
        const expiration = new Date()
        expiration.setMonth(expiration.getMonth() + 1)
        this.setDataValue('authToken', token)
        this.setDataValue('authTokenExpiration', expiration)
      },
      // Method to encrypt any value using salt from user record
      encrypt(value){
        const salt = this.get('salt')
        return crypto.createHmac('sha512', salt)
          .update(value)
          .digest('hex')
      },

      // Checks to see if passed value matches encrypted password value from record
      verifyPassword(unverifiedPassword){
        //encrypt unverifiedPassword
        const encryptedUnverifiedPassword = this.encrypt(unverifiedPassword)
        //compare encryptedUnverifiedPassword with password
        return encryptedUnverifiedPassword === this.get('encryptedPassword')
      },
      authExpired(){
        console.log("expiration ", this.get('authTokenExpiration') < new Date())
        return this.get('authTokenExpiration') < new Date()
      }
    },
    hooks:{

      // Adds a hook to generate the users token when user is created
      beforeCreate: function(user, options){
        user.setAuthToken()
      }

    }
  });
  return User;
};
