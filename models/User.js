const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User model
class User extends Model {}

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

    }

    },

    {
        //table configuration options go here

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
    }
);