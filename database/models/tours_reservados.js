module.exports = function (sequelize, dataTypes){
    let alias = "tours_reservados";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        orden_de_compra: {
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        tour_id: {
            type: dataTypes.INTEGER
        },
        cant_adultos: {
            type: dataTypes.INTEGER
        },
        fecha_tour: {
            type: dataTypes.DATE
        },
        horario: {
            type: dataTypes.STRING
        },
        estado_reserva: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName : "tours_reservados",
        timestamps : false
    };

    let tours_reservados = sequelize.define(alias, cols, config);
   
/* Asociacion con Usuarios */
    tours_reservados.associate = function (models){
        tours_reservados.belongsTo(models.usuarios, {
        as: "usuariosCarrito",
        foreignKey: "user_id"
    });

/* Asociacion con tours */
    tours_reservados.belongsTo(models.tours, {
        as: "tours",
        foreignKey: "tour_id"
    }); 
    }

    return tours_reservados;
}