const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

//create User model
class User extends Model {
    //set up method to check password vs hashed password.
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
    //define an id column
    id: {
        //use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        //this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        //instruct that this is the primary key
        primaryKey: true,
        //turn on auto increment
        autoIncrement: true
    },
    // define a username column
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //defin an email collumn
    email: {

        type: DataTypes.STRING,
        allowNull: false,
        //there cannot be any duplicate email values in this table
        unique: true,
        // if allownull is set to false, we can run our data through validators before creating the table data
        validate: {
            isEmail: true
        }
    },
    //define password column
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //this means the password must be at  least four characters long
            len: [4]
        }
      }
    },

    {
        //table configuration options go here
            hooks: {
                //set up before create lifecycle hook functionality
                async beforeCreate(newUserData) {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                // set up beforeUpdate lifecycle "hook" functionality
                async beforeUpdate(updatedUserData) {
                    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
                }
            },
        //pass in our imported sequelize connection
        sequelize,
        // dont automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //dont pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    },


);

module.exports = User;