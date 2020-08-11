module.exports = function (sequelize, dataTypes){
    let alias = "tours";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.INTEGER
        },
        tour_tipo:{
            type: dataTypes.INTEGER
        },
        vista_home:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        descripcion_corta:{
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
        image_grande:{
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName : "tours",
        timestamps : false
    }

    let tours = sequelize.define(alias, cols, config);

    /* Asociacion con Tipos de Tours */
    tours.associate = function (models){
        tours.belongsTo(models.tourType, {
        as: "toursType",
        foreignKey: "tour_tipo"
    });

    /* Asociacion con tours_reservados */
         tours.hasMany(models.tours_reservados, {
        as: "toursCarrito",
        foreignKey: "tour_id",
    });

    }

    return tours;
}
