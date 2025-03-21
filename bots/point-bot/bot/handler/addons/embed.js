const Discord = require('discord.js');
const request = require('request');
const cooldown = new Set();

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = {
    cmdlist(msg) {
        try {
            const CMDLISTEmbed = new Discord.MessageEmbed()
                .setColor('#00948f')
                .setTitle('Übersicht - Commands')
                .setThumbnail('Logo Link')
                .addFields(
                    {
                        name: "!addpoints @discordtag (neu, alt) punkteanzahl",
                        value: "Beispiel: !addpoints @mooduuss neu 1000\nBeispiel: !addpoints @mooduuss alt 1000"
                    },
                    {
                        name: "!removepoints @discordtag (neu, alt) punkteanzahl",
                        value: "Beispiel: !removepoints @mooduuss neu 1000\nBeispiel: !removepoints @mooduuss alt 1000"
                    },
                    {
                        name: "!showpoints",
                        value: "Zeigt deine aktuelle Punktanzahl an"
                    },
                    {
                        name: "!changeuser @discordtag (aktiviert, deaktiviert)",
                        value: "Kann den Benutzer Aktivieren oder Deaktivieren"
                    },
                    {
                        name: "!list",
                        value: "Zeigt alle Benutzer mit den Punkten"
                    },
                    {
                        name: "!kw <kwzahl>",
                        value: "Zeigt alle Punkte die in der KW hinzugefügt wurden"
                    },
                    {
                        name: "!sync",
                        value: "Synchronisiert alle Punkte von neu zu alt"
                    },
                    {
                        name: "!suser @discordtag",
                        value: "Synchronisiert den Nicknamen in der Datenbank"
                    }
                )
                .setFooter('M0dus3 - Punkte Bot', '')
                .setTimestamp();
            msg.channel.send(CMDLISTEmbed);
        } catch (err) {
            console.error('\n\n-----------\nCmd List:\n' + err);
        }
    },

    points(client, msg, cont, color, dc_user_id, points, cate, status) {
        try {
            let cates, api_link, api_key = '';
            if (cate == "neu") { cates = 'active' } else { cates = 'old' }

            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = 'geO4WF0yYTiQyWXV77uYILqtyUDqfD'; //Dein Api Key festlegen

            request(api_link + 'points/' + status + '/' + dc_user_id + '/' + points + '/' + cates + '/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    const APEmbed = new Discord.MessageEmbed()
                        .setColor(color)
                        .setDescription(cont)
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    msg.channel.send(APEmbed);
                    client.channels.cache.get('959012373111402516').send(APEmbed)
                } else {
                    const PAPEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bei der Bearbeitung der Points!')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    msg.channel.send(PAPEmbed);
                }
            })
        } catch(err) {
            console.error('\n\n-----------\nPoints Function:\n' + err);
        }
    },

    showpoints(msg, discordid) {
        try {
            let api_link, api_key = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '0j3k8EmEz1yigTxjMmNbUqAGhZ5nMQ'; //Dein Api Key festlegen
            
            request(api_link + 'showpoints/' + discordid + '/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    let data = JSON.parse(body);
                    const SPEmbed = new Discord.MessageEmbed()
                        .setColor('#43ca84')
                        .setTitle('Punktestand von ' + msg.author.tag)
                        .addFields(
                            {
                                name: "Wochenpunkte (Neu)",
                                value: "``" + data.active_points + "``"
                            },
                            {
                                name: "Punktekonto (Alt)",
                                value: "``" + data.old_points + "``"
                            },
                        )
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    msg.channel.send(SPEmbed);
                } else {
                    const SAPEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bei der Auflistung der Points!')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    msg.channel.send(SAPEmbed);
                }
            })
        } catch(err) {
            console.error('\n\n-----------\nShowpoints:\n' + err);
        }
    },

    account (client, msg, s1, color, discordid, discordname, author) {
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '6Xpe2GgjHBWnRIjrt3CGX2wtvCRjH3'; //Dein Api Key festlegen
            log_channel = '959012373111402516'; //Channel-ID muss festgelegt werden für Logs
            
            if(s1 == "create"){
                try {
                    request(api_link + 'account/create/'+discordid+'/'+discordname+'/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            const Log1Embed = new Discord.MessageEmbed()
                                .setColor(color)
                                .setTitle('Mitarbeiter Information')
                                .setDescription('Der Account von ( <@' + discordid + '> ) wurde Aktiviert.\n')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            client.channels.cache.get(log_channel).send(Log1Embed)

                        } else {

                            const Log1Embed1 = new Discord.MessageEmbed()
                                .setColor('#d11d1d')
                                .setDescription('Es ist ein Fehler aufgetreten, bei der Erstellung des Mitarbeiterkontos!')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();
                    
                            client.channels.cache.get(log_channel).send(Log1Embed1)
                            
                        }
                    })
                } catch (err) {
                    console.error('\n\n-----------\nCreate Function:\n' + err);
                }
            } else if (s1 == "leave") {
                try {
                    console.log(discordid)
                    request(api_link + 'account/leave/' + discordid + '/none/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {

                            const Log2Embed = new Discord.MessageEmbed()
                                .setColor(color)
                                .setTitle('Mitarbeiter Information')
                                .setDescription('Das Mitarbeiterkonto von ( <@' + discordid + '> ) wurde Deaktiviert.\nInfo: <@' + discordid + '> hat den Server verlassen.')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            client.channels.cache.get(log_channel).send(Log2Embed)

                        } else {

                            const Log1Embed2 = new Discord.MessageEmbed()
                                .setColor('#d11d1d')
                                .setDescription('Es ist ein Fehler aufgetreten, bei der Deaktivierung eines Mitarbeiterkontos!')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            client.channels.cache.get(log_channel).send(Log1Embed2)

                        }
                    })
                } catch (err) {
                    console.error('\n\n-----------\nLeave Function:\n' + err);
                }
            } else if (s1 == "active") {
                try {
                    request(api_link + 'account/active/' + discordid + '/none/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            
                            const Log3Embed = new Discord.MessageEmbed()
                                .setColor(color)
                                .setTitle('Mitarbeiter Information')
                                .setDescription('Das Mitarbeiterkonto von ( <@' + discordid + '> ) wurde Aktiviert.\nInfo: Ausgeführt durch <@' + author + '>')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            if (msg != '') {
                                msg.channel.send(Log3Embed);
                            }
                            client.channels.cache.get(log_channel).send(Log3Embed)


                        } else {

                            const Log1Embed3 = new Discord.MessageEmbed()
                                .setColor('#d11d1d')
                                .setDescription('Es ist ein Fehler aufgetreten, bei der Aktivierung eines Mitarbeiterkontos!')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            if (msg != '') {
                                msg.channel.send(Log1Embed3);
                            } else {
                                client.channels.cache.get(log_channel).send(Log1Embed3)
                            }

                        }
                    })
                } catch (err) {
                    console.error('\n\n-----------\nActive Function:\n' + err);
                }
            } else if (s1 == "deactive") {
                try {
                    request(api_link + 'account/deactive/' + discordid + '/none/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            const Log4Embed = new Discord.MessageEmbed()
                                .setColor(color)
                                .setTitle('Mitarbeiter Information')
                                .setDescription('Der Account von ( <@' + discordid + '> ) wurde Deaktiviert.\nInfo: Ausgeführt durch <@' + author + '>')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            if(msg != ''){
                                msg.channel.send(Log4Embed);
                            }
                            client.channels.cache.get(log_channel).send(Log4Embed)

                        } else {

                            const Log4Embed4 = new Discord.MessageEmbed()
                                .setColor('#d11d1d')
                                .setDescription('Es ist ein Fehler aufgetreten, bei der Deaktivierung eines Mitarbeiterkontos!')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            if (msg != '') {
                                msg.channel.send(Log4Embed4);
                            }else {
                                client.channels.cache.get(log_channel).send(Log4Embed4)
                            }

                        }
                    })
                } catch (err) {
                    console.error('\n\n-----------\nDeactive Function:\n' + err);
                }
            }
        } catch (err) {
            console.error('\n\n-----------\nAccount:\n' + err);
        }
    },

    list (msg) {
        try {
            let api_link, api_key = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '3NPDWMLJeeBLmchaHUHzDlug4IDoYW'; //Dein Api Key festlegen
            
            request(api_link + 'list/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    let add = []
                    let a;

                    for (a = 0; a < JSON.parse(body).length; a++) {                    
                        let body_data = {}

                        body_data.name = "\u200B"
                        body_data.value = "<@" + JSON.parse(body)[a].discord_id + ">\nWochenpunkte (Neu)\n``" + JSON.parse(body)[a].active_points + "``\nPunktekonto (Alt)\n``" + JSON.parse(body)[a].old_points + "``"
                        body_data.inline = true
                    
                        add.push(body_data)
                    }

                    let body2_data = {}

                    body2_data.name = "\u200B"
                    body2_data.value = "\u200B"
                    body2_data.inline = true

                    add.push(body2_data)

                    const ULEmbed = new Discord.MessageEmbed()
                        .setColor('#58b9ff')
                        .setTitle('Punkteliste')
                        .addFields(
                            add
                        )
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();
            
                    msg.channel.send(ULEmbed);
                } else {
                    const APEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bei der ausgabe der Liste!')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();
            
                    msg.channel.send(APEmbed);
                }
            })
        } catch (err) {
            console.error('\n\n-----------\nList Function:\n' + err);
        }
    },

    kw(msg, kw) {
        try {
            let api_link, api_key = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '4NADWMLJeeCLmchaHUHzDSug4AAoYW'; //Dein Api Key festlegen
            
            request(api_link + 'kw/' + kw +'/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    let add = []
                    let a;

                    if (JSON.parse(body).length) {                    
                        for (a = 0; a < JSON.parse(body).length; a++) {
                            let body_data = {}

                            body_data.name = "\u200B"
                            body_data.value = "<@" + JSON.parse(body)[a].discord_id + ">\nPunkte:\n``" + JSON.parse(body)[a].points + "``"
                            body_data.inline = true

                            add.push(body_data)
                        }

                        let body2_data = {}

                        body2_data.name = "\u200B"
                        body2_data.value = "\u200B"
                        body2_data.inline = true

                        add.push(body2_data)

                        const ULEmbed = new Discord.MessageEmbed()
                            .setColor('#58b9ff')
                            .setTitle('Kalenderwoche: ' + kw)
                            .addFields(
                                add
                            )
                            .setFooter('M0dus3 - Punkte Bot', '')
                            .setTimestamp();

                        msg.channel.send(ULEmbed);
                    } else {
                        const ULEmbed = new Discord.MessageEmbed()
                            .setColor('#58b9ff')
                            .setTitle('Kalenderwoche: ' + kw)
                            .setDescription('Keine Daten für diese Woche vorhanden')
                            .setFooter('M0dus3 - Punkte Bot', '')
                            .setTimestamp();

                        msg.channel.send(ULEmbed);
                    }

                } else {
                    const APEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bei der Ausgabe der Kalenderwochen!')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    msg.channel.send(APEmbed);
                }
            })
        } catch (err) {
            console.error('\n\n-----------\nList Function:\n' + err);
        }
    },

    sync(client) {
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '4NLJeemEz1yqAGhZifk8EmEzqWMGhZnMAGhZ1yigTxjMmNbU5qAADQ'; //Dein Api Key festlegen
            log_channel = '959012373111402516';
            
            request(api_link + 'sync/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    const SYEmbed = new Discord.MessageEmbed()
                        .setColor('#3b68c7')
                        .setTitle('Information')
                        .setDescription('Alle Punkte wurden erfolgreich **Synchronisiert**.')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    client.channels.cache.get(log_channel).send(SYEmbed)
    
                } else {
                    const ASYEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bitte Informiere den Entwickler!\nFehler Code: 379')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    client.channels.cache.get(log_channel).send(ASYEmbed)
                }
            })
        } catch (err) {
            console.error('\n\n-----------\nKW Function:\n' + err);
        }
    },

    suser(client, discordid, name) {
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = '4NLJeemEz1yqAGhZifk8EmEzqWMGhZnMAGhZ1yigTxjMmNbU5qAADQ'; //Dein Api Key festlegen
            log_channel = '959012373111402516';
            
            request(api_link + 'suser/' + discordid + '/' + name + '/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    const SYEmbed = new Discord.MessageEmbed()
                        .setColor('#3b68c7')
                        .setTitle('Account Information')
                        .setDescription('Benutzername <@'+discordid+'> wurde erfolgreich **Synchronisiert**.')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    client.channels.cache.get(log_channel).send(SYEmbed)

                } else {
                    const ASYEmbed = new Discord.MessageEmbed()
                        .setColor('#d11d1d')
                        .setDescription('Es ist ein Fehler aufgetreten, bitte Informiere den Entwickler!\nFehler Code: 391')
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    client.channels.cache.get(log_channel).send(ASYEmbed)
                }
            })
        } catch (err) {
            console.error('\n\n-----------\n Sync User Function:\n' + err);
        }
    },

    cars (client, message, s1, car_name, car_id, car_plate) {
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = 'nHkNQgQ3sz4EDBbC3dmFLWw7Rnyp89I0LwBS3SywbYoEx1cLyf'; //Dein Api Key festlegen
            log_channel = '959012373111402516';
            
            if(s1 == "add"){
                request(api_link + 'ccar/add/'+car_name+'/'+car_id+'/'+car_plate+'/nHkNQgQ3sz4EDBbC3dmFLWw7Rnyp89I0LwBS3SywbYoEx1cLyf', (err, res, body) => {
                    if (!err && res.statusCode == 200) {
                        const CAAEmbed = new Discord.MessageEmbed()
                           .setColor('#3b68c7')
                           .setDescription('Das Fahrzeug: ' + car_name + ' wurde erfolgreich hinzugefügt!')
                           .setFooter('M0dus3 - Punkte Bot', '')
                           .setTimestamp();

                        client.channels.cache.get(log_channel).send(CAAEmbed)
                    }else{
                        const CABEmbed = new Discord.MessageEmbed()
                            .setColor('#d11d1d')
                            .setDescription('Es ist ein Fehler aufgetreten, bei dem hinzufügen eines Fahzeuges!')
                            .setFooter('M0dus3 - Punkte Bot', '')
                            .setTimestamp();
    
                        client.channels.cache.get(log_channel).send(CABEmbed)
                    }
                });
            }
        } catch(err) {
            console.error('\n\n-----------\nCARS:\n' + err);
        }
    },

    car_logs(client, message) {
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = 'vthayzANTTLzcwQP5EB8RokjdfZtAZ'; //Dein Api Key festlegen
            log_channel = '959012373111402516';
            
            let args = message.content.split(" ").filter(word => word.trim().length > 0);
            
            if (args.length > 1) {
                let carid = args[1].replace(/[\/ ]/g, '_');

                if(args[0] == "!usecar"){
                    request(api_link + '/car/use/' + carid + '/' + message.author.id + '/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            data = JSON.parse(body);

                            for (a = 0; a < JSON.parse(body).length; a++) {
                                if (data[a].status == 200) {
                                    const ACLEmbed = new Discord.MessageEmbed()
                                        .setColor('#43ca84')
                                        .setDescription('Das Fahrzeug **' + data[a].car_name + '**#**' + data[a].car_id + '** wurde auf deinen Namen geschrieben!')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(ACLEmbed).then(sent => {
                                        sent.delete({ timeout: 5000 })
                                    });

                                    const BCLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#753d3d')
                                        .setDescription('Status: **Besetzt**\nFahrzeug: **' + data[a].car_name + '**#**' + data[a].car_id + '**\nBenutzer: ' + data[a].author_name + '\nDatum: ' + data[a].use_date)
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    client.channels.cache.get(log_channel).send(BCLEmbed)


                                } else if (data[a].status == 301) {
                                    const CCLEmbed = new Discord.MessageEmbed()
                                        .setColor('#ff7a00')
                                        .setDescription('Dieses Fahrzeug wird aktuell von **' + data[a].author_name + '** genutzt!')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(CCLEmbed).then(msg => {
                                        msg.delete({ timeout: 5000 })
                                    })

                                } else if (data[a].status == 300) {
                                    const DCLEmbed = new Discord.MessageEmbed()
                                        .setColor('#d11d1d')
                                        .setDescription('Das Fahrzeug mit der ID **' + data[a].car_id + '** wurde nicht gefunden!\nÜberprüfe nochmal die Fahrzeug-ID (Nur Zahlen)')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(DCLEmbed).then(msg => {
                                        msg.delete({ timeout: 5000 })
                                    })

                                }
                            }
                        } else {
                            const ASYEmbed = new Discord.MessageEmbed()
                                .setColor('#d11d1d')
                                .setDescription('Es ist ein Fehler aufgetreten, bitte Informiere den Entwickler!\nFehler Code: 389')
                                .setFooter('M0dus3 - Punkte Bot', '')
                                .setTimestamp();

                            message.reply(ASYEmbed)
                        }
                    })
                    
                }else if(args[0] == "!sharecar") {
                    let dc
                    if (message.member.roles.cache.some(role => role.id === '955452063880445972') || message.member.roles.cache.some(role => role.id === '956635518567841812')) {
                        dc = 'admin'
                    }else {
                        dc = message.author.id
                    }

                    request(api_link + 'car/update/' + carid + '/deletemessage/' + dc + '/' + api_key, (err, res, body) => {
                        if (!err && res.statusCode == 200) {
                            data = JSON.parse(body)
                            for (a = 0; a < JSON.parse(body).length; a++) {
                                if (data[a].status == 200) {
                                    const ACLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#43ca84')
                                        .setDescription('Das Fahrzeug **' + data[a].car_name + '**#**' + data[a].car_id + '** gilt nun wieder als verfügbar!')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(ACLEmbed).then(sent => {
                                        sent.delete({ timeout: 5000 })
                                    });

                                    const BCLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#43ca84')
                                        .setDescription('Status: **Frei**\nFahrzeug: **' + data[a].car_name + '**#**' + data[a].car_id + '**\nBenutzt Von: ' + data[a].author_name + '\nBenutzt Seit: ' + data[a].use_date + '\nBenutze Zeit: **'+ data[a].used_time +'** Minuten')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    client.channels.cache.get(log_channel).send(BCLEmbed)
                                } else if (data[a].status == 201) {
                                    const DCLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#43ca84')
                                        .setDescription('Das Fahrzeug **' + data[a].car_name + '**#**' + data[a].car_id + '** gilt nun wieder als verfügbar!\n**Freigeschaltet durch ein Admin**')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(DCLEmbed).then(sent => {
                                        sent.delete({ timeout: 5000 })
                                    });

                                    const ECLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#43ca84')
                                        .setDescription('Status: **Frei**\nFahrzeug: **' + data[a].car_name + '**#**' + data[a].car_id + '**\nBenutzt Von: ' + data[a].author_name + '\nBenutzt Seit: ' + data[a].use_date + '\nBenutze Zeit: **' + data[a].used_time + '** Minuten')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    client.channels.cache.get(log_channel).send(ECLEmbed)
                                } else if (data[a].status == 302) {
                                    const FCLEmbed = new Discord.MessageEmbed()
                                        .setTitle('Fahrzeug Information')
                                        .setColor('#ff5e13')
                                        .setDescription('Dieses Fahrzeug ist Besetzt/Gesperrt, wende dich an einen Admin!')
                                        .setFooter('M0dus3 - Punkte Bot', '')
                                        .setTimestamp();

                                    message.delete({ timeout: 5000 })
                                    message.reply(FCLEmbed).then(sent => {
                                        sent.delete({ timeout: 5000 })
                                    });
                                }
                            }
                        }
                    })
                }
            } else {
                const ACLAEmbed = new Discord.MessageEmbed()
                    .setColor('#d11d1d')
                    .setDescription('Der Befehl konnte nicht ausgeführt werden!\nÜberprüfe den Befehle!')
                    .setFooter('M0dus3 - Punkte Bot', '')
                    .setTimestamp();

                message.delete({ timeout: 5000 })
                message.reply(ACLAEmbed).then(msg => {
                    msg.delete({ timeout: 5000 })
                })
            }

        } catch (err) {
            console.error('\n\n-----------\nCar Function:\n' + err);
        }
    }, 

    car_list(client, message, edit){
        try {
            let api_link, api_key, log_channel = '';
            api_link = 'https://api.m0dus3.de/v1/'; //Api verlinkung
            api_key = 'Oh5BoAkMQcjoSyql0Vmob6KdMvV9OR'; //Dein Api Key festlegen
            log_channel = '959012373111402516';
            
            request(api_link + '/v1/car/list/' + api_key, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    data = JSON.parse(body);

                    let add = []
                    let a;

                    for (a = 0; a < JSON.parse(body).length; a++) {
                        let body_data = {}
                        body_data.name = data[a].car_name + " # " + data[a].car_id
                        if (data[a].status == "used") {
                            body_data.value = "ID: " + data[a].car_id + "\nStatus: <@&" + data[a].role + ">\nVon: <@" + data[a].car_user + ">"
                        } else {
                            body_data.value = "ID: " + data[a].car_id + "\nStatus: <@&" + data[a].role + ">"
                        }

                        body_data.inline = true

                        add.push(body_data)
                    }

                    const CLEmbed = new Discord.MessageEmbed()
                        .setColor('#58b9ff')
                        .setTitle('Information für die Fahrzeugnutzung')
                        .setThumbnail('')
                        .setDescription('Aktuelle Übersicht aller Fahrzeuge die euch zu Verfügung stehen!\n\nSollten Fahrzeuge trotz nicht eingetragen benutzen werden, werden sie Kommentarlos eingeparkt und leer gemacht!\n\n**Befehle:**\nMit ``!usecar ID`` könnt ihr eine Fahrzeug besetzten. \nBeispiel: ``!usecar 509``\n\nMit ``!sharecar ID`` könnt ihr das Fahrzeug wieder **Frei** geben.\nBeispiel: ``!sharecar 509``\n\u200B')
                        .addFields(
                            add
                        )
                        .setFooter('M0dus3 - Punkte Bot', '')
                        .setTimestamp();

                    if(edit == "none"){
                        message.channel.send(CLEmbed);
                    }else {
                        try {
                            message.channel.send(CLEmbed);
                        } catch (err) {
                            console.error('\n\n-----------\nEdit Function:\n' + err);
                        }
                    }

                }
            });
        } catch (err) {
            console.error('\n\n-----------\nEmbed Edit Function:\n' + err);
        }
    }
}
