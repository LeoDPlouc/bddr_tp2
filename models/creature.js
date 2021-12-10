const { DataTypes } = require("sequelize")
const Connector = require("../connector")

const Creature = Connector.define("Creature", {
    name: {
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name shouldn't be empty"
            }
        }
    }
})

Creature.sync().catch((err) => console.error(err))

module.exports = Creature