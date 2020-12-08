const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'xp',
    description: 'Check your xp!',
    usage: `[user]`,
    execute(message, args) {
        let user = null;
        if (!args.length) {
            user = message.author;
        } else {
            user = message.mentions.members.first();
        }

        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        if (!characters[user.id]) return message.channel.send(`${user} doesn't have a character! Make one with \\newcharacter`);

        let xpAmount = characters[user.id].xp || 0;
        let xpToLevel = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
        for (let i = 0; i < xpToLevel.length; i++) {
            if (xpToLevel[i] > parseInt(xpAmount)) {
                return message.channel.send(`${user} currently has ${xpAmount} XP. Only ${parseInt(xpToLevel[i] - xpAmount)} XP before you get to Level ${i + 1}!`);
            }
        }

        return message.channel.send(`${user} currently has ${xpAmount} XP`);
    }
}