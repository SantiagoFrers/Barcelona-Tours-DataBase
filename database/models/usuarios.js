module.exports = function (sequelize, dataTypes){
    let alias = "usuarios";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        apellido:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        contrasena:{
            type: dataTypes.STRING
        },
        user_type:{
            type: dataTypes.STRING
        },
        avatar:{
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName : "users",
        timestamps : false
    }

    let usuarios = sequelize.define(alias, cols, config);

 /* Asociacion con tours_reservados */
 usuarios.associate = function (models){
    usuarios.hasMany(models.tours_reservados, {
    as: "usuarios",
    foreignKey: "user_id"
});
}
    return usuarios;
}