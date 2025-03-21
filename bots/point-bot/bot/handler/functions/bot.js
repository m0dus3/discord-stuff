const Discord = require('discord.js')
const embed = require('../addons/embed.js');
const request = require('request');


exports.member_get_role = function (client, oldMember, newMember) {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id)) {
                if (role.id == '956635662185033788') {
                    embed.account(client, '', 'deactive', '#d11d1d', oldMember.user.id, oldMember.displayName, 'AUTHOR_ID')
                }
            }
        });
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                if (role.id == '956635662185033788') {
                    embed.account(client, '', 'create', '#43ca84', newMember.user.id, newMember.displayName, 'AUTHOR_ID')
                }
            }
        });
    }
}

function s1(client) { embed.car_list(client, 'none', 'edit'); setTimeout(s2, 60000, client); }
function s2(client) { embed.car_list(client, 'none', 'edit'); setTimeout(s1, 60000, client); }

exports.car_list_up = function (client) {
    s1(client)
}
