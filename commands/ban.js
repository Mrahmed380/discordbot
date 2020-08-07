var Discord = require('discord.js');

exports.run = async(client, msg, args) => {

    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.channel.send("Only **Admins** or higher ranked Staff members can ban.");

    var user = msg.mentions.users.first();
    
    const banpmau = new Discord.MessageEmbed()
    .setTitle("Error ✋")
    .setDescription("Please mention the user that you'd like to ban.")
    .setColor("ORANGE")
    
    if(!user) return msg.channel.send(banpmau);

    var member;

    try {

        member = await msg.guild.members.fetch(user);

    } catch(err) {

        member = null;

    }

    if(member){

        if(member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('You cannot ban another **Staff** member.');

    }

    var reason = args.splice(1).join(' ');

    if(!reason) return msg.channel.send('Please specify a **reason** to ban.');

    var channel = msg.guild.channels.cache.find(c => c.name === 'mod-logs');

    var log = new Discord.MessageEmbed()

    .setTitle('Ban')
    .setDescription('A user has been banned.')

    .addField('User:', user, true)

    .addField('By:', msg.author, true)

    .addField('Reason:', reason)

    channel.send(log);

    var embed = new Discord.MessageEmbed()

    .setTitle('You were banned!')

    .setDescription(`You were banned in Desire for the following: ${reason}`);

    try {

        await user.send(embed);

    } catch(err) {

        console.warn(err);

    }

    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)
    
    const banembed = new Discord.MessageEmbed()
    .setTitle('Ban ⚒️')
    .setColor('#8b0000')
    .setDescription(`${user} has been banned for the following: **${reason}**`)
    msg.channel.send(banembed);

}

