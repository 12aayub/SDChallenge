'use strict';

var crypto = require('crypto')
var uuid = require('uuid/v1')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    salt: DataTypes.STRING
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
          // authToken: this.get('authToken'),
          // authTokenExpiration: this.get('authTokenExpiration')
        }
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
    }


  });
  return User;
};
