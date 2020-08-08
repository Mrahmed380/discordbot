var Discord = require('discord.js');

exports.run = async(client, msg, args) => {


    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("Only **Trial Moderators* or higher ranked Staff members can warn.');

    var user = msg.mentions.users.first();

    if(!user) return msg.channel.send("Please **mention** a user to warn.");

    var member;

    try {

        member = await msg.guild.members.fetch(user);

    } catch(err) {

        member = null;

    }

    if(!member) return msg.channel.send("The user you **mentioned** is invalid.");

    var reason = args.splice(1).join(' ');

    if(!reason) return msg.reply('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'mod-logs');

    var log = new Discord.MessageEmbed()

    .setTitle('User Warned')

    .addField('User:', user, true)

    .addField('By:', msg.author, true)

    .addField('Reason:', reason)

    channel.send(log);

    var embed = new Discord.MessageEmbed()

    .setTitle('You were warned!')

    .setDescription(reason);

    try {

        user.send(embed);

    } catch(err) {

        console.warn(err);

    }
    const warnembed = new Discord.MessageEmbed()
    .setTitle('Warn ⚒️')
    .setDescription(`${user} has been warned for the following: **${reason}`)
    msg.channel.send(warnembed);

}
