module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        first_name : {
            type : dataTypes.STRING
        },
        last_name : {
            type : dataTypes.STRING
        },
        email : {
            type : dataTypes.STRING
        },
        password : {
            type : dataTypes.STRING
        },
        avatar : {
            type : dataTypes.STRING
        },
        status : {
            type : dataTypes.INTEGER
        }
    };

    let config = {
        tableName : "users",
        timestamps : false 
    };

    const User = sequelize.define(alias, cols, config);

    // Album.associate = function(models) {
    //     Album.belongsTo(models.Artistas, {
    //         as : "artistas",
    //         foreignKey : "id_artista"
    //     })
    // }

    return User;
}