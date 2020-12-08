const util = require('../util.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'ping',
    admin: true,
    description: `Debug command - because I'm too lazy to add an actual one`,
    async execute(message, args) {
        const chan = message.channel;
        const author = message.author;
        const member = message.guild.member(author);
        const nickname = member ? member.displayName : null;

        const filter = m => message.author.id === m.author.id;

        const detail = JSON.parse(fs.readFileSync('5eTools/data/races.json'))["race"];
        const races = JSON.parse(fs.readFileSync('data/player_races.json'));
        const color = util.randomColor();

        let character = {}
        let embed = new Discord.MessageEmbed().setColor(color).setAuthor(`${nickname}'s Character`);

        const creationSteps = [
            {
                edit: function(e) {
                    e.setFooter(`What is the character's name?`);
                },
                process: function(response) {
                    character.name = response.first().content;
                    response.first().delete();
                    response = null;
                }
            },
            {
                edit: function(e) {
                    e.setTitle(character.name).setFooter(`What race is ${character.name}? You can also see a list of available races with !`);
                },
                process: async function(response) {
                    let race = response.first().content;
                    
                    while (!races[race]) {
                        response.first().delete();
                        embed.setFooter("That race isn't available. Make sure you spelt it right");
                        await sentMessage.edit(embed);
                        response = await chan.awaitMessages(filter, { time: 10000, max: 1, errors: ['time'] }).catch(() => sentMessage.delete());
                        race = response.first().content;
                    }

                    character.race = race;
                    response.first().delete();
                    response = null;
                }
            },
            {
                edit: function(e) {
                    e.setDescription(`${character.race}`);
                },
                process: function(response) {
                    character.name = response.first().content;
                    response.first().delete();
                    response = null;
                }
            }
        ]

        let sentMessage = await chan.send(embed);
        let response;
        for (let index = 0; index < creationSteps.length; index++) {
            const e = creationSteps[index];
            e.edit(embed)
            await sentMessage.edit(embed);
            response = await chan.awaitMessages(filter, { time: 5000, max: 1, errors: ['time'] }).catch(() => sentMessage.delete());
            console.log(response);
            await e.process(response);
        }

        return

        //return chan.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] });

        detail.forEach(e => {
            if (e.traitTags && e.traitTags.indexOf("NPC Race") > -1) return;

            const curObject = {
                source: e.source,
                size: e.size,
            }

            // Movement speeds
            if (typeof(e.speed) == "object") {
                if (e.speed["walk"]) curObject['walkSpeed'] = e.speed["walk"]
                if (e.speed["climb"]) curObject['climbSpeed'] = e.speed["climb"]
                if (e.speed["fly"]) curObject['flySpeed'] = e.speed["fly"]
                if (e.speed["swim"]) curObject['swimSpeed'] = e.speed["swim"]
            } else {
                curObject['walkSpeed'] = e.speed
            }
            
            if (e['ability'] && e['ability'].length > 1) {
                console.log(e.name)
            } else if (e['ability']) {
                curObject['ability'] = e['ability'][0]
            } else {
                //console.log(e.name + " has no ability")
            }

            if (e['subraces']) {
                curObject['subraces'] = []
                e['subraces'].forEach(sub => {
                    console.log(sub)
                    if (races[sub.name] || races[`${e.name} (${sub.name})`]) {
                        curObject['subraces'].push(sub.name);
                        console.log(`Added ${sub.name}`)
                    } else {
                        //console.log(`Subrace ${e.name} (${sub.name}) doesn't exist in race list`)
                    }
                });
            }

            races[e.name] = curObject
        });

        fs.writeFileSync('data/player_races.json', JSON.stringify(races, null, 4));

        //const chan = message.channel;
        embed = new Discord.MessageEmbed().setColor("#0099FF").setAuthor(`${nickname}'s Character`)
        .addFields( { name: `Draconic Ancestry Table`, value: "`╔════════╦═════════════╦═════════════════════════════╗\n║ Dragon ║ Damage Type ║        Breath Weapon        ║\n╠════════╬═════════════╬═════════════════════════════╣\n║ Black  ║ Acid        ║ 5 by 30 ft. line (DEX save) ║\n╚════════╩═════════════╩═════════════════════════════╝`", inline: false } )
        chan.send(embed)
    }
}