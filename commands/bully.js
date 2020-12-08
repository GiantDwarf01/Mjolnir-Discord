const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'bully',
    description: 'Bullies the given person (defaults to Jonathan)',
	execute(message, args) {
        let user = message.mentions.members.first();

        let insults = JSON.parse(fs.readFileSync('data/insults.json'));

        if (!user) return message.client.users.fetch("611711287793025055").then(user => message.channel.send(`${user}${util.chooseRandom(insults)[0]}`));

        return message.channel.send(`${user}${util.chooseRandom(insults)[0]}`);
	}
};7