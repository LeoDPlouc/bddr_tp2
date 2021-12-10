const { DataTypes } = require("sequelize")
const Connector = require("../connector")

const Creature = require("./creature")

const Spell = Connector.define("Spell", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    levels: {
        type: DataTypes.STRING
    },
    components: {
        type: DataTypes.STRING
    },
    spell_resistance: {
        type: DataTypes.BOOLEAN
    },
    description: {
        type: DataTypes.TEXT
    }
});

Spell.sync({ alter: true }).catch((err) => console.error(err))

module.exports = Spell