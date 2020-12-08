/** Third party imports */
const fs = require('fs'); //File reader and writer
const Discord = require('discord.js'); //Discord API

/** Our imports */
const util = require('./util.js'); //Useful utility functions

/** Configuration files */
require('dotenv').config(); //Loads private Discord token for bot authorization
const config = JSON.parse(fs.readFileSync("config.json")); //Public config options

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const prefix = config.command_prefix; //Prefix for bot commands
console.log(config)

/** Each file inside ./commands is it's own .js file and module and has the following paramters:
 * @param {string}  name            The command name that triggers the command when put into Discord
 * @param {string}  description     Description of the command that appears with the "help" command
 * @param {string}  aliases         Alternate names that also trigger the command
 * @param {string}  usage           How to use the command
 * @param {bool}    args            If the command requires addtional arguments or not
 * @param {bool}    admin           If the command is only for admins of a server
 * @param {bool}    guildOnly       If the command can only be used in public servers (as opposed to DMs)
 * 
 * @func execute (Message message, string[] args) the logic of the commands
*/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

/** Fires when the bot successfully logs in and is listening for commands */
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

/** Fires whenever a message is sent */
client.on('message', async message => {
    // If the message doesn't start with the prefix or is from a bot, ignore the message
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Splits input message into array with space as seperator and removing the prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    // Gets first element in args and converts to lowercase
    const commandName = args.shift().toLowerCase();

    // Check if command or alias exists
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Checks if the command requires admin permission and if the sender has it
    if (command.admin && (!message.member || !message.member.hasPermission(0x00000020))) {
        return message.reply('You don\'t have permission to use this command');
    }

    // Makes sure the command isn't server only and in a DM
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Checks if the command requires any arguments
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.args) {
            reply += `Correct usage: \`${prefix}${command.name} ${command.usage}\``
        }

        return message.channel.send(reply);
    }

    // Cooldown Logic

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldowns || config.command_cooldown) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} moew second(s) before reusing the \`${command.name}\` command`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute the command
    try {
        command.execute(message, args)
    } catch (error) {
        console.log(error);
        message.reply('There was an error trying to execute that command!');
    }
})

/** Logs bot into Discord */
client.login(process.env.DISCORD_TOKEN);