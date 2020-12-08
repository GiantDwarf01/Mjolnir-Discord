const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'setxp',
    description: 'Set player XP!',
    args: true,
    admin: true,
    usage: `<user> <xp>`,
    execute(message, args) {
        if (args.length < 2) return message.channel.send(`You didn't pass the required arguments, ${message.author}!`);

        let player = message.mentions.members.first();
        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        if (!characters[player.id]) return message.channel.send(`${player} doesn't have a character! Make one with \\newcharacter`);

        characters[player.id].xp = parseInt(args[1]);
        fs.writeFileSync('data/characters.json', JSON.stringify(characters, null, 4));
    }
}