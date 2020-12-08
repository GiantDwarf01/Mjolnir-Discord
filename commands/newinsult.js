const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'newinsult',
    description: 'Adds a new insult to the bully pool. Make sure to add a space for the victim at the front',
    args: true,
    usage: '<insult>',
	execute(message, args) {
        let insults = JSON.parse(fs.readFileSync('data/insults.json'));

        const newInsult = args.join(" ")
        insults.push(newInsult);
        //console.log(JSON.stringify(insults));
        fs.writeFileSync('data/insults.json', JSON.stringify(insults));
	}
};