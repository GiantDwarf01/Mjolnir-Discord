const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {    
    name: 'newcharacter',
    description: 'Create a new character for yourself or the given user',
    usage: `[user]`,
    execute(message, args) {let user = null;
        if (!args.length) {
            user = message.author;
        } else {
            user = message.mentions.members.first();
        }

        const chan = message.channel;
        const filter = m => message.author.id === m.author.id;

        let characters = JSON.parse(fs.readFileSync('data/characters.json'));
        if (characters[user.id]) {
            return message.channel.send(`${user} already has a character. Use \\deletecharacter if you want to create a new character`);
        };

        let newCharacter = {}
        let top = null

        let member = message.guild.member(message.author);
        let nickname = member ? member.displayName : null;

        let embed = new Discord.MessageEmbed().setColor("#0099FF").setAuthor(`${nickname}'s Character`).setFooter(`What is your character's name?`);

        chan.send(embed).then(main => {
            top = main;
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let name = mes.first().content;
            newCharacter.name = name;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setFooter(`What is your character's race?`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let race = mes.first().content;
            newCharacter.race = race;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(newCharacter.race)
                .setFooter(`What is your character's class?`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let clas = mes.first().content;
            newCharacter.class = clas;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields( { name: `STR`, value: '?', inline: true }, { name: `DEX`, value: '?', inline: true }, { name: `CON`, value: '?', inline: true }, { name: `INT`, value: '?', inline: true }, { name: `WIS`, value: '?', inline: true }, { name: `CHA`, value: '?', inline: true })
                .setFooter(`How strong is your character? (STR stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let str = mes.first().content;
            newCharacter.str = parseInt(str);
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: '?', inline: true },
                    { name: `CON`, value: '?', inline: true },
                    { name: `INT`, value: '?', inline: true },
                    { name: `WIS`, value: '?', inline: true },
                    { name: `CHA`, value: '?', inline: true },
                )
                .setFooter(`How dexterious is your character? (DEX stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let dex = mes.first().content;
            newCharacter.dex = dex;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: `${newCharacter.dex} (${newCharacter.dex >= 10 ? '+' : ''}${Math.floor((newCharacter.dex - 10)/2)})`, inline: true },
                    { name: `CON`, value: '?', inline: true },
                    { name: `INT`, value: '?', inline: true },
                    { name: `WIS`, value: '?', inline: true },
                    { name: `CHA`, value: '?', inline: true },
                )
                .setFooter(`How much can your character endure? (CON stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let dex = mes.first().content;
            newCharacter.con = dex;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: `${newCharacter.dex} (${newCharacter.dex >= 10 ? '+' : ''}${Math.floor((newCharacter.dex - 10)/2)})`, inline: true },
                    { name: `CON`, value: `${newCharacter.con} (${newCharacter.con >= 10 ? '+' : ''}${Math.floor((newCharacter.con - 10)/2)})`, inline: true },
                    { name: `INT`, value: '?', inline: true },
                    { name: `WIS`, value: '?', inline: true },
                    { name: `CHA`, value: '?', inline: true },
                )
                .setFooter(`How smart is your character? (INT stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let dex = mes.first().content;
            newCharacter.int = dex;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: `${newCharacter.dex} (${newCharacter.dex >= 10 ? '+' : ''}${Math.floor((newCharacter.dex - 10)/2)})`, inline: true },
                    { name: `CON`, value: `${newCharacter.con} (${newCharacter.con >= 10 ? '+' : ''}${Math.floor((newCharacter.con - 10)/2)})`, inline: true },
                    { name: `INT`, value: `${newCharacter.int} (${newCharacter.int >= 10 ? '+' : ''}${Math.floor((newCharacter.int - 10)/2)})`, inline: true },
                    { name: `WIS`, value: '?', inline: true },
                    { name: `CHA`, value: '?', inline: true },
                )
                .setFooter(`How wise is your character? (WIS stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let dex = mes.first().content;
            newCharacter.wis = dex;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: `${newCharacter.dex} (${newCharacter.dex >= 10 ? '+' : ''}${Math.floor((newCharacter.dex - 10)/2)})`, inline: true },
                    { name: `CON`, value: `${newCharacter.con} (${newCharacter.con >= 10 ? '+' : ''}${Math.floor((newCharacter.con - 10)/2)})`, inline: true },
                    { name: `INT`, value: `${newCharacter.int} (${newCharacter.int >= 10 ? '+' : ''}${Math.floor((newCharacter.int - 10)/2)})`, inline: true },
                    { name: `WIS`, value: `${newCharacter.wis} (${newCharacter.wis >= 10 ? '+' : ''}${Math.floor((newCharacter.wis - 10)/2)})`, inline: true },
                    { name: `CHA`, value: '?', inline: true },
                )
                .setFooter(`How charismatic is your character? (CHA stat)`)
            top.edit(embed);
            return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });
        }).then(mes => {
            let dex = mes.first().content;
            newCharacter.cha = dex;
            chan.messages.delete(mes.first())
            embed = new Discord.MessageEmbed().setColor("#0099FF")
                .setAuthor(`${nickname}'s Character`)
                .setTitle(newCharacter.name)
                .setDescription(`${newCharacter.race} ${newCharacter.class}`)
                .addFields(
                    { name: `STR`, value: `${newCharacter.str} (${newCharacter.str >= 10 ? '+' : ''}${Math.floor((newCharacter.str - 10)/2)})`, inline: true },
                    { name: `DEX`, value: `${newCharacter.dex} (${newCharacter.dex >= 10 ? '+' : ''}${Math.floor((newCharacter.dex - 10)/2)})`, inline: true },
                    { name: `CON`, value: `${newCharacter.con} (${newCharacter.con >= 10 ? '+' : ''}${Math.floor((newCharacter.con - 10)/2)})`, inline: true },
                    { name: `INT`, value: `${newCharacter.int} (${newCharacter.int >= 10 ? '+' : ''}${Math.floor((newCharacter.int - 10)/2)})`, inline: true },
                    { name: `WIS`, value: `${newCharacter.wis} (${newCharacter.wis >= 10 ? '+' : ''}${Math.floor((newCharacter.wis - 10)/2)})`, inline: true },
                    { name: `CHA`, value: `${newCharacter.cha} (${newCharacter.cha >= 10 ? '+' : ''}${Math.floor((newCharacter.cha - 10)/2)})`, inline: true },
                )
                .setFooter(`Done! Here's your character! Use \\stat to view it again`)
            top.edit(embed);
            characters[user.id] = newCharacter;
            fs.writeFileSync('data/characters.json', JSON.stringify(characters, null, 4));
        })
    }
}