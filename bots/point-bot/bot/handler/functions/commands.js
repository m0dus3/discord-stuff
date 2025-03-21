require('dotenv').config();

const discords   = require('discord.js');
const PREFIX    = process.env.PREFIX;
const embed     = require('../addons/embed.js');
const request   = require('request');
const exp = require('constants');
const cooldown  = new Set();


const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);

exports.command_list = function (message) {
    if (message.author.bot) return;
    if (isValidCommand(message, 'cmdlist')) {
        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                embed.cmdlist(message);
            } catch (err) {
                console.error('\n\n-----------\nFehler: ' + err);
            }
        }
    }
}

exports.cmd_points = function (message, client) {
    if(message.author.bot) return;
    if(isValidCommand(message, "addpoints")) {
        // @Command "!addpoints <@USER> <neu/alt> <count>"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Add the points to the specific user"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args = message.content.split(" ").filter(word => word.trim().length > 0);
                let cont = ''
                let dc_id_user = args[1].replace(/[<@>]/g, '');
                
                if (args[2] == "neu"){
                    cont = '<@' + message.author.id + '>'+ ' hat ' + args[1] + ' ``' + args[3] + '`` neue Punkte hinzugefügt!'
                    color = '#43ca84'
                } else if (args[2] == "alt") {
                    cont = '<@' + message.author.id + '>' + ' hat ' + args[1] + ' ``' + args[3] + '`` alte Punkte hinzugefügt!'
                    color = '#43ca84'
                } else {
                    cont = 'Der Befehl konnte nicht ausgeführt werden!\nÜberprüfe den Befehle, eventuell hast du dich verschrieben!'
                    color = '#d11d1d'
                }

                embed.points(client, message, cont, color, dc_id_user, args[3], args[2], 'add');
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "removepoints")) {
        // @Command "!removepoints <@USER> <neu/alt> <count>"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Remove the points from the specific user"
        
        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args = message.content.split(" ").filter(word => word.trim().length > 0);
                let cont = ''
                let dc_id_user = args[1].replace(/[<@>]/g, '');

                if (args[2] == "neu" || isNaN(args[3])) {
                    cont = '<@' + message.author.id + '>' + ' hat ' + args[1] + ' ``' + args[3] + '`` neue Punkte entfernt!'
                    color = '#d11d1d'
                } else if (args[2] == "alt" || isNaN(args[3])) {
                    cont = '<@' + message.author.id + '>' + ' hat ' + args[1] + ' ``' + args[3] + '`` alte Punkte entfernt!'
                    color = '#d11d1d'
                } else {
                    cont = 'Der Befehl konnte nicht ausgeführt werden!\nÜberprüfe den Befehle, eventuell hast du dich verschrieben!'
                    color = '#d11d1d'
                }

                embed.points(client, message, cont, color, dc_id_user, args[3], args[2], 'remove');
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "showpoints")) {
        // @Command "!showpoints"
        // @Description "Show your Points"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812') || message.member.roles.cache.some(role => role.id === '956635662185033788')) {
            try {
                embed.showpoints(message, message.author.id);
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "list")) {
        // @Command "!list"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Get all active user with the new & old Points"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                embed.list(message);
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "changeuser")) {
        // @Command "!changeuser <@USER> aktiviert/deaktiviert"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Change the specific user"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args_acc = message.content.split(" ").filter(word => word.trim().length > 0);
                let dcid_acc = args_acc[1].replace(/[<@>]/g, '');
                let status_acc = ''
                let color = ''

                if (args_acc[2] == "aktiviert") { 
                    status_acc = 'active'
                    color = '#43ca84'
                } else if (args_acc[2] == "deaktiviert") { 
                    status_acc = 'deactive'
                    color = '#d11d1d'
                }

                embed.account(client, message, status_acc, color, dcid_acc, '', message.author.id)
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "kw")) {
        // @Command "!kw <kwcount>"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Get the add/remove points from the kwcount"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args_kw = message.content.split(" ").filter(word => word.trim().length > 0);
                let args_kw_len = args_kw.length
                
                if(args_kw_len > 1){
                    if (!isNaN(args_kw[1])){
                        embed.kw(message, args_kw[1])
                    }
                }
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "sync")) {
        // @Command "!sync"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "sync the Points from new to old"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                embed.sync(client);
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "suser")) {
        // @Command "!suser <@USER>"
        // @Permission "Leitung & DC_Verwaltung"
        // @Description "Update DB name form the specific tagged user"

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args_su = message.content.split(" ").filter(word => word.trim().length > 0);
                let args_su_len = args_su.length
                let guild = client.guilds.cache.get('955448630599352351');

                if (args_su_len > 1) {
                    let dcid_acc = args_su[1].replace(/[<@>]/g, '');
                    let member = guild.member(dcid_acc);
                    let nickname = member ? member.displayName : null;

                    embed.suser(client, dcid_acc, nickname)
                }
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else {

    }
}

exports.cmd_cars = function (message, client) {
    if (message.author.bot) return;
    if (isValidCommand(message, "addcar")) {
        /*
        * @values name id plate
        */

        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            try {
                let args_ac = message.content.split(" ").filter(word => word.trim().length > 0);
                let args_ac_len = args_kw.length

                if(args_ac_len == 4){
                    embed.cars(client, message, "add", args_ac[1], args_ac[2], args_ac[3])
                }
            } catch (err) {
                console.error('\n\n-----------\n' + err);
            }
        }
    } else if (isValidCommand(message, "removecar")) {

    } else if (isValidCommand(message, "carlist")) {
        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            embed.car_list(client, message, 'none')
        }
    } else if (isValidCommand(message, "helpforcars")) {
        if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
            embed.helpforcars(client, message)
        }
    } else if (isValidCommand(message, "usecar")) {
        embed.car_logs(client, message)
    } else if (isValidCommand(message, "sharecar")) {
        embed.car_logs(client, message)
    } else {

    }
}

