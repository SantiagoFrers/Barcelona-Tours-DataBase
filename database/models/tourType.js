module.exports = function (sequelize, dataTypes){
    let alias = "tourType";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        tipo: {
            type: dataTypes.STRING
        }
    };
    
    let config = {
        tableName : "tours_type",
        timestamps : false
    }
    
    let tourType = sequelize.define(alias, cols, config);
    
    /* Asociacion con Tours */
    tourType.associate = function (models){
        tourType.hasMany(models.tours, {
        as: "tours",
        foreignKey: "tour_tipo"
    });
    }
    
    return tourType;
    }