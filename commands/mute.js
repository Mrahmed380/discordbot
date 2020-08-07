var Discord = require('discord.js');

var ms = require('ms');

exports.run = async(client, msg, args) => {
    
    const mutemp = new Discord.MessageEmbed()
    .setTitle('Warning ⚠️')
    .setColor("RED")
    .setDescription('You lack permission to mute.')
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(mutemp);

    var user = msg.mentions.users.first();
    
    const muteerror = new Discord.MessageEmbed()
    .setTitle('Warning ⚠️')
    .setDescription("Please mention the user that you'd like to mute.")
    .setColor('#FF0000')
    if(!user) return msg.channel.send(muteerror);

    var member;

    try {

        member = await msg.guild.members.fetch(user);

    } catch(err) {

        member = null;

    }

    if(!member) return msg.reply('They aren\'t in the server!');
    
    const ucmt = new Discord.MessageEmbed()
    .setTitle('Warning ⚠️')
    .setDescription('You cannot mute another Staff member.')
    .setColor('#FF0000')
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(ucmt);

    var rawTime = args[1];

    var time = ms(rawTime);

    if(!time) return msg.channel.send("Please specify a time.");

    var reason = args.splice(2).join(' ');

    if(!reason) return msg.channrl.send('You need to give a reason!');

    var channel = msg.guild.channels.cache.find(c => c.name === 'potato');

    var log = new Discord.MessageEmbed()

    .setTitle('User Muted')

    .addField('User:', user, true)

    .addField('By:', msg.author, true)

    .addField('Expires:', rawTime)

    .addField('Reason:', reason)

    channel.send(log);

    var embed = new Discord.MessageEmbed()

    .setTitle('You were muted!')

    .addField('Expires:', rawTime, true)

    .addField('Reason:', reason, true);

    try {

        user.send(embed);

    } catch(err) {

        console.warn(err);

    }

    var role = msg.guild.roles.cache.find(r => r.name === 'Muted');

    member.roles.add(role);

    setTimeout(async() => {

        member.roles.remove(role);

    }, time);
    const muteembed = new Discord.MessageEmbed()
    .setTitle('Mute ⚒️')
    .setColor('#8b0000')
    .setDescription(`${user} has been muted for **${rawTime}** for the following: **${reason}**`);

    msg.channel.send(muteembed);

}
