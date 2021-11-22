const { DataTypes } = require("sequelize")
const { Connector } = require("../index")

const Creature = Connector.define("Creature", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name shouldn't be empty"
            }
        }
    }
})

Creature.sync({ alter: true }).catch((err) => console.error(err))

module.exports = Creature