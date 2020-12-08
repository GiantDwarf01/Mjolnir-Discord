const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'stat',
    description: 'Check your character!',
    usage: `[user]`,
    execute(message, args) {
        let user = null;
        if (!args.length) {
            user = message.author;
        } else {
            user = message.mentions.members.first();
        }

        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        if (!characters[user.id]) return message.channel.send(`${user} doesn't currently have a character! Create or assign one with \\newcharacter`);

        let curCharacter = characters[user.id]
        let xpToLevel = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
        let level = 0
        let xpNext = 0
        for (let i = 0; i < xpToLevel.length; i++) {
            if (xpToLevel[i] > parseInt(curCharacter.xp)) {
                level = i;
                xpNext = xpToLevel[i];
                break;
            }
        }



        const embed = new Discord.MessageEmbed().setColor("#0099FF").setTitle(curCharacter.name).setDescription(`${curCharacter.race} ${curCharacter.class} - Level ${level} (${curCharacter.xp}/${xpNext})`).addFields(
            { name: `STR`, value: `${curCharacter.str} (${curCharacter.str >= 10 ? '+' : ''}${Math.floor((curCharacter.str - 10)/2)})`, inline: true },
            { name: `DEX`, value: `${curCharacter.dex} (${curCharacter.dex >= 10 ? '+' : ''}${Math.floor((curCharacter.dex - 10)/2)})`, inline: true },
            { name: `CON`, value: `${curCharacter.con} (${curCharacter.con >= 10 ? '+' : ''}${Math.floor((curCharacter.con - 10)/2)})`, inline: true },
            { name: `INT`, value: `${curCharacter.int} (${curCharacter.int >= 10 ? '+' : ''}${Math.floor((curCharacter.int - 10)/2)})`, inline: true },
            { name: `WIS`, value: `${curCharacter.wis} (${curCharacter.wis >= 10 ? '+' : ''}${Math.floor((curCharacter.wis - 10)/2)})`, inline: true },
            { name: `CHA`, value: `${curCharacter.cha} (${curCharacter.cha >= 10 ? '+' : ''}${Math.floor((curCharacter.cha - 10)/2)})`, inline: true },
        )
        return message.channel.send(embed);
    }
}