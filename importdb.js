const sequelize = require("sequelize")
const fs = require("fs")

const spellModel = require("./models/spell")
const creatureModel = require("./models/creature")
const junctionModel = require("./models/junction")

const spells = JSON.parse(fs.readFileSync("./spells.json", { encoding: "utf8" }))
const creatures = JSON.parse(fs.readFileSync("./creatures.json", { encoding: "utf8" }))


spells.forEach(spell => {
    (async () => {
        spell.spell_resistance = (spell.spell_resistance != "no")

        await spellModel.create(spell).catch(err => console.log(/*err*/))
    }
    )()
});

creatures.forEach(creatureJson => {
    (async () => {
        await creatureModel.create(creatureJson).then(async creature => {
            creatureJson.spells.forEach(spell => {
                (async () => {
                    var junction = await junctionModel.create({ CreatureName: creature.name, SpellName: spell }).catch(err => console.log(/*err*/))
                }
                )()
            })
        }).catch(err => console.log(/*err*/))
    }
    )()
})