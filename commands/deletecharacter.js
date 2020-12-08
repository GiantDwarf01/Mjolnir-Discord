const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'deletecharacter',
    description: 'Deletes a character for yourself or the given user',
    usage: `[user]`,
    execute(message, args) {
        let user = null;
        if (!args.length) {
            user = message.author;
        } else {
            user = message.mentions.members.first();
        }

        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        delete characters[user.id];
        fs.writeFileSync('data/characters.json', JSON.stringify(characters, undefined, 5));
        return message.channel.send(`${user} character deleted`);
    }
}