module.exports = (sequelize, dataTypes) => {
    let alias = "Author";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING
        }
    };

    let config = {
        tableName : "author",
        timestamps : false 
    };

    const Author = sequelize.define(alias, cols, config);

    Author.associate = function(models) {
        
    Author.hasMany(models.Book, {
        as : "books",
        foreignKey : "author_id"
    })

    
}

    return Author;
}