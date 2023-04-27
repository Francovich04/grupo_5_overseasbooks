module.exports = (sequelize, dataTypes) => {
    let alias = "Book";

    let cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : dataTypes.STRING
        },
        price : {
            type : dataTypes.DECIMAL(10,2)
        },
        stock : {
            type : dataTypes.INTEGER
        },
        img : {
            type : dataTypes.STRING
        },
        author_id : {
            type : dataTypes.INTEGER
        },
        category_id : {
            type : dataTypes.INTEGER
        },
        description : {
            type : dataTypes.TEXT
        },
         color : {
            type : dataTypes.STRING
        }

    };

    let config = {
        tableName : "books",
        timestamps : false 
    };

    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Category, {
            as : "categories",
            foreignKey : "category_id"
        }),

        Book.belongsTo(models.Author, {
            as : "authors",
            foreignKey : "author_id"
        })

    }

    return Book;
}