require('dotenv').config();
const discord   = require('discord.js');
const hashmap   = require('hashmap');
const client    = new discord.Client();
const map       = new hashmap();
const bot       = require('./handler/functions/bot.js');
const cmd       = require('./handler/functions/commands.js');
const embed     = require('./handler/addons/embed.js');

//Discord Bot Start
client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
    console.log(`Bot "${client.user.tag}" erfolgreich Verbunden.`);
    client.user.setStatus('dnd');
    bot.car_list_up(client)
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
    bot.member_get_role(client, oldMember, newMember)
});

client.on('guildMemberRemove', member => {
    embed.account(client, '', 'leave', '#d11d1d', member.user.id, '', 'AUTHOR')
})

client.on('message', function(message) {
    cmd.command_list(message)
    cmd.cmd_points(message, client)
    cmd.cmd_cars(message, client)
});
