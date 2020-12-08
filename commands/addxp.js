const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'addxp',
    description: 'Add xp to player!',
    args: true,
    admin: true,
    usage: `<user> <xp> [reason]`,
    execute(message, args) {
        if (args.length < 2) return message.channel.send(`You didn't pass the required arguments, ${message.author}!`);

        let player = message.mentions.members.first();
        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        if (!characters[player.id]) return message.channel.send(`${player} doesn't have a character! Make one with \\newcharacter`);

        let xpAmount = characters[player.id].xp || 0;
        characters[player.id].xp = xpAmount + parseInt(args[1]);
        fs.writeFileSync('data/characters.json', JSON.stringify(characters, null, 4));

        if (!args[2]) return message.channel.send(`${player} gets ${parseInt(args[1])} XP`);
        return message.channel.send(`${player} gets ${parseInt(args[1])} XP for ${args.slice(2,args.length).join(" ")}`);
    }
}