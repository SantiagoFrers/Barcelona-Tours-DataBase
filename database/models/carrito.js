module.exports = function (sequelize, dataTypes){
    let alias = "carrito";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        tour_id: {
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName : "carrito",
        timestamps : false
    };

    let carrito = sequelize.define(alias, cols, config);
   
/* Asociacion con Usuarios */
    carrito.associate = function (models){
        carrito.belongsTo(models.usuarios, {
        as: "usuariosCarrito",
        foreignKey: "user_id"
    });

/* Asociacion con tours */
        carrito.hasMany(models.tours, {
        as: "toursCarrito",
        foreignKey: "id"
    }); 
    }

    return carrito;
}